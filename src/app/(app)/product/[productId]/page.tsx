import { getPayload } from 'payload'
import configPromise from '@/app/(payload)/payload.config'
import Link from 'next/link'
import AddToCartButton from '@/components/AddToCartButton'
import ProductReel from '@/components/ProductReel'
import { Product } from '@/app/(payload)/payload-types'
import Image from 'next/image'

interface PageProps {
  params: {
    productId: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { productId } = params
  const payload = await getPayload({ config: configPromise })
  const res = await payload.findByID({
    collection: 'products',
    id: productId,
    disableErrors: true,
  })

  const product = res as any as Product

  return {
    title: `${product.name} | Midori | Моти ручной работы`,
    description: product.description || 'Матча и моти ручной работы',
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
  }
}

const Page = async ({ params }: PageProps) => {
  const BREADCRUMBS = [
    { id: 1, name: 'Главная', href: '/' },
    { id: 2, name: 'Каталог', href: '/shop' },
  ]
  const { productId } = await params

  const payload = await getPayload({ config: configPromise })

  const res = await payload.findByID({
    collection: 'products',
    id: productId,
    disableErrors: true,
  })

  const product = res as any as Product

  const relatedProducts = product?.relatedProducts

  if (!product) {
    return <div className="pt-24 px-6">Продукт не найден.</div>
  }

  return (
    <div className="pt-28 pb-20 px-6 bg-white relative">
      <ol className="flex items-center space-x-2 mb-6">
        {BREADCRUMBS.map((breadcrumb, i) => (
          <li key={breadcrumb.href}>
            <div className="flex items-center text-sm">
              <Link href={breadcrumb.href} className="font-light text-sm ">
                {breadcrumb.name}
              </Link>

              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="ml-2 h-5 w-5 flex-shrink-0"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
            </div>
          </li>
        ))}
        <li className="text-sm">{product.name}</li>
      </ol>
      <div className="flex flex-col md:flex-row gap-10 px-10 py-16">
        <div className="mx-auto w-full h-[500px] md:w-1/2 relative overflow-hidden">
          <Image
            fill
            src={typeof product.image === 'string' ? product.image : product.image!.url!}
            alt={product.name}
            className="object-top object-contain"
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
          <p className="text-heading opacity-80">{product.description}</p>
          <AddToCartButton product={product} showCounter />
        </div>
      </div>

      <div className="text-center mx-auto">
        <h2
          className="z-50 text-3xl md:text-4xl lg:text-5xl
      text-center font-serif text-heading-dark pt-12"
        >
          Попробуйте также
          <div className="hidden sm:block -mt-2 lg:-mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 800 400"
              className="mx-auto w-20 lg:w-40 mb-2 lg:mb-0"
            >
              <path
                d="M163.7992706298828,218.10035705566406C171.3321266937256,213.03016713460286,195.3285469309489,187.89725809733073,210.39425659179688,186.7383575439453C225.45996625264485,185.5794569905599,237.86736323038738,210.93190002441406,256.9892272949219,210.93190002441406C276.1110913594564,210.93190002441406,306.07526240030927,185.43459442138672,328.673828125,186.7383575439453C351.27239384969073,188.0421206665039,373.01670364379885,218.4169639078776,396.774169921875,218.9964141845703C420.53163619995115,219.57586446126302,455.9259085083008,191.19176147460936,475.6272277832031,190.3225860595703C495.32854705810547,189.45341064453126,498.3572358703613,212.4611708577474,518.6380004882812,213.6200714111328C538.9187651062011,214.77897196451823,581.0842218017578,197.05645538330077,601.0752563476562,197.4910430908203C621.0662908935547,197.92563079833985,635.6302060953776,213.26612884521484,642.2938842773438,216.30824279785156"
                fill="none"
                strokeWidth="8"
                stroke="#99ff66"
                strokeLinecap="butt"
                transform="matrix(1.6764303884620877,0,0,1.6764303884620877,-275.6795431990246,-140.0579031616998)"
              ></path>
              <defs>
                <linearGradient id="SvgjsLinearGradient1001">
                  <stop stopColor="hsl(37, 99%, 67%)" offset="0"></stop>
                  <stop stopColor="hsl(316, 73%, 52%)" offset="1"></stop>
                </linearGradient>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 800 400"
              className="mx-auto w-28 -mt-10"
            >
              <path
                d="M163.7992706298828,218.10035705566406C171.3321266937256,213.03016713460286,195.3285469309489,187.89725809733073,210.39425659179688,186.7383575439453C225.45996625264485,185.5794569905599,237.86736323038738,210.93190002441406,256.9892272949219,210.93190002441406C276.1110913594564,210.93190002441406,306.07526240030927,185.43459442138672,328.673828125,186.7383575439453C351.27239384969073,188.0421206665039,373.01670364379885,218.4169639078776,396.774169921875,218.9964141845703C420.53163619995115,219.57586446126302,455.9259085083008,191.19176147460936,475.6272277832031,190.3225860595703C495.32854705810547,189.45341064453126,498.3572358703613,212.4611708577474,518.6380004882812,213.6200714111328C538.9187651062011,214.77897196451823,581.0842218017578,197.05645538330077,601.0752563476562,197.4910430908203C621.0662908935547,197.92563079833985,635.6302060953776,213.26612884521484,642.2938842773438,216.30824279785156"
                fill="none"
                strokeWidth="8"
                stroke="#822966"
                strokeLinecap="butt"
                transform="matrix(1.6764303884620877,0,0,1.6764303884620877,-275.6795431990246,-140.0579031616998)"
              ></path>
              <defs>
                <linearGradient id="SvgjsLinearGradient1001">
                  <stop stopColor="hsl(37, 99%, 67%)" offset="0"></stop>
                  <stop stopColor="hsl(316, 73%, 52%)" offset="1"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </h2>
        <ProductReel className="py-0" products={relatedProducts as Product[]} />
      </div>
    </div>
  )
}

export default Page
