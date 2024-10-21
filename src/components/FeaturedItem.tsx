import { Product } from '@/app/(payload)/payload-types'
import AddToCartButton from './AddToCartButton'
import Link from 'next/link'

interface FeaturedItemProps {
  product: Product
}

const FeaturedItem = ({ product }: FeaturedItemProps) => {
  const { name, price, image, description, amount } = product
  return (
    <div
      className="flex flex-col justify-between
      bg-white shadow-md rounded-3xl
        mx-10 xs:mx-16 sm:mx-2 md:mx-4 lg:mx-2
        p-4 
        lg:py-8
        my-4
        text-heading-dark gap-6 
        items-center z-10
        h-[22rem] xs:h-[24rem] lg:h-[30rem]"
    >
      <Link href={`/product/${product.id}`}>
        <div
          className="max-w-[14rem] h-32 xs:h-40 sm:max-w-none
         sm:h-32 lg:h-48
         transition-transform duration-300 hover:scale-105"
        >
          <img
            src={image.url}
            alt={name}
            className="object-cover max-h-full w-full
              transition-transform duration-300 
              hover:scale-105 cursor-pointer"
          />
        </div>

        <div className="mt-6 flex-grow">
          <h3
            className="text-2xl sm:text-xl md:text-2xl xl:text-3xl 
          leading-none
           tracking-widest font-serif line-clamp-2"
          >
            {name}
          </h3>
          {amount && <p className="font-light text-sm opacity-70">{amount}</p>}
          <p className="font-light mt-6">{price} руб.</p>
        </div>
      </Link>
      <AddToCartButton className="justify-self-end" product={product} />
    </div>
  )
}

export default FeaturedItem
