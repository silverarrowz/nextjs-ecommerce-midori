'use client'

import ProductCard from '@/components/ProductCard'
import LineSvg from '@/lib/LineSvg'
import { Product } from '@/app/(payload)/payload-types'
import { useEffect, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?page=${currentPage}&limit=8`,
      )
      const data = await res.json()
      setProducts(data.docs as Product[])
      setTotalPages(data.totalPages)
      setIsLoading(false)
    }
    fetchProducts()
  }, [currentPage])

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  if (isLoading) return <div className="flex justify-center items-center h-screen">Загрузка...</div>

  return (
    <div className="pt-28 text-center mx-4 sm:mx-16">
      <h1
        className="z-50 text-3xl md:text-4xl lg:text-6xl mb-20
      w-fit font-serif text-heading-dark relative inline-block"
      >
        Каталог
        <LineSvg
          className="-left-4 -right-4 -bottom-12 lg:-bottom-20 mx-auto"
          strokeColor="#292461"
        />
      </h1>

      <div className="w-full flex justify-center gap-6 xs:gap-4 md:gap-6 flex-wrap">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination className="mt-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              className={cn('', {
                'pointer-events-none opacity-60': currentPage === 1,
              })}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={index + 1 === currentPage}
                href="#"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              className={cn('', {
                'pointer-events-none opacity-60': currentPage === totalPages,
              })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
