import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { GrShop } from 'react-icons/gr'
import Link from 'next/link'
import { FaMinus, FaPlus, FaRegTrashAlt } from 'react-icons/fa'
import { useCart } from '@/app/context/Cart/CartContext'
import { useUser } from '@/app/context/UserContext'

import { loadStripe } from '@stripe/stripe-js'
import { CartItems, Product } from '@/app/(payload)/payload-types'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Cart = () => {
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
    <div>
      <Sheet>
        <SheetTrigger>
          <GrShop className="size-5 transition-all duration-300 -mb-1" />
        </SheetTrigger>

        <SheetContent className="w-full sm:w-[30rem] sm:max-w-[30rem]">
          <SheetHeader>
            <SheetTitle>
              <SheetClose asChild>
                <Link href={'/cart'}>
                  <h2 className="font-serif text-center text-3xl mb-6">Корзина</h2>
                </Link>
              </SheetClose>
            </SheetTitle>
          </SheetHeader>
          {cartIsEmpty ? (
            <p>
              Ваша корзина пуста.{' '}
              <SheetClose asChild>
                <Link href={'/shop'}>Вернуться к покупкам</Link>
              </SheetClose>
            </p>
          ) : (
            <div>
              <div className="flex flex-col gap-4 overflow-y-scroll pr-2 max-h-[60vh]">
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
                          <SheetClose asChild>
                            <Link
                              href={`/product/${id}`}
                              className="flex-shrink-0 flex-grow w-[50px] xs:w-[160px] h-24 xs:flex-grow-0 sm:w-[90px] relative"
                            >
                              <Image
                                fill
                                src={typeof image === 'string' ? image : image!.url!}
                                alt={name}
                                className="h-[60px] xs:h-full sm:h-[80px] w-full object-cover"
                              />
                            </Link>
                          </SheetClose>
                          <div className="flex flex-col gap-1 flex-shrink-0">
                            <SheetClose asChild>
                              <Link href={`/product/${id}`} className="flex-shrink-0">
                                <h3 className="text-heading-dark">{name}</h3>
                              </Link>
                            </SheetClose>

                            <p className="text-sm text-heading opacity-80">
                              Количество: {quantity}
                            </p>
                            <p className="text-sm text-heading opacity-80">
                              Стоимость:{' '}
                              <span className="font-bold opacity-100">{price * quantity!}</span>{' '}
                              руб.
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
              <div className="text-right font-light mt-4">
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
              <SheetClose asChild>
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
              </SheetClose>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Cart
