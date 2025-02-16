import type { CartItems, Product, User } from '../../(payload)/payload-types'

export type CartItem = {
  product?: number | Product | null | undefined
  quantity?: number | null | undefined
  id?: string | null | undefined
}

type CartType = User['cart']

type CartAction =
  | {
      type: 'SET_CART'
      payload: CartType
    }
  | {
      type: 'MERGE_CART'
      payload: CartType
    }
  | {
      type: 'ADD_ITEM'
      payload: CartItem
    }
  | {
      type: 'ADD_ONE'
      payload: Product
    }
  | {
      type: 'DELETE_ONE'
      payload: Product
    }
  | {
      type: 'DELETE_ITEM'
      payload: Product
    }
  | {
      type: 'CLEAR_CART'
    }

export const cartReducer = (cart: CartType, action: CartAction): CartType => {
  switch (action.type) {
    case 'SET_CART': {
      return action.payload
    }

    case 'MERGE_CART': {
      const { payload: incomingCart } = action

      const syncedItems: CartItem[] = [
        ...(cart?.items || []),
        ...(incomingCart?.items || []),
      ].reduce((acc: CartItem[], item) => {
        // remove duplicates
        const productId = typeof item.product === 'number' ? item.product : item?.product?.id

        const indexInAcc = acc.findIndex(({ product }) =>
          typeof product === 'number' ? product === productId : product?.id === productId,
        )

        if (indexInAcc > -1) {
          acc[indexInAcc] = {
            ...acc[indexInAcc],
            // quantity: acc[indexInAcc].quantity + item.quantity,
          }
        } else {
          acc.push(item)
        }
        return acc
      }, [])

      return {
        ...cart,
        items: syncedItems,
      }
    }

    case 'ADD_ITEM': {
      // if the item is already in the cart, increase the quantity
      const { payload: incomingItem } = action
      const productId =
        typeof incomingItem.product === 'number' ? incomingItem.product : incomingItem?.product?.id

      const indexInCart = cart?.items?.findIndex(({ product }) =>
        typeof product === 'number' ? product === productId : product?.id === productId,
      ) // eslint-disable-line function-paren-newline

      let withAddedItem = [...(cart?.items || [])]

      if (indexInCart === -1) {
        withAddedItem.push(incomingItem)
      }

      if (typeof indexInCart === 'number' && indexInCart > -1) {
        withAddedItem[indexInCart] = {
          ...withAddedItem[indexInCart],
          quantity: incomingItem.quantity! + withAddedItem[indexInCart].quantity!,
        }
      }

      return {
        ...cart,
        items: withAddedItem,
      }
    }

    case 'ADD_ONE': {
      const { payload: incomingProduct } = action
      let withAddedItem = [...(cart?.items || [])]

      const indexInCart = cart?.items?.findIndex(({ product }) =>
        typeof product === 'number'
          ? product === incomingProduct.id
          : product?.id === incomingProduct.id,
      )

      if (typeof indexInCart === 'number' && indexInCart > -1) {
        withAddedItem[indexInCart] = {
          ...withAddedItem[indexInCart],
          quantity: (withAddedItem[indexInCart].quantity || 0) + 1,
        }
      }

      return {
        ...cart,
        items: withAddedItem,
      }
    }

    case 'DELETE_ONE': {
      const { payload: incomingProduct } = action
      const withDeletedItem = [...(cart?.items || [])]

      const indexInCart = cart?.items?.findIndex(({ product }) =>
        typeof product === 'number'
          ? product === incomingProduct.id
          : product?.id === incomingProduct.id,
      )

      if (typeof indexInCart === 'number' && indexInCart > -1) {
        withDeletedItem[indexInCart] = {
          ...withDeletedItem[indexInCart],
          quantity: (withDeletedItem[indexInCart].quantity || 0) - 1,
        }
      }

      return {
        ...cart,
        items: withDeletedItem,
      }
    }

    case 'DELETE_ITEM': {
      const { payload: incomingProduct } = action
      const withDeletedItem = { ...cart }

      const indexInCart = cart?.items?.findIndex(({ product }) =>
        typeof product === 'number'
          ? product === incomingProduct.id
          : product?.id === incomingProduct.id,
      )

      if (typeof indexInCart === 'number' && withDeletedItem.items && indexInCart > -1)
        withDeletedItem.items.splice(indexInCart, 1)

      return withDeletedItem
    }

    case 'CLEAR_CART': {
      return {
        ...cart,
        items: [],
      }
    }

    default: {
      return cart
    }
  }
}
