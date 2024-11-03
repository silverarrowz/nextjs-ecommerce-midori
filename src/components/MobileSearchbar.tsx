'use client'

import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { IoSearch } from 'react-icons/io5'

interface MobileSearchbarProps {
  className?: string
  closeSheet: () => void
}

const MobileSearchbar = ({ className, closeSheet }: MobileSearchbarProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.push(`/search?query=${searchQuery}`)
    setSearchQuery('')
    closeSheet()
  }

  return (
    <form onSubmit={handleSubmit} className={cn('px-4 overflow-hidden ', className)}>
      <div className="w-full relative">
        <button
          type="submit"
          className="absolute right-2.5 top-2.5 z-[1404] text-heading outline-none border-0 active:outline-none"
          aria-label="search button"
        >
          <IoSearch className="size-5" />
        </button>

        <input
          type="text"
          placeholder="Поиск..."
          className="w-full py-2 border-b rounded-none border-heading-dark focus:border-heading-dark focus:border-b-2 focus:outline-none bg-transparent text-heading-dark placeholder:text-heading-dark placeholder:opacity-70 overflow-hidden relative"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </form>
  )
}

export default MobileSearchbar
