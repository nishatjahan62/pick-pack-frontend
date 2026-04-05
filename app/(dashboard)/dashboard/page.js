'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import api from '@/lib/api'
import Loader from '@/components/ui/Loader'
import AdminDashboard from '@/components/dashboard/AdminDashboard'
import UserDashboard from '@/components/dashboard/UserDashboard'

export default function DashboardPage() {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/dashboard')
        setData(res.data.data)
      } catch (err) {
        console.error('Dashboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return (
    <div className="flex h-[70vh] justify-center items-center">
      <Loader size="lg" />
    </div>
  )

  return (
    <div className="p-2 lg:p-4">
      {data?.stats ? (
        data.type === 'admin' ? (
          <AdminDashboard
            stats={data.stats}
            recentProducts={data.recentProducts || []}
            recentActivity={data.recentActivity || []}
            revenue={data.revenue} // এটা নিশ্চিত করুন
          logs={data.logs}       // এটা নিশ্চিত করুন
          />
        ) : (
          <UserDashboard stats={data.stats} 
  user={user} 
  logs={data.logs} 
  chartData={data.chartData} />
        )
      ) : (
        <p className="text-center text-gray-500 py-10">No dashboard data found</p>
      )}
    </div>
  )
}