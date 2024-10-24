'use client'

import Link from 'next/link'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet'
import { RxHamburgerMenu } from 'react-icons/rx'
import MobileSearchbar from './MobileSearchbar'
import { useEffect, useState } from 'react'

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  // useEffect(() => {
  //   const handleSearchSubmit = (event: MouseEvent | KeyboardEvent) => {}

  //   document.addEventListener('mousedown', handleSearchSubmit)
  //   document.addEventListener('keydown', handleSearchSubmit)

  //   return () => {
  //     document.removeEventListener('mousedown', handleSearchSubmit)
  //     document.removeEventListener('keydown', handleSearchSubmit)
  //   }
  // }, [])

  return (
    <div className="lg:hidden flex items-center">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger onClick={() => setIsOpen(true)}>
          <RxHamburgerMenu className="" size={24} />
        </SheetTrigger>
        <SheetContent side={'left'} className="w-full">
          <nav>
            <ul
              className="text-3xl font-light
            flex flex-col gap-4 p-4 *:hover:*:opacity-70"
            >
              <li>
                <SheetClose asChild>
                  <Link href={'/shop'} onClick={() => setIsOpen(false)}>
                    Каталог
                  </Link>
                </SheetClose>
              </li>
              <li>
                <SheetClose asChild>
                  <Link href={'/#about'} onClick={() => setIsOpen(false)}>
                    О нас
                  </Link>
                </SheetClose>
              </li>
              <li>
                <SheetClose asChild>
                  <Link href={'/#contacts'} onClick={() => setIsOpen(false)}>
                    Контакты
                  </Link>
                </SheetClose>
              </li>
              <li>
                <SheetClose asChild>
                  <Link href={'/#reviews'} onClick={() => setIsOpen(false)}>
                    Отзывы
                  </Link>
                </SheetClose>
              </li>
            </ul>
          </nav>
          <MobileSearchbar className="mt-8" closeSheet={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNav
