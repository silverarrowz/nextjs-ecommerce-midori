'use client'

import { cn } from '@/lib/utils'
import { Product } from '@/app/(payload)/payload-types'
import { useState } from 'react'
import { useCart } from '@/app/context/Cart/CartContext'
import { FaMinus, FaPlus } from 'react-icons/fa'

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
      <div
        className={cn(`mb-6 flex items-center gap-2`, {
          hidden: !showCounter,
        })}
      >
        <button
          onClick={() => {
            setQuantity(quantity - 1)
          }}
          disabled={quantity === 1}
          className="text-3xl  leading-3 bg-background-light rounded-full p-2 disabled:bg-slate-200 disabled:text-slate-400"
        >
          <FaMinus size={12} />
        </button>
        <input
          className={cn(`border-2 border-heading-dark p-2 rounded-full  focus:outline-none`)}
          type="number"
          min={1}
          max={20}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <button
          onClick={() => {
            setQuantity(quantity + 1)
          }}
          className="text-3xl leading-3 bg-background-light p-2 rounded-full"
        >
          <FaPlus size={12} />
        </button>
      </div>

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
      hover:bg-background-light 
       hover:shadow-[inset_0_0_3px_3px_rgba(215,89,161,0.36),0_0_7px_4px_rgba(215,89,161,0.36)] 
      w-full self-center
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
