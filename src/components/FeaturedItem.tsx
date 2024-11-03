import { Product } from '@/app/(payload)/payload-types'
import AddToCartButton from './AddToCartButton'
import Link from 'next/link'
import Image from 'next/image'

interface FeaturedItemProps {
  product: Product
}

const FeaturedItem = ({ product }: FeaturedItemProps) => {
  const { name, price, image, description, amount } = product
  return (
    <div
      className="flex flex-col justify-between
      bg-white shadow-md rounded-lg
        mx-2 xs:mx-4 
        px-2 py-4 xs:p-4 
        my-4
        text-heading-dark  
        items-center z-10
        h-[20rem] xs:h-[22rem] lg:h-[24rem] 
        transition-transform duration-300 hover:scale-105"
    >
      <Link href={`/product/${product.id}`} className="flex flex-col items-center">
        <div
          className="w-44 xs:w-52 sm:w-36 h-32 xs:h-36 relative
          overflow-hidden"
        >
          <Image
            fill
            src={typeof image === 'string' ? image : image!.url!}
            alt={name}
            className="object-contain max-h-full w-full
            "
          />
        </div>

        <div className="flex-grow">
          <h3
            className="text-xl md:text-2xl xl:text-3xl 
          leading-none 
           tracking-widest font-serif line-clamp-2 sm:mt-4 lg:mt-0"
          >
            {name}
          </h3>
          {amount && <p className="font-light mt-2 text-sm opacity-70">{amount}</p>}
          <p className="font-light text-sm my-4">{price} руб.</p>
        </div>
      </Link>
      <AddToCartButton
        className="justify-self-end p-1 md:p-2 text-sm sm:text-xs md:text-sm"
        product={product}
      />
    </div>
  )
}

export default FeaturedItem
