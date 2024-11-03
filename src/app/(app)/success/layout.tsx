import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Благодарим Вас за покупку! | MiDori | Моти ручной работы',
  description: 'MiDori - интернет-магазин моти ручной работы',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}
export default function Layout({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}
