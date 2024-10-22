'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, forwardRef, useEffect, useRef, useState } from 'react'
import { IoSearch } from 'react-icons/io5'

interface SearchbarProps extends React.FormHTMLAttributes<HTMLFormElement> {
  isVisible: boolean
}

const Searchbar = forwardRef<HTMLFormElement, SearchbarProps>(({ isVisible, ...props }, ref) => {
  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.push(`/search?query=${searchQuery}`)
  }

  useEffect(() => {
    setSearchQuery('')
    if (isVisible && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isVisible])

  return (
    <form
      onSubmit={handleSubmit}
      ref={ref}
      className={cn(
        'absolute -right-2.5 -top-2.5 w-0 transition-all duration-300 overflow-hidden rounded-3xl shadow-sm',
        {
          'w-48': isVisible,
        },
      )}
    >
      <div className="w-full relative">
        <button type="submit" className="absolute right-2.5 top-2.5 z-[1404] text-heading">
          <IoSearch className="size-5" />
        </button>

        <input
          ref={inputRef}
          type="text"
          placeholder="Поиск"
          className="w-full py-2 px-4 rounded-3xl focus:outline-1 focus:outline-heading text-heading placeholder:text-heading placeholder:opacity-70 overflow-hidden relative"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </form>
  )
})

Searchbar.displayName = 'Searchbar'

export default Searchbar
