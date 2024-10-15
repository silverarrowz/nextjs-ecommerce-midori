import type { Metadata } from 'next'
import { Mulish, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const sans = Mulish({
  weight: ['300', '400', '700'],
  subsets: ['cyrillic', 'latin'],
  variable: '--font-mulish',
})

const serif = Cormorant_Garamond({
  weight: ['300', '400', '700'],
  variable: '--font-cormorant-garamond',
  style: ['italic', 'normal'],
  subsets: ['cyrillic', 'latin'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} font-sans antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
