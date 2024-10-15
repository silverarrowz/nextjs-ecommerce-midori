import { getPayload } from 'payload'
import configPromise from '@/app/(payload)/payload.config'
import Link from 'next/link'
import AddToCartButton from '@/components/AddToCartButton'

interface PageProps {
  params: {
    productId: string
  }
}

const Page = async ({ params }: PageProps) => {
  const BREADCRUMBS = [
    { id: 1, name: 'Главная', href: '/' },
    { id: 2, name: 'Каталог', href: '/shop' },
  ]
  const { productId } = await params

  const payload = await getPayload({ config: configPromise })

  const product = await payload.findByID({
    collection: 'products',
    id: productId,
    disableErrors: true,
  })

  if (!product) {
    return <div className="pt-24 px-6">Продукт не найден.</div>
  }

  return (
    <div className="pt-28 px-6 bg-white">
      <ol className="flex items-center space-x-2 mb-6">
        {BREADCRUMBS.map((breadcrumb, i) => (
          <li key={breadcrumb.href}>
            <div className="flex items-center text-sm">
              <Link href={breadcrumb.href} className="font-light text-sm ">
                {breadcrumb.name}
              </Link>
              {i !== BREADCRUMBS.length - 1 ? (
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="ml-2 h-5 w-5 flex-shrink-0"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
      <div className="flex flex-col md:flex-row gap-10 px-10 py-16">
        <div className="mx-auto w-full h-full md:w-1/2">
          <img
            src={typeof product.image === 'string' ? product.image : product.image!.url!}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1
            className="text-3xl
          leading-none
           tracking-widest font-serif line-clamp-2"
          >
            {product.name}
          </h1>
          <p className="font-light">{product.price} руб.</p>
          <p>{product.description}</p>
          <AddToCartButton product={product} showCounter />
        </div>
      </div>
    </div>
  )
}

export default Page
