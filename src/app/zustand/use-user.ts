// import { create } from 'zustand'
// import { User } from '../(payload)/payload-types'

// interface UserState {
//   user: User | null
//   setUser: (user: User | null) => void
//   token: string | null
//   isLoggedIn: boolean
//   setIsLoggedIn: (isLoggedIn: boolean) => void
//   login: (user: User, token: string) => void
//   logout: () => void
//   loadUserFromStorage: () => void
// }

// export const useUserStore = create<UserState>((set) => ({
//   user: null,
//   token: null,
//   isLoggedIn: false,
//   login: (user, token) => {
//     localStorage.setItem('token', token),
//       localStorage.setItem('user', JSON.stringify(user)),
//       set({
//         user,
//         token,
//         isLoggedIn: true,
//       })
//   },
//   logout: () => {
//     localStorage.removeItem('token'),
//       localStorage.removeItem('user'),
//       set({
//         user: null,
//         token: null,
//         isLoggedIn: false,
//       })
//   },
//   loadUserFromStorage: () => {
//     const token = localStorage.getItem('token')
//     const user = localStorage.getItem('user')

//     if (token && user) {
//       set({
//         token,
//         user: JSON.parse(user),
//         isLoggedIn: true,
//       })
//     }
//   },
//   setUser: (user) => set({ user }),
//   setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
// }))
