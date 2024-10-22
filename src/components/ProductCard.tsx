import { Product } from '@/app/(payload)/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from './AddToCartButton'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div
      className="flex flex-col justify-between bg-white shadow-md rounded-lg overflow-hidden
    p-4 w-full xs:min-w-44 xs:w-1/3 sm:min-w-52 sm:w-1/4 md:w-1/5"
    >
      <Link href={`/product/${product.id}`}>
        <div className="w-full h-48 relative">
          <Image
            src={typeof product.image === 'string' ? product.image : product.image!.url!}
            alt={product.name}
            fill
            className="object-cover absolute top-0 left-0 w-full h-full rounded-lg  
             transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="mt-4 flex-grow">
          <h2
            className="text-2xl sm:text-xl md:text-2xl xl:text-3xl 
          leading-none
           tracking-widest font-serif line-clamp-2"
          >
            {product.name}
          </h2>
          {product.amount && <p className="font-light text-sm opacity-70 mt-1">{product.amount}</p>}
          <p className="font-light mt-2">{product.price} руб.</p>
        </div>
      </Link>
      <AddToCartButton className="mt-6 mb-2" product={product} />
    </div>
  )
}

export default ProductCard
