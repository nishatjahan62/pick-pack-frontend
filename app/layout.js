import { Poppins, Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../context/AuthContext.js'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'Pick Pack — Inventory System',
  description: 'Smart Inventory & Order Management',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} font-inter`}>
        <AuthProvider>
               <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      borderRadius: '12px',
      fontSize: '14px',
    },
    success: {
      style: {
        border: '1px solid #bbf7d0',
        background: '#f0fdf4',
        color: '#15803d',
      },
      iconTheme: {
        primary: '#22c55e',
        secondary: '#fff',
      },
    },
    error: {
      style: {
        border: '1px solid #fecaca',
        background: '#fef2f2',
        color: '#dc2626',
      },
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fff',
      },
    },
  }}
/>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}