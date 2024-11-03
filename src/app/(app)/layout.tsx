import type { Metadata } from 'next'
import { Mulish, Cormorant_Garamond, Playfair_Display, Bona_Nova } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { UserProvider } from '../context/UserContext'
import { CartProvider } from '../context/Cart/CartContext'
import ScrollButton from '@/components/ScrollButton'

const sans = Mulish({
  weight: ['300', '400', '700'],
  subsets: ['cyrillic', 'latin'],
  variable: '--font-mulish',
})

const serif = Bona_Nova({
  weight: ['400', '700'],
  variable: '--font-cormorant-garamond',
  style: ['italic', 'normal'],
  subsets: ['cyrillic', 'latin'],
})

export const metadata: Metadata = {
  title: 'MiDori | Моти ручной работы',
  description: 'MiDori - интернет-магазин моти ручной работы',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} font-sans antialiased`}>
        <UserProvider>
          <CartProvider>
            <Header />
            {children}
            <ScrollButton />
            <Footer />
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  )
}
