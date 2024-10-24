'use client'

import { cn } from '@/lib/utils'
import { Product } from '@/app/(payload)/payload-types'
import { useState } from 'react'
import { useCart } from '@/app/context/Cart/CartContext'

interface AddToCartButtonProps {
  className?: string
  product: Product
  showCounter?: boolean
}

const AddToCartButton = ({ className, product, showCounter = false }: AddToCartButtonProps) => {
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const { addItemToCart } = useCart()

  return (
    <div className="w-full justify-self-end">
      <input
        className={cn(`border-2 border-heading-dark p-2 mb-6 rounded-full  focus:outline-none`, {
          hidden: !showCounter,
        })}
        type="number"
        min={1}
        max={20}
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      <button
        onClick={() => {
          addItemToCart({ product, quantity })
          setQuantity(1)
          setIsAdded(true)
          setTimeout(() => {
            setIsAdded(false)
          }, 1500)
        }}
        className={cn(
          `rounded-full shadow-md
      bg-button transition-all duration-200 
      border-2 border-heading
      hover:bg-heading hover:text-white  
      hover:shadow-sm w-full self-center
      px-9 xs:px-4 xs:text-sm sm:text-base sm:px-6 lg:px-8 py-2 tracking-widest font-bold text-heading`,
          className,
        )}
      >
        {isAdded ? 'Добавлено!' : 'В корзину'}
      </button>
    </div>
  )
}

export default AddToCartButton
