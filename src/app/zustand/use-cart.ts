// import { create } from 'zustand'
// import { Product } from '../(payload)/payload-types'

// export interface CartItem extends Product {
//   quantity: number
// }
// interface CartState {
//   items: CartItem[]
//   addToCart: (product: Product, quantity: number) => void
//   removeFromCart: (productId: string) => void
//   removeOne: (productId: string) => void
//   addOne: (productId: string) => void
// }

// export const useCartStore = create<CartState>((set) => ({
//   items: [],
//   addToCart: (product, quantity) =>
//     set((state) => {
//       const alreadyInCart = state.items.find((item) => item.id === product.id)

//       if (alreadyInCart) {
//         return {
//           items: state.items.map((item) =>
//             item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
//           ),
//         }
//       }

//       return { items: [...state.items, { ...product, quantity }] }
//     }),

//   removeFromCart: (productId) =>
//     set((state) => ({
//       items: state.items.filter((item) => item.id !== productId),
//     })),
//   addOne: (productId) =>
//     set((state) => ({
//       items: state.items.map((item) =>
//         item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
//       ),
//     })),
//   removeOne: (productId) =>
//     set((state) => ({
//       items: state.items.map((item) =>
//         item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
//       ),
//     })),
// }))
