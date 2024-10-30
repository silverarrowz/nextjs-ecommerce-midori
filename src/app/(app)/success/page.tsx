// 'use client'

import { Order, Product } from '@/app/(payload)/payload-types'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { getPayload } from 'payload'
import { useEffect, useState } from 'react'
import configPromise from '@/app/(payload)/payload.config'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Page = async ({ searchParams }: PageProps) => {
  // const searchParams = useSearchParams()
  // const orderId = searchParams.get('orderId')

  // const [products, setProducts] = useState<Product[]>([])

  // useEffect(() => {
  //   const fetchOrder = async () => {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`,
  //     )
  //     const data = await res.json()
  //     setProducts(data.docs as Product[])

  //     console.log(data)
  //   }
  //   fetchOrder()
  // }, [])

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`,
  //     )
  //     const data = await res.json()
  //     setProducts(data.docs as Product[])

  //     console.log(data)
  //   }
  //   fetchProducts()
  // }, [])
  const orderId = searchParams.orderId
  const payload = await getPayload({ config: configPromise })

  const { docs: orders } = await payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  })

  const [order] = orders
  const { items, total } = order as Order

  return (
    <div className="pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-heading bg-background-light">
        <div className="flex flex-col justify-start gap-20 p-10 sm:p-24">
          <div className="text-center">
            <h1
              className="z-50 text-3xl md:text-4xl lg:text-6xl mb-8 lg:mb-12
      w-fit font-serif text-heading-dark text-center relative inline-block"
            >
              Благодарим Вас за покупку!
            </h1>
            <p className="font-bold">
              <span className="font-thin">Номер заказа:</span> {orderId}
            </p>
          </div>

          <div className="flex flex-col gap-10">
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

        <div className="flex flex-col justify-center gap-4 bg-background-lightest p-16">
          <div className="space-y-4">
            {items?.map((item) => (
              <Link
                href={`/product/${item.product.id}`}
                key={item.id}
                className="p-4 border border-zinc-300 shadow-sm rounded-md flex justify-between items-center hover:shadow-md transition-all"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product?.image?.url}
                    alt={item.product?.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-light text-lg">{item.product.name}</h2>
                    <p className="text-sm font-light">x {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p>
                    <span className="font-semibold">{item.product.price * item.quantity} </span>руб.
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-lg text-right font-light">
            Итого: <span className="text-2xl font-bold leading-none">{total} </span>
            руб.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
