'use client'

import Link from 'next/link'
import { IoSearch } from 'react-icons/io5'
import MobileNav from './MobileNav'
import Cart from './Cart'
import { RiAccountCircleLine } from 'react-icons/ri'
import { useEffect, useRef, useState } from 'react'
import DropdownMenu from './DropdownMenu'
import LineSvg from '@/lib/LineSvg'
import DropdownAccount from './DropdownAccount'
import { useUser } from '@/app/context/UserContext'

const Header = () => {
  const { user, isLoggedIn } = useUser()
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false)
  const [isDropdownAccountOpen, setIsDropdownAccountOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null) // Ref for the button
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside both the button and the dropdown
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownAccountOpen(false) // Close dropdown on outside click
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside) // Cleanup listener on unmount
    }
  }, [])
  const toggleDropdown = () => {
    setIsDropdownAccountOpen((prevState) => !prevState) // Toggle dropdown state
  }

  // const dropdownRef = useRef<HTMLDivElement | null>(null) // Create a ref for the dropdown

  // const handleClickOutside = (event: MouseEvent) => {
  //   // Check if the clicked target is outside the dropdown
  //   if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  //     setIsDropdownAccountOpen(false)
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside) // Listen for clicks

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside) // Clean up
  //   }
  // }, [])

  return (
    <header
      className="w-full p-3 md:px-5 xs:py-6 grid grid-cols-3 items-center 
      fixed z-[1111] bg-background/75 backdrop-blur-md
    "
    >
      <nav className="hidden lg:block">
        <ul className="flex *:pr-8 justify-between w-max transition-all ">
          <li className="relative h-20 -mb-14" onMouseLeave={() => setIsDropdownMenuOpen(false)}>
            <Link
              href={'/shop'}
              className="group hover:opacity-85 cursor-pointer"
              onMouseEnter={() => setIsDropdownMenuOpen(true)}
              onClick={() => setIsDropdownMenuOpen(!isDropdownMenuOpen)}
            >
              Каталог
            </Link>
            <DropdownMenu isOpen={isDropdownMenuOpen} />
          </li>
          <li>
            <Link className="relative group hover:opacity-85" href={'/about'}>
              О нас
              <LineSvg className="-left-4 -right-4 -bottom-7 hidden group-hover:block" />
            </Link>
          </li>
          <li>
            <Link className="relative group hover:opacity-85" href={'/contacts'}>
              Контакты
              <LineSvg className="-left-2 -right-2 -bottom-8 hidden group-hover:block" />
            </Link>
          </li>
          <li>
            <Link className="relative group hover:opacity-85" href={'/reviews'}>
              Отзывы
              <LineSvg className="-left-2 -right-2 -bottom-7 hidden group-hover:block" />
            </Link>
          </li>
        </ul>
      </nav>
      <MobileNav />
      <Link
        href={'/'}
        className="text-2xl text-foreground font-serif
        text-center w-fit justify-self-center"
      >
        <h3>MiDori</h3>
      </Link>
      <div className="flex items-center gap-5 md:gap-8 transition-all justify-end">
        <button className="hidden sm:block">
          <IoSearch className="size-5 transition-all duration-300 hover:opacity-80" />
        </button>
        <div className="relative mt-2">
          <button onClick={toggleDropdown} ref={buttonRef}>
            <RiAccountCircleLine className="size-6 transition-all duration-300 hover:opacity-80" />
          </button>
          <DropdownAccount
            ref={dropdownRef}
            isOpen={isDropdownAccountOpen}
            closeDropdown={() => setIsDropdownAccountOpen(false)}
          />
        </div>

        <Cart />
      </div>
    </header>
  )
}

export default Header
