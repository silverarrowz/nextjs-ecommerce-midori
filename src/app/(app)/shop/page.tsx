import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import LineSvg from '@/lib/LineSvg'
import { Product } from '@/payload-types'
import Image from 'next/image'

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/products`)
  const { docs: products }: { docs: Product[] } = await res.json()

  return (
    <div className="pt-28 text-center mx-16">
      <h1
        className="z-50 text-3xl md:text-4xl lg:text-6xl mb-20
      w-fit font-serif text-heading-dark relative inline-block"
      >
        Каталог
        <LineSvg className="-left-4 -right-4 -bottom-20" strokeColor="#ffff94" />
      </h1>

      <ul className="flex w-full justify-between">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  )
}
