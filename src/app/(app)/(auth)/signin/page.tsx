'use client'

import { useUser } from '@/app/context/UserContext'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

export type FormValues = {
  email: string
  password: string
  passwordConfirm?: string
}

const Page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  useEffect(() => {
    if (searchParams.get('authAction')) {
      setAction(searchParams.get('authAction') as 'login' | 'register')
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>()
  const { login, register: registerUser } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [action, setAction] = useState<'login' | 'register'>('login')
  const [errorMessage, setErrorMessage] = useState('')

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    if (action === 'register' && data.passwordConfirm) {
      try {
        await registerUser(data.email, data.password, data.passwordConfirm)
        router.push('/')
      } catch (error) {
        console.log(error)
        setErrorMessage(error.message)
      }
    } else {
      try {
        await login(data)
        router.push('/')
      } catch (error) {
        console.log(error)
        setErrorMessage(error.message)
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
      }
    }

    setIsLoading(false)
  }

  return (
    <div className="pt-48 mx-auto mb-32 text-center h-[80vh] flex flex-col justify-center items-center">
      <h1
        className="z-50 text-5xl
      w-fit font-serif text-heading-dark relative inline-block"
      >
        {action === 'login' ? 'Вход' : 'Регистрация'}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-6 
        bg-background-lightest shadow-sm border border-heading
        w-fit mx-auto mt-10
        p-8"
      >
        <input
          {...register('email', { required: true })}
          type="email"
          placeholder="E-mail"
          className="py-2 px-4 placeholder:text-heading placeholder:opacity-60 outline outline-1 outline-background rounded-3xl focus:outline-fuchsia-800/40 min-w-72 text-heading"
        />
        {errors.email && <p className="text-red-700">{errors.email.message}</p>}
        <input
          {...register('password', {
            required: true,
            minLength: {
              value: 6,
              message: 'Пароль должен быть не менее 6 символов.',
            },
          })}
          type="password"
          placeholder="Пароль"
          className="py-2 px-4 placeholder:text-heading placeholder:opacity-60 outline outline-1 outline-background rounded-3xl focus:outline-fuchsia-800/40 min-w-72 text-heading"
        />
        {errors.password && <p className="text-red-700/70 text-sm">{errors.password.message}</p>}
        {action === 'register' && (
          <input
            {...register('passwordConfirm', {
              required: true,
              validate: (value) => value === password.current || 'Пароли не совпадают.',
            })}
            type="password"
            placeholder="Подтвердите пароль"
            className="py-2 px-4 placeholder:text-heading placeholder:opacity-60 outline outline-1 outline-background rounded-3xl focus:outline-fuchsia-800/40 min-w-72 text-heading"
          />
        )}
        {errors.passwordConfirm && (
          <p className="text-red-700/70 text-sm">{errors.passwordConfirm.message}</p>
        )}
        {errorMessage && <p className="text-red-700/70 text-sm">{errorMessage}</p>}

        <button
          type="submit"
          className="bg-button w-full p-2 border border-heading
      hover:bg-button/70 transition-all duration-300 rounded-3xl 
      hover:shadow-[inset_0_0_4px_2px_rgba(215,89,161,0.36),0_0_6px_2px_rgba(215,89,161,0.36)] 
       tracking-widest"
        >
          {isLoading ? 'Загрузка...' : action === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
      <div className="mt-4 text-heading">
        {action === 'login' ? (
          <p>
            Нет аккаунта?{' '}
            <button
              className="hover:text-heading-dark transition-colors"
              onClick={() => setAction('register')}
            >
              Зарегистрироваться
            </button>
          </p>
        ) : (
          <p>
            Уже есть аккаунт?{' '}
            <button
              className="hover:text-heading-dark transition-colors"
              onClick={() => setAction('login')}
            >
              Войти
            </button>
          </p>
        )}
      </div>
    </div>
  )
}

export default Page