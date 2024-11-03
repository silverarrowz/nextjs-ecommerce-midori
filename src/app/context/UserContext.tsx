'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { User } from '../(payload)/payload-types'
import { usePathname, useRouter } from 'next/navigation'

type Login = (args: { email: string; password: string }) => Promise<User>
type Register = (email: string, password: string, passwordConfirm: string) => Promise<void>

type Logout = () => Promise<void>

type UserContextType = {
  user?: User | null
  setUser: (user: User) => void
  status: undefined | 'loggedOut' | 'loggedIn'
  login: Login
  register: Register
  logout: Logout
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [status, setStatus] = useState<undefined | 'loggedOut' | 'loggedIn'>()

  const router = useRouter()
  const pathname = usePathname()

  const login = useCallback<Login>(async (args) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: args.email,
          password: args.password,
        }),
      })
      if (!res.ok) {
        const { errors } = await res.json()

        if (errors) {
          if (errors[0].message.includes('email or password')) {
            throw new Error('Неверный e-mail или пароль.')
          } else {
            throw new Error(
              `Server error: ${errors[0].message || 'Ошибка. Повторите попытку позже.'}`,
            )
          }
        }
      } else {
        const { user } = await res.json()
        setUser(user)
        setStatus('loggedIn')
        return user
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }, [])

  const register = useCallback<Register>(async (email, password, passwordConfirm) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
        }),
      })

      if (!res.ok) {
        const { errors } = await res.json()
        console.log(errors)
        if (errors) {
          if (errors[0].message.includes('email')) {
            throw new Error('Пользователь с таким e-mail уже зарегистрирован.')
          } else {
            throw new Error(
              `Server error: ${errors[0].message || 'Ошибка. Повторите попытку позже.'}`,
            )
          }
        } else {
          throw new Error(`Ошибка. Повторите попытку позже.`)
        }
      } else {
        await login({ email, password })
      }
    } catch (error) {
      throw error
    }
  }, [])

  const logout = useCallback<Logout>(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        setUser(null)
        setStatus('loggedOut')
      } else {
        throw new Error('An error occurred while attempting to logout.')
      }
    } catch (e) {
      throw new Error('An error occurred while attempting to logout.')
    }
  }, [])

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (res.ok) {
          const { user: meUser } = await res.json()
          setUser(meUser || null)
          if (!meUser) {
            router.push(`/signin?redirectTo=${encodeURIComponent(pathname)}`)
          }
          setStatus(meUser ? 'loggedIn' : undefined)
        } else {
          router.push(`/signin?redirectTo=${encodeURIComponent(pathname)}`)
          throw new Error('Error fetching user')
        }
      } catch (e) {
        setUser(null)
        router.push(`/signin?redirectTo=${encodeURIComponent(pathname)}`)
        throw new Error('Error fetching user')
      }
    }

    fetchMe()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, status, login, logout, register }}>
      {children}
    </UserContext.Provider>
  )
}
