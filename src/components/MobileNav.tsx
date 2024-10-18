import Link from 'next/link'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet'
import { RxHamburgerMenu } from 'react-icons/rx'

const MobileNav = () => {
  return (
    <div className="lg:hidden flex items-center">
      <Sheet>
        <SheetTrigger>
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
                  <Link href={'/shop'}>Каталог</Link>
                </SheetClose>
              </li>
              <li>
                <SheetClose asChild>
                  <Link href={'/#about'}>О нас</Link>
                </SheetClose>
              </li>
              <li>
                <SheetClose asChild>
                  <Link href={'/#contacts'}>Контакты</Link>
                </SheetClose>
              </li>
              <li>
                <SheetClose asChild>
                  <Link href={'/#reviews'}>Отзывы</Link>
                </SheetClose>
              </li>
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNav
