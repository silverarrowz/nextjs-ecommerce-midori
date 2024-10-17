'use client'

import { cn } from '@/lib/utils'
import { Product } from '@/app/(payload)/payload-types'
import { useState } from 'react'
import { useCart } from '@/app/context/Cart/CartContext'
// import { useCartStore } from '@/app/zustand/use-cart'

interface AddToCartButtonProps {
  className?: string
  product: Product
  showCounter?: boolean
}

const AddToCartButton = ({ className, product, showCounter = false }: AddToCartButtonProps) => {
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  // const { addToCart } = useCartStore()
  const { addItemToCart } = useCart()

  return (
    <div>
      <input
        className={cn(`border-2 border-button p-2 rounded-3xl`, {
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
          // addToCart(product, quantity)
          addItemToCart({ product, quantity })
          setQuantity(1)
          setIsAdded(true)
          setTimeout(() => {
            setIsAdded(false)
          }, 1500)
        }}
        className={cn(
          `rounded-3xl border border-heading
      bg-button hover:bg-button/70 transition-all duration-300
      hover:shadow-[inset_0_0_4px_2px_rgba(215,89,161,0.36),0_0_6px_2px_rgba(215,89,161,0.36)] w-full self-center
      px-9 xs:px-4 xs:text-sm sm:px-6 lg:px-8 py-2 mb-2 mt-6 tracking-widest`,
          className,
        )}
      >
        {isAdded ? 'Добавлено!' : 'В корзину'}
      </button>
    </div>
  )
}

export default AddToCartButton
