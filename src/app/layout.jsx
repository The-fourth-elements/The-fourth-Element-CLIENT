
import Navbar from '@/components/navbar/Navbar'

import { Inter } from 'next/font/google'
import './global.scss';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The fourth elements',
  description: 'The fourth element is a mental training course'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header><Navbar /></header>
        {children}</body>
    </html>
  )
}
