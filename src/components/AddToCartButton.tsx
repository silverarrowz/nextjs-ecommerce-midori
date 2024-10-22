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
        className={cn(`border border-heading-dark p-2 mb-6 rounded-lg  focus:outline-none`, {
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
          `rounded-lg border border-heading
      bg-button transition-all duration-300 
      hover:bg-button-hover
      hover:shadow-[inset_0_0_4px_2px_rgba(215,89,161,0.36),0_0_6px_2px_rgba(215,89,161,0.36)] w-full self-center
      px-9 xs:px-4 xs:text-sm sm:px-6 lg:px-8 py-2 tracking-widest`,
          className,
        )}
      >
        {isAdded ? 'Добавлено!' : 'В корзину'}
      </button>
    </div>
  )
}

export default AddToCartButton
