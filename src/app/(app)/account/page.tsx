'use client'

import { Media, Order, Product } from '@/app/(payload)/payload-types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUser } from '@/app/context/UserContext'

const Page = () => {
  const { user } = useUser()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)

  if (!user) {
    router.push('/signin?redirectTo=account')
  }

  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ordersWithImages?userId=${encodeURIComponent(
            user?.id,
          )}`,
        )
        const data = await res.json()

        setOrders(data.docs as Order[])
        setIsLoading(false)
      }
    }
    fetchOrders()
  }, [user])

  return (
    <div className="pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-heading bg-white">
        <div className="flex flex-col justify-start  p-16">
          <div className="">
            <h1
              className="z-50 text-3xl md:text-4xl lg:text-6xl mb-8 lg:mb-12
      w-fit font-serif text-heading-dark  relative inline-block"
            >
              Мой аккаунт
            </h1>
            <label className="font-light flex gap-4 items-center">
              <p className="flex-shrink-0 w-max">E-mail:</p>
              <input
                className="font-normal border p-2 rounded-md focus:outline-lime-300 w-full"
                type="text"
                value={user?.email}
                readOnly
                aria-readonly
              />
            </label>
          </div>

          <div className="block w-fit">
            <Link
              href={'/'}
              className="rounded-3xl  border-2 border-foreground
            bg-button font-bold tracking-wider
            group hover:italic hover:bg-transparent
            hover:shadow-[inset_0_0_4px_3px_rgba(215,89,161,0.36),0_0_6px_3px_rgba(215,89,161,0.42)]
            px-7 py-1  transition duration-300
            w-auto self-center mt-6
            flex items-center gap-2"
            >
              На главную
              <span
                className="text-xl group-hover:translate-x-1 transition-all
             duration-100 ease-in-out"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 bg-background-lightest px-4 py-8 xs:p-10">
          <h2 className="font-serif text-2xl xs:mb-6">История заказов</h2>
          <div className="max-h-[70vh] overflow-y-scroll pr-4">
            {orders?.length ? (
              orders.map((order) => {
                return (
                  <div
                    key={order.id}
                    className="p-4 border bg-white border-gray-300 rounded-md mb-4 shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2 justify-between border-b border-gray-300 mb-4 pb-4">
                      <div className="flex flex-col gap-2">
                        <p className="font-light text-sm flex items-center gap-2">
                          <span className="opacity-60">Дата заказа:</span>{' '}
                          <span className="">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </p>
                        <p className="font-light text-sm flex items-center gap-2">
                          <span className="opacity-60">ID:</span>{' '}
                          <span className="">{order.id}</span>
                        </p>
                      </div>

                      <p className="font-light">
                        Итого: <span className="font-bold text-xl">{order.total}</span> руб.
                      </p>
                    </div>

                    <div className="space-y-2">
                      {order.items!.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 border-b border-gray-200 pb-2"
                        >
                          <Link href={`/product/${(item.product as Product).id}`}>
                            <img
                              src={((item.product as Product).image as Media).url as string}
                              alt={(item.product as Product)!.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          </Link>

                          <div>
                            <Link href={`/product/${(item.product as Product).id}`}>
                              <h3 className="font-semibold">{(item.product as Product).name}</h3>
                            </Link>

                            <p className="opacity-70">
                              <span className="font-light text-sm">x</span> {item.quantity}
                            </p>
                            <p className="font-light opacity-70">
                              Стоимость: {(item.product as Product).price * item.quantity!} руб.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })
            ) : isLoading ? (
              <p className="font-light">Загрузка...</p>
            ) : (
              <p className="font-light">Вы ещё не сделали ни одного заказа.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
