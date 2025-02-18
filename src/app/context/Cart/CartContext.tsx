'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'

import { Product, User } from '../../(payload)/payload-types'
import { useUser } from '../UserContext'
import { CartItem, cartReducer } from './reducer'

export type CartContextType = {
  cart: User['cart']
  addItemToCart: (item: CartItem) => void
  addOneItem: (product: Product) => void
  deleteOneItem: (product: Product) => void
  deleteItemFromCart: (product: Product) => void
  cartIsEmpty: boolean | undefined
  clearCart: () => void
  hasInitializedCart: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

const arrayHasItems = (array: any[]) => Array.isArray(array) && array.length > 0

/**
 * ensure that cart items are fully populated, filter out any items that are not
 * this will prevent discontinued products from appearing in the cart
 */
const flattenCart = (cart: User['cart']): User['cart'] => ({
  ...cart,
  items: cart!
    .items!.map((item) => {
      if (!item?.product || typeof item?.product !== 'object') {
        return null
      }

      return {
        ...item,
        // flatten relationship to product
        product: item?.product?.id,
        quantity: typeof item?.quantity === 'number' ? item?.quantity : 0,
      }
    })
    .filter(Boolean) as CartItem[],
})

// Step 1: Check local storage for a cart
// Step 2: If there is a cart, fetch the products and hydrate the cart
// Step 3: Authenticate the user
// Step 4: If the user is authenticated, merge the user's cart with the local cart
// Step 4B: Sync the cart to Payload and clear local storage
// Step 5: If the user is logged out, sync the cart to local storage only

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, status: authStatus } = useUser()

  const [cart, dispatchCart] = useReducer(cartReducer, {})

  const hasInitialized = useRef(false)
  const [hasInitializedCart, setHasInitialized] = useState(false)

  // Check local storage for a cart
  // If there is a cart, fetch the products and hydrate the cart
  useEffect(() => {
    // wait for the user to be defined before initializing the cart
    if (user === undefined) return
    if (!hasInitialized.current) {
      hasInitialized.current = true

      const syncCartFromLocalStorage = async () => {
        const localCart = localStorage.getItem('cart')

        const parsedCart = JSON.parse(localCart || '{}')

        if (parsedCart?.items && parsedCart?.items?.length > 0) {
          const initialCart = await Promise.all(
            parsedCart.items.map(
              async ({ product, quantity }: { product: Product; quantity: number }) => {
                const res = await fetch(
                  `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${product}`,
                )
                const data = await res.json()
                return {
                  product: data,
                  quantity,
                }
              },
            ),
          )

          dispatchCart({
            type: 'SET_CART',
            payload: {
              items: initialCart,
            },
          })
        } else {
          dispatchCart({
            type: 'SET_CART',
            payload: {
              items: [],
            },
          })
        }
      }

      syncCartFromLocalStorage()
    }
  }, [user])

  // authenticate the user and if logged in, merge the user's cart with local state
  // only do this after we have initialized the cart to ensure we don't lose any items
  useEffect(() => {
    if (!hasInitialized.current) return

    if (authStatus === 'loggedIn') {
      console.log('Logged in, merging the cart...')
      // merge the user's cart with the local state upon logging in
      dispatchCart({
        type: 'MERGE_CART',
        payload: user?.cart,
      })
    }

    if (authStatus === 'loggedOut') {
      console.log('Logged out, clearing the cart...')
      // clear the cart from local state after logging out
      dispatchCart({
        type: 'CLEAR_CART',
      })
    }
  }, [user, authStatus])

  // every time the cart changes, determine whether to save to local storage or Payload based on authentication status
  // upon logging in, merge and sync the existing local cart to Payload
  useEffect(() => {
    // wait until we have attempted authentication (the user is either an object or `null`)
    if (!hasInitialized.current || user === undefined || !cart?.items) return

    const flattenedCart = flattenCart(cart)

    if (user) {
      // prevent updating the cart when the cart hasn't changed
      if (JSON.stringify(flattenCart(user.cart)) === JSON.stringify(flattenedCart)) {
        setHasInitialized(true)
        return
      }

      try {
        const syncCartToPayload = async () => {
          const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
            // Make sure to include cookies with fetch
            credentials: 'include',
            method: 'PATCH',
            body: JSON.stringify({
              cart: flattenedCart,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (req.ok) {
            localStorage.setItem('cart', '[]')
          }
        }

        syncCartToPayload()
      } catch (e) {
        console.error('Error while syncing cart to Payload.') // eslint-disable-line no-console
      }
    } else {
      localStorage.setItem('cart', JSON.stringify(flattenedCart))
    }

    setHasInitialized(true)
  }, [cart])

  const addItemToCart = useCallback((incomingItem: CartItem) => {
    dispatchCart({
      type: 'ADD_ITEM',
      payload: incomingItem,
    })
  }, [])

  const addOneItem = useCallback((incomingProduct: Product) => {
    dispatchCart({
      type: 'ADD_ONE',
      payload: incomingProduct,
    })
  }, [])

  const deleteOneItem = useCallback((incomingProduct: Product) => {
    dispatchCart({
      type: 'DELETE_ONE',
      payload: incomingProduct,
    })
  }, [])

  const deleteItemFromCart = useCallback((incomingProduct: Product) => {
    dispatchCart({
      type: 'DELETE_ITEM',
      payload: incomingProduct,
    })
  }, [])

  const clearCart = useCallback(() => {
    dispatchCart({
      type: 'CLEAR_CART',
    })
  }, [])

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        addOneItem,
        deleteOneItem,
        deleteItemFromCart,
        cartIsEmpty: hasInitializedCart && !arrayHasItems(cart?.items!),
        clearCart,
        hasInitializedCart,
      }}
    >
      {children && children}
    </CartContext.Provider>
  )
}
