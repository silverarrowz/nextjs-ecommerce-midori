'use client'

import { Product } from '@/app/(payload)/payload-types'
import ProductCard from '@/components/ProductCard'
import LineSvg from '@/lib/LineSvg'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

const Page = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState('')
  const [categoryId, setCategoryId] = useState('')

  //   const [page, setPage] = useState(1)
  //   const [totalPages, setTotalPages] = useState(1)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value)
    router.push(pathname + '?' + createQueryString('categoryId', e.target.value))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setTimeout(() => {
      router.push(pathname + '?' + createQueryString('query', e.target.value))
    }, 2000)
  }

  const fetchProducts = async (query: string, categoryId: string) => {
    setIsLoading(true)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/allproducts?query=${encodeURIComponent(
        query,
      )}&categoryId=${encodeURIComponent(categoryId)}`,
    )
    const data = await res.json()
    setProducts(data.docs)
    // setTotalPages(data.totalPages)
    setIsLoading(false)
  }

  useEffect(() => {
    const initialQuery = searchParams.get('query') || ''
    const initialCategoryId = searchParams.get('categoryId') || ''

    setQuery(initialQuery)
    setCategoryId(initialCategoryId)

    if (initialQuery || initialCategoryId) {
      fetchProducts(initialQuery, initialCategoryId)
    }
  }, [])

  useEffect(() => {
    setQuery(searchParams.get('query') || '')
    setCategoryId(searchParams.get('categoryId') || '')
  }, [searchParams])

  useEffect(() => {
    fetchProducts(query, categoryId)
  }, [query, categoryId])

  if (!products?.length && !isLoading)
    return (
      <div className="pt-28 text-center mx-4 sm:mx-16">
        <h1
          className="z-50 text-3xl md:text-4xl lg:text-6xl mb-20
  w-fit font-serif text-heading-dark relative inline-block"
        >
          Поиск
          <LineSvg className="-left-4 -right-4 -bottom-20" strokeColor="#f0f8f0" />
        </h1>
        <form className="mb-12 h-10 flex gap-2 justify-center">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Поиск..."
            className="p-2 rounded-lg text-heading placeholder:text-heading placeholder:opacity-70 focus:border border-heading-dark focus:outline-none shadow-sm"
          />
          <select
            onChange={handleCategoryChange}
            name="category"
            id="category"
            className="px-3 py-2 rounded-lg text-heading focus:border border-heading-dark focus:outline-none shadow-sm"
          >
            <option value="">Все категории</option>
            <option value="6713885202adac4858d83115">Матча</option>
            <option value="6713884202adac4858d830dc">Моти</option>
          </select>
        </form>
        <p>Поиск не дал результатов.</p>
      </div>
    )

  if (isLoading)
    return (
      <div className="pt-28 text-center mx-4 sm:mx-16">
        <h1
          className="z-50 text-3xl md:text-4xl lg:text-6xl mb-20
  w-fit font-serif text-heading-dark relative inline-block"
        >
          Поиск
          <LineSvg className="-left-4 -right-4 -bottom-20" strokeColor="#f0f8f0" />
        </h1>
        <form className="mb-12 h-10 flex gap-2 justify-center">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Поиск..."
            className="p-2 rounded-lg text-heading placeholder:text-heading placeholder:opacity-70 focus:border border-heading-dark focus:outline-none shadow-sm"
          />
          <select
            onChange={handleCategoryChange}
            name="category"
            id="category"
            className="px-3 py-2 rounded-lg text-heading focus:border border-heading-dark focus:outline-none shadow-sm"
          >
            <option value="">Все категории</option>
            <option value="6713885202adac4858d83115">Матча</option>
            <option value="6713884202adac4858d830dc">Моти</option>
          </select>
        </form>
        <p>Идёт поиск...</p>
      </div>
    )

  return (
    <div className="pt-28 text-center mx-4 sm:mx-16">
      <h1
        className="z-50 text-3xl md:text-4xl lg:text-6xl mb-20
  w-fit font-serif text-heading-dark relative inline-block"
      >
        Поиск
        <LineSvg className="-left-4 -right-4 -bottom-10 lg:-bottom-20" strokeColor="#f0f8f0" />
      </h1>
      <form className="mb-12 h-10 flex gap-2 justify-center">
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Поиск..."
          className="p-2 rounded-lg text-heading placeholder:text-heading placeholder:opacity-70 focus:border border-heading-dark focus:outline-none shadow-sm"
        />
        <select
          onChange={handleCategoryChange}
          name="category"
          id="category"
          className="px-3 py-2 rounded-lg text-heading focus:border border-heading-dark focus:outline-none shadow-sm"
        >
          <option value="">Все категории</option>
          <option value="6713885202adac4858d83115">Матча</option>
          <option value="6713884202adac4858d830dc">Моти</option>
        </select>
      </form>

      <div className="w-full flex justify-center gap-6 xs:gap-4 md:gap-6 flex-wrap mb-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Page
