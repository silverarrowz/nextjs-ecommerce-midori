import { Product } from '@/payload-types'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <>
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <div className="w-28 h-28 relative">
        <Image
          src={typeof product.image === 'string' ? product.image : product.image!.url!}
          alt={product.name}
          fill
          className="object-cover absolute top-0 left-0 w-full h-full"
        />
      </div>
    </>
  )
}

export default ProductCard
