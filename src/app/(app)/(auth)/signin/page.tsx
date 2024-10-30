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
    if (searchParams.get('redirectTo')) {
      setRedirectBack(searchParams.get('redirectTo') as string)
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>()
  const { login, register: registerUser, user } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [action, setAction] = useState<'login' | 'register'>('login')
  const [redirectBack, setRedirectBack] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const password = useRef({})
  password.current = watch('password', '')

  if (user) {
    router.push(redirectBack ? redirectBack : '/')
  }

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    if (action === 'register' && data.passwordConfirm) {
      try {
        await registerUser(data.email, data.password, data.passwordConfirm)

        router.push(redirectBack ? redirectBack : '/')
      } catch (error) {
        console.log(error)
        setErrorMessage((error as Error).message)
      }
    } else {
      try {
        await login(data)
        router.push(redirectBack ? redirectBack : '/')
      } catch (error) {
        console.log(error)
        setErrorMessage((error as Error).message)
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
      }
    }

    setIsLoading(false)
    return
  }

  return (
    <div className="pt-48 px-4 w-full sm:px-0 mx-auto mb-32 text-center h-[80vh] flex flex-col justify-center items-center">
      <h1
        className="z-50 text-5xl
      w-fit font-serif text-heading-dark relative inline-block"
      >
        {action === 'login' ? 'Вход' : 'Регистрация'}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-6 
        rounded-lg
        bg-background-lightest shadow-sm border border-heading
        w-full xs:w-fit mx-auto mt-10 
        py-8 px-4
        sm:p-8"
      >
        <input
          {...register('email', { required: true })}
          type="email"
          placeholder="E-mail"
          className="py-2 px-4 placeholder:text-heading placeholder:opacity-60 outline outline-1 outline-heading focus:outline-2 rounded-lg w-full xs:min-w-72 text-heading"
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
          className="py-2 px-4 placeholder:text-heading placeholder:opacity-60 outline outline-1 rounded-lg outline-heading focus:outline-2 w-full xs:min-w-72 text-heading"
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
            className="py-2 px-4 placeholder:text-heading placeholder:opacity-60 outline outline-1 outline-heading rounded-lg focus:outline-2 w-full xs:min-w-72 text-heading"
          />
        )}
        {errors.passwordConfirm && (
          <p className="text-red-700/70 text-sm">{errors.passwordConfirm.message}</p>
        )}
        {errorMessage && <p className="text-red-700/70 text-sm">{errorMessage}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-button w-full p-2 border-2 font-bold border-heading
      hover:bg-button/70 transition-all duration-300 rounded-lg disabled:hover:shadow-none 
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
