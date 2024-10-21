'use client'

import { Product } from '@/app/(payload)/payload-types'
import ProductCard from '@/components/ProductCard'
import LineSvg from '@/lib/LineSvg'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const Page = () => {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const searchParams = useSearchParams()
  //   const [page, setPage] = useState(1)
  //   const [totalPages, setTotalPages] = useState(1)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    setQuery(searchParams.get('query') || '')
    setCategory(searchParams.get('category') || '')
  }, [searchParams])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/products?limit=8&search=${encodeURIComponent(
          query,
        )}`,
      )
      const data = await res.json()
      setProducts(data.docs)
      //   setTotalPages(data.totalPages)
      console.log(res)
    }
    fetchProducts()
  }, [query])

  return (
    <div className="pt-28 text-center mx-4 sm:mx-16">
      <h1
        className="z-50 text-3xl md:text-4xl lg:text-6xl mb-20
  w-fit font-serif text-heading-dark relative inline-block"
      >
        Поиск
        <LineSvg className="-left-4 -right-4 -bottom-20" strokeColor="#ffff94" />
      </h1>

      <div className="w-full flex justify-center gap-6 xs:gap-4 md:gap-6 flex-wrap">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Page
