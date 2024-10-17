// import { useCartStore } from '@/app/zustand/use-cart'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet'
import { GrShop } from 'react-icons/gr'
import Link from 'next/link'
import { FaMinus, FaPlus, FaRegTrashAlt } from 'react-icons/fa'
import { useCart } from '@/app/context/Cart/CartContext'

const Cart = () => {
  // const { items, removeFromCart, removeOne, addOne } = useCartStore()
  const { cartIsEmpty, deleteItemFromCart, hasInitializedCart, cart, addOneItem, deleteOneItem } =
    useCart()

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <GrShop className="size-5 transition-all duration-300 -mb-1" />
        </SheetTrigger>

        <SheetContent className="w-[80%] sm:w-[30rem] sm:max-w-[30rem]">
          <SheetHeader>
            <h2 className="font-serif text-center text-3xl mb-6">Корзина</h2>
          </SheetHeader>
          {cartIsEmpty ? (
            <p>
              Ваша корзина пуста. <Link href={'/shop'}>Вернуться к покупкам</Link>
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {cart?.items?.map((item, index) => {
                if (typeof item.product === 'object') {
                  const {
                    quantity,
                    product,
                    product: { id, name, image, price },
                  } = item

                  return (
                    <div key={id} className="flex gap-4 bg-white py-2 px-4 rounded-lg">
                      <SheetClose asChild>
                        <Link href={`/product/${id}`} className="flex-shrink-0">
                          <img
                            src={typeof image === 'string' ? image : image!.url!}
                            alt={name}
                            className="w-[100px]"
                          />
                        </Link>
                      </SheetClose>

                      <div className="flex flex-col gap-1 flex-shrink-0">
                        <SheetClose asChild>
                          <Link href={`/product/${id}`} className="flex-shrink-0">
                            <h3 className="text-heading-dark">{name}</h3>
                          </Link>
                        </SheetClose>

                        <p className="text-sm text-heading opacity-80">Количество: {quantity}</p>
                        <p className="text-sm text-heading opacity-80">
                          Стоимость:{' '}
                          <span className="font-bold opacity-100">{price * quantity}</span> руб.
                        </p>
                      </div>
                      <div className="flex justify-between w-full">
                        <div className="flex items-center h-fit gap-2 self-center">
                          <button
                            onClick={() => deleteOneItem(product)}
                            disabled={item.quantity === 1}
                            className="text-3xl  leading-3 bg-background-light rounded-full p-2 disabled:bg-slate-200 disabled:text-slate-400"
                          >
                            <FaMinus size={12} />
                          </button>
                          {item.quantity}
                          <button
                            onClick={() => addOneItem(product)}
                            className="text-3xl leading-3 bg-background-light p-2 rounded-full"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            deleteItemFromCart(product)
                            console.log('click')
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
          )}
          {/* {items.length === 0 ? (
            <p>
              Ваша корзина пуста. <Link href={'/shop'}>Вернуться к покупкам</Link>
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white py-2 px-4 rounded-lg">
                  <div className="flex-shrink-0">
                    <img
                      src={typeof item.image === 'string' ? item.image : item.image!.url!}
                      alt={item.name}
                      className="w-[100px]"
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-shrink-0">
                    <h3 className="text-heading-dark">{item.name}</h3>
                    <p className="text-sm text-heading opacity-80">Количество: {item.quantity}</p>
                    <p className="text-sm text-heading opacity-80">
                      Стоимость:{' '}
                      <span className="font-bold opacity-100">{item.price * item.quantity}</span>{' '}
                      руб.
                    </p>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex items-center h-fit gap-2 self-center">
                      <button
                        onClick={() => removeOne(item.id)}
                        disabled={item.quantity === 1}
                        className="text-3xl  leading-3 bg-background-light rounded-full p-2 disabled:bg-slate-200 disabled:text-slate-400"
                      >
                        <FaMinus size={12} />
                      </button>
                      {item.quantity}
                      <button
                        onClick={() => addOne(item.id)}
                        className="text-3xl leading-3 bg-background-light p-2 rounded-full"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)}>
                      <FaRegTrashAlt size={20} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="text-right font-light mt-2">
                <p className="text-lg ">
                  Итого:{' '}
                  <span className="font-bold text-2xl text-heading-dark">
                    {items.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                  </span>{' '}
                  руб.
                </p>
                <p>
                  Доставка: <span className="font-bold">0</span> руб.
                </p>
              </div>

              <button
                className="rounded-3xl border border-heading
      bg-button hover:bg-button/70 transition-all duration-300
      hover:shadow-[inset_0_0_4px_2px_rgba(215,89,161,0.36),0_0_6px_2px_rgba(215,89,161,0.36)] w-full self-center
      px-9 xs:px-4 xs:text-sm sm:px-6 lg:px-8 py-2 mt-4 tracking-widest"
              >
                К оплате
              </button>
            </div>
          )} */}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Cart
