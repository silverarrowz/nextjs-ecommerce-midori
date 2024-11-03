'use client'

import { CartItems, Product } from '@/app/(payload)/payload-types'
import { useCart } from '@/app/context/Cart/CartContext'
import { useUser } from '@/app/context/UserContext'
import LineSvg from '@/lib/LineSvg'
import { loadStripe } from '@stripe/stripe-js'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaMinus, FaPlus, FaRegTrashAlt } from 'react-icons/fa'

export default function Page() {
  const { cartIsEmpty, deleteItemFromCart, cart, addOneItem, deleteOneItem } = useCart()

  const { user } = useUser()
  const router = useRouter()

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

  const handleCheckout = async (cartItems: CartItems) => {
    if (user) {
      const stripe = await stripePromise
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems, user }),
      })
      const session = await response.json()
      await stripe?.redirectToCheckout({ sessionId: session.id })
    } else {
      router.push('/signin?redirectTo=cart')
    }
  }

  return (
    <div className="pt-28 mx-4 md:mx-6 lg:mx-16 flex flex-col items-stretch">
      <h1
        className="z-50 text-3xl md:text-4xl lg:text-6xl mb-12 lg:mb-16
      w-fit font-serif text-heading-dark text-center relative inline-block"
      >
        Корзина
        <LineSvg className="-left-4 -right-4 -bottom-12 lg:-bottom-20" strokeColor="#292461" />
      </h1>
      <div>
        {cartIsEmpty ? (
          <p>
            Ваша корзина пуста. <Link href={'/shop'}>Вернуться к покупкам</Link>
          </p>
        ) : (
          <div className="flex flex-col md:flex-row md:gap-6 lg:gap-12">
            <div className="flex flex-col gap-4 overflow-y-scroll pr-4 max-h-[60vh] flex-grow">
              {cart?.items?.map((item, index) => {
                if (typeof item.product === 'object') {
                  const { quantity, product } = item

                  const { id, name, image, price } = product as Product

                  return (
                    <div
                      key={id}
                      className="flex gap-4 xs:gap-0 sm:gap-4 flex-col sm:flex-row justify-between sm:h-32 bg-white p-4 rounded-lg shadow-sm"
                    >
                      <div className="flex gap-4 justify-stretch w-full sm:w-fit">
                        <Link
                          href={`/product/${id}`}
                          className="flex-shrink-0 flex-grow overflow-hidden w-[50px] xs:w-[160px] xs:h-24 xs:flex-grow-0 sm:w-[90px] relative"
                        >
                          <Image
                            fill
                            src={typeof image === 'string' ? image : image!.url!}
                            alt={name}
                            className="h-[60px] xs:h-full sm:h-[80px] w-full object-cover"
                          />
                        </Link>

                        <div className="flex flex-col gap-1 flex-shrink-0">
                          <Link href={`/product/${id}`} className="flex-shrink-0">
                            <h3 className="text-heading-dark">{name}</h3>
                          </Link>

                          <p className="text-sm text-heading opacity-80">Количество: {quantity}</p>
                          <p className="text-sm text-heading opacity-80">
                            Стоимость:{' '}
                            <span className="font-bold opacity-100">{price * quantity!}</span> руб.
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end w-full sm:w-fit gap-4">
                        <div className="flex items-center h-fit gap-2 self-center">
                          <button
                            onClick={() => deleteOneItem(product!)}
                            disabled={item.quantity === 1}
                            className="text-3xl  leading-3 bg-background-light rounded-full p-2 disabled:bg-slate-200 disabled:text-slate-400"
                          >
                            <FaMinus size={12} />
                          </button>
                          {item.quantity}
                          <button
                            onClick={() => addOneItem(product!)}
                            className="text-3xl leading-3 bg-background-light p-2 rounded-full"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            deleteItemFromCart(product!)
                          }}
                        >
                          <FaRegTrashAlt size={20} />
                        </button>
                      </div>
                    </div>
                  )
                }
                return null
              })}
            </div>
            <div className="md:min-w-[30%]">
              <div className="text-right font-light mt-12 md:mt-0 mb-8">
                <p className="text-lg ">
                  Итого:{' '}
                  <span className="font-bold text-2xl text-heading-dark">
                    {cart?.items?.reduce(
                      (total, item) =>
                        total + ((item.product as Product).price || 0) * item.quantity!,
                      0,
                    )}
                  </span>{' '}
                  руб.
                </p>
                <p>
                  Доставка: <span className="font-bold">0</span> руб.
                </p>
              </div>
              <button
                className="rounded-full border-2 font-bold border-heading
   bg-button hover:bg-button/70 transition-all duration-300 shadow-sm
   hover:shadow-[inset_0_0_4px_2px_rgba(215,89,161,0.36),0_0_6px_2px_rgba(215,89,161,0.36)] w-full self-center
   px-9 xs:px-4 xs:text-sm sm:text-base sm:px-6 lg:px-8 py-2 mt-4 tracking-widest"
                onClick={() => {
                  if (cart?.items?.length) {
                    handleCheckout(cart?.items)
                  }
                  console.log(cart)
                }}
              >
                К оплате
              </button>
              <Link
                className="rounded-full border-2 font-bold border-heading block text-center
   bg-transparent  transition-all duration-300 shadow-sm
   hover:shadow-[inset_0_0_4px_2px_rgba(215,89,161,0.36),0_0_6px_2px_rgba(215,89,161,0.36)] w-full self-center
   px-2 mb-4 xs:text-sm sm:text-base py-2 mt-4 tracking-widest"
                href={'/shop'}
              >
                К каталогу
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
