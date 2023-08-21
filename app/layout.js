'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
import TopNav from '@/components/TopNav'
import {Toaster} from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Blog Project',
  description: 'Next JS Blog Project',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Toaster />
          <TopNav />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
