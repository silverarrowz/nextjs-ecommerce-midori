'use client'

import { useUser } from '@/app/context/UserContext'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface DropdownAccountProps {
  isOpen: boolean
}

const DropdownAccount = ({ isOpen }: DropdownAccountProps) => {
  const { user, logout, status } = useUser()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/signin')
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  return (
    <div
      className={cn(
        `bg-background-lightest text-heading p-4
        rounded-xl
        transition-all duration-300 ease-in-out transform 
        absolute -right-8 top-8`,
        {
          'opacity-100 translate-y-0': isOpen,
          'opacity-0 -translate-y-4 pointer-events-none': !isOpen,
        },
      )}
    >
      {user !== null ? (
        <ul className="flex flex-col gap-2 w-max">
          <li>
            <p className="font-light mb-2">
              Добро пожаловать, <span className="font-bold">{user!.email}</span>
            </p>
          </li>
          <li>
            <button onClick={() => console.log(user)} className="hover:opacity-80">
              Личный кабинет
            </button>
          </li>
          <li>
            <button onClick={handleLogout} className="hover:opacity-80">
              Выйти
            </button>
          </li>
        </ul>
      ) : (
        <ul className="flex flex-col gap-4 w-max">
          <li>
            <Link href="/signin?authAction=login" className="hover:opacity-80">
              Войти
            </Link>
          </li>
          <li>
            <Link href="/signin?authAction=register" className="hover:opacity-80">
              Регистрация
            </Link>
          </li>
        </ul>
      )}
    </div>
  )
}

export default DropdownAccount
