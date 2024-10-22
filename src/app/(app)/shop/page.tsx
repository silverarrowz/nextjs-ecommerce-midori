'use client'

import ProductCard from '@/components/ProductCard'
import LineSvg from '@/lib/LineSvg'
import { Product } from '@/app/(payload)/payload-types'
import { useEffect, useState } from 'react'

export default function Page() {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/products`)
      const data = await res.json()
      setProducts(data.docs as Product[])
      // setTotalPages(data.totalPages)
      console.log(data)
    }
    fetchProducts()
  }, [page])

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  return (
    <div className="pt-28 text-center mx-4 sm:mx-16">
      <h1
        className="z-50 text-3xl md:text-4xl lg:text-6xl mb-20
      w-fit font-serif text-heading-dark relative inline-block"
      >
        Каталог
        <LineSvg className="-left-4 -right-4 -bottom-20" strokeColor="#f0f8f0" />
      </h1>

      <div className="w-full flex justify-center gap-6 xs:gap-4 md:gap-6 flex-wrap">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center items-center">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 mr-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
        >
          Previous
        </button>
        <span>
          {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 ml-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  )
}
