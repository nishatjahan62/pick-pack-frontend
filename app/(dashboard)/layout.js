'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Jodi loading sesh hoy ar user na thake, tobe login-e pathiye dbe
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  // User thaklei kebol dashboard er content dekhabe
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tumi chaile ekhane Sidebar ba Dashboard-specific Header add korte paro */}
      <main className="w-full">
        {children}
      </main>
    </div>
  )
}