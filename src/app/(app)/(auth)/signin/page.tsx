'use client'

import { useUser } from '@/app/context/UserContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export type FormValues = {
  email: string
  password: string
}

const Page = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormValues>()
  const { login } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try {
      await login(data)
      router.push('/')
    } catch (error) {
      console.error('Error:', error)
    }
    setIsLoading(false)
  }

  return (
    <div className="pt-24 mx-auto text-center h-[80vh] flex flex-col justify-center items-center">
      <h1
        className="z-50 text-5xl
      w-fit font-serif text-heading-dark relative inline-block"
      >
        Вход
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
          className="py-2 px-4 placeholder:text-heading outline outline-1 outline-background rounded-3xl focus:outline-fuchsia-800/40 min-w-72 text-heading"
        />
        <input
          {...register('password', { required: true })}
          type="password"
          placeholder="Пароль"
          className="py-2 px-4 placeholder:text-heading outline outline-1 outline-background rounded-3xl focus:outline-fuchsia-800/40 min-w-72 text-heading"
        />
        <button
          type="submit"
          className="bg-button w-full p-2 border border-heading
      hover:bg-button/70 transition-all duration-300 rounded-3xl 
      hover:shadow-[inset_0_0_4px_2px_rgba(215,89,161,0.36),0_0_6px_2px_rgba(215,89,161,0.36)] 
       tracking-widest"
        >
          {isLoading ? 'Загрузка...' : 'Войти'}
        </button>
      </form>
    </div>
  )
}

export default Page
