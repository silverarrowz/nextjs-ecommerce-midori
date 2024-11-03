import { ReactNode } from 'react'
import AppSuspense from '../../../lib/AppSuspense'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Поиск | MiDori | Моти ручной работы',
  description: 'MiDori - интернет-магазин моти ручной работы',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return <AppSuspense>{children}</AppSuspense>
}
