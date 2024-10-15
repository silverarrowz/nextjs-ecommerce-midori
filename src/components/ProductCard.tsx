import { Product } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden
       p-4 w-full xs:min-w-44 xs:w-1/3 sm:min-w-52 sm:w-1/4 md:w-1/5"
    >
      <div className="w-full h-48 relative">
        <Image
          src={typeof product.image === 'string' ? product.image : product.image!.url!}
          alt={product.name}
          fill
          className="object-cover absolute top-0 left-0 w-full h-full rounded-lg   transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="mt-4 flex-grow">
        <h2
          className=" text-2xl sm:text-xl md:text-2xl xl:text-3xl 
          leading-none
           tracking-widest font-serif line-clamp-2"
        >
          {product.name}
        </h2>
        {product.amount && <p className="text-sm text-gray-500 mt-1">{product.amount}</p>}
        <p className="font-light mt-2">{product.price} руб.</p>
      </div>
      <button
        className="rounded-3xl border border-heading
          bg-button hover:bg-button/70 transition-all duration-300
          hover:shadow-[inset_0_0_4px_2px_rgba(215,89,161,0.36),0_0_6px_2px_rgba(215,89,161,0.36)] w-full sm:w-fit self-center
          px-9 xs:px-4 xs:text-sm sm:px-6 lg:px-8 py-2 mb-2 mt-6 tracking-widest"
      >
        В корзину
      </button>
    </Link>
  )
}

export default ProductCard
