import Link from 'next/link'
import { FaInstagram } from 'react-icons/fa'
import { FaSquareTwitter } from 'react-icons/fa6'
import { RiVkLine } from 'react-icons/ri'

const Footer = () => {
  return (
    <footer
      className="min-h-[420px] bg-background
    relative  px-4 py-8 sm:px-16 sm:pt-16"
    >
      <div className="flex flex-col gap-y-20 md:flex-row justify-between">
        <div className="flex flex-col gap-16 sm:gap-28">
          <div className="flex flex-col gap-8">
            <h3 className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl font-serif">
              Мы в соцсетях
            </h3>
            <div className="flex gap-2 items-center *:hover:*:opacity-70">
              <Link href={'/'}>
                <FaInstagram size={28} />
              </Link>
              <Link href={'/'}>
                <RiVkLine size={30} />
              </Link>
              <Link href={'/'}>
                <FaSquareTwitter size={28} />
              </Link>
            </div>
          </div>
          <div className="">
            <h4 className="mb-4 font-light">Подписывайтесь и получайте скидки и бонусы</h4>
            <form className="flex flex-col sm:flex-row gap-2 items-stretch">
              <input
                type="email"
                placeholder="E-mail"
                className="py-2 px-4 border border-foreground/60 
                 placeholder:text-foreground
                focus:outline-none 
                
              rounded-3xl
                  font-sans-light"
              />
              <button
                className="bg-button rounded-3xl
             tracking-widest border border-foreground/60
               hover:bg-transparent  transition-all duration-300
                hover:shadow-[inset_0_0_3px_3px_rgba(215,89,161,0.36),0_0_7px_4px_rgba(215,89,161,0.36)]
                px-6 py-2"
              >
                Подписаться
              </button>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl sm:text-4xl md:text-3xl lg:text-4xl font-serif">Магазин</h3>
            <ul className="flex flex-col gap-2 *:hover:*:opacity-60  *:tracking-tighter md:text-sm lg:text-base">
              <li>
                <Link href={'/shop'}>Моти</Link>
              </li>
              <li>
                <Link href={'/shop'}>Матча</Link>
              </li>

              <li>
                <Link href={'/contacts'}>Скидки и акции</Link>
              </li>
              <li>
                <Link href={'/shop'}>Все продукты</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl sm:text-4xl md:text-3xl lg:text-4xl font-serif">Инфо</h3>
            <ul className="gap-2 flex flex-col *:hover:*:opacity-60 *:tracking-tighter md:text-sm lg:text-base">
              <li>
                <Link href={'/'}>Контакты</Link>
              </li>
              <li>
                <Link href={'/'}>FAQ</Link>
              </li>
              <li>
                <Link href={'/'}>Доставка и возврат</Link>
              </li>
              <li>
                <Link href={'/'}>Политика конфиденциальности</Link>
              </li>
              <li>
                <Link href={'/'}>Работа у нас</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center mt-16">&copy; 2024 MiDori. Все права защищены.</div>
    </footer>
  )
}

export default Footer
