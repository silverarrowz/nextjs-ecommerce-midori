'use client'

import { Product } from '@/app/(payload)/payload-types'
import ProductCard from '@/components/ProductCard'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import LineSvg from '@/lib/LineSvg'
import { matchaId, mochiId } from '@/lib/category-ids'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'

const Page = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(name)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const updateQueryParam = (value: string) => {
    if (searchParams.get('query') !== value) {
      router.push(pathname + '?' + createQueryString('query', value))
    }
  }

  const updateCategoryParam = (value: string) => {
    if (searchParams.get('categoryId') !== value) {
      router.push(pathname + '?' + createQueryString('categoryId', value))
    }
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    if (searchParams.get('page') !== newPage.toString()) {
      router.push(pathname + '?' + createQueryString('page', newPage.toString()))
    }
  }

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(e.target.value)
    handlePageChange(1)
    updateCategoryParam(e.target.value)
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setQuery(e.target.value)
    handlePageChange(1)
    setTimeout(() => {
      updateQueryParam(e.target.value)
    }, 2000)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handlePageChange(1)
    updateQueryParam(query)
  }

  const fetchProducts = async (query: string, categoryId: string) => {
    setIsLoading(true)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/allproducts?query=${encodeURIComponent(
        query,
      )}&categoryId=${encodeURIComponent(categoryId)}&page=${encodeURIComponent(currentPage)}`,
    )
    const data = await res.json()
    setProducts(data.docs)
    setTotalPages(data.totalPages || 1)
    setCurrentPage(data.page || 1)
    setIsLoading(false)
  }

  // fetch every time the query string changes
  useEffect(() => {
    const paramsQuery = searchParams.get('query') || ''
    const paramsCategory = searchParams.get('categoryId') || ''

    setQuery(paramsQuery)
    setCategoryId(paramsCategory)

    if (paramsQuery || paramsCategory) {
      fetchProducts(paramsQuery, paramsCategory)
    }
  }, [searchParams])

  if (!products?.length && !isLoading)
    return (
      <div className="pt-28 text-center mx-4 sm:mx-16">
        <h1
          className="z-50 text-3xl md:text-4xl lg:text-6xl mb-20
  w-fit font-serif text-heading-dark relative inline-block text-center"
        >
          Поиск
          <LineSvg
            className="-left-4 -right-4 -bottom-10 lg:-bottom-20 mx-auto"
            strokeColor="#292461"
          />
        </h1>
        <form
          className="mt-4 mb-24 h-10 flex flex-col sm:flex-row gap-2 justify-center"
          onSubmit={handleSubmit}
        >
          <input
            onChange={handleSearch}
            value={query}
            type="text"
            placeholder="Поиск..."
            className="p-2 rounded-lg text-heading placeholder:text-heading placeholder:opacity-70 focus:border border-heading-dark focus:outline-none shadow-sm"
          />
          <select
            onChange={handleCategoryChange}
            value={categoryId}
            name="category"
            id="category"
            className="px-3 py-2 rounded-lg text-heading focus:border border-heading-dark focus:outline-none shadow-sm bg-white cursor-pointer"
          >
            <option value="">Все категории</option>
            <option value={matchaId}>Матча</option>
            <option value={mochiId}>Моти</option>
          </select>
          <button
            type="submit"
            className="sm:rounded-full shadow-sm hover:shadow-none hover:outline-2 outline-heading rounded-lg sm:none bg-white px-4 py-2 transition-colors duration-200 
        mt-4 sm:mt-0   tracking-wider"
          >
            Искать
          </button>
        </form>
        <p>Поиск не дал результатов.</p>
      </div>
    )

  if (isLoading)
    return (
      <div className="pt-28 text-center mx-4 sm:mx-16">
        <h1
          className="z-50 text-3xl md:text-4xl lg:text-6xl mb-20
  w-fit font-serif text-heading-dark relative inline-block text-center"
        >
          Поиск
          <LineSvg
            className="-left-4 -right-4 -bottom-10 lg:-bottom-20 mx-auto"
            strokeColor="#292461"
          />
        </h1>
        <form
          className="mt-4 mb-24 h-10 flex flex-col sm:flex-row gap-2 justify-center"
          onSubmit={handleSubmit}
        >
          <input
            onChange={handleSearch}
            value={query}
            disabled
            type="text"
            placeholder="Поиск..."
            className="p-2 rounded-lg text-heading placeholder:text-heading placeholder:opacity-70 focus:border border-heading-dark focus:outline-none shadow-sm"
          />
          <select
            onChange={handleCategoryChange}
            value={categoryId}
            disabled
            name="category"
            id="category"
            className="px-3 py-2 rounded-lg text-heading focus:border border-heading-dark focus:outline-none shadow-sm bg-white cursor-pointer"
          >
            <option value="">Все категории</option>
            <option value={matchaId}>Матча</option>
            <option value={mochiId}>Моти</option>
          </select>
          <button
            type="submit"
            disabled
            className="sm:rounded-full shadow-none rounded-lg sm:bg-white py-2 px-4 transition-colors duration-200 
        mt-4 sm:mt-0   tracking-wider"
          >
            Искать
          </button>
        </form>
        <p>Идёт поиск...</p>
      </div>
    )

  return (
    <div className="pt-28 text-center mx-4 sm:mx-16">
      <h1
        className="z-50 text-3xl md:text-4xl lg:text-6xl mb-20
  w-fit font-serif text-heading-dark relative inline-block text-center"
      >
        Поиск
        <LineSvg
          className="-left-4 -right-4 -bottom-10 lg:-bottom-20 mx-auto"
          strokeColor="#292461"
        />
      </h1>
      <form
        className="mt-4 mb-24 h-10 flex flex-col sm:flex-row gap-2 justify-center"
        onSubmit={handleSubmit}
      >
        <input
          onChange={handleSearch}
          value={query}
          type="text"
          placeholder="Поиск..."
          className="p-2 rounded-lg text-heading placeholder:text-heading hover:bg-button placeholder:opacity-70 focus:border-2 border-heading-dark focus:outline-none shadow-sm"
        />
        <select
          onChange={handleCategoryChange}
          value={categoryId}
          name="category"
          id="category"
          className="px-3 py-2 rounded-lg text-heading focus:border-2 hover:bg-button border-heading-dark focus:outline-none shadow-sm bg-white cursor-pointer"
        >
          <option value="">Все категории</option>
          <option value={matchaId}>Матча</option>
          <option value={mochiId}>Моти</option>
        </select>
        <button
          type="submit"
          className="rounded-lg sm:rounded-full shadow-sm hover:shadow-none bg-button hover:outline-2 outline-heading mt-4 sm:mt-0 px-4 py-2 transition-colors duration-200 bg-white 
          tracking-wider hover:outline outline-2"
        >
          Искать
        </button>
      </form>

      <div className="w-full flex justify-center gap-6 xs:gap-4 md:gap-6 flex-wrap mb-4">
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

export default Page
