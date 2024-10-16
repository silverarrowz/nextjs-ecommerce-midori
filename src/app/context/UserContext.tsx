'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { User } from '../(payload)/payload-types'

type Login = (args: { email: string; password: string }) => Promise<User>

type Logout = () => Promise<void>

type UserContextType = {
  user?: User | null
  setUser: (user: User) => void
  status: undefined | 'loggedOut' | 'loggedIn'
  login: Login
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

  const login = useCallback<Login>(async (args) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/login`, {
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

      if (res.ok) {
        const { user, errors } = await res.json()
        if (errors) throw new Error(errors[0].message)
        setUser(user)
        setStatus('loggedIn')
        return user
      }

      throw new Error('Invalid login')
    } catch (e) {
      throw new Error('An error occurred while attempting to login.')
    }
  }, [])

  const logout = useCallback<Logout>(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/logout`, {
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/me`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (res.ok) {
          const { user: meUser } = await res.json()
          setUser(meUser || null)
          setStatus(meUser ? 'loggedIn' : undefined)
        } else {
          throw new Error('Error fetching user')
        }
      } catch (e) {
        setUser(null)
        throw new Error('Error fetching user')
      }
    }

    fetchMe()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, status, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
