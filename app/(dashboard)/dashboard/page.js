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

        const res = await api.get('/admin/stats')     
        
        setData(res.data.data)   
      } catch (err) { 
        console.error("Dashboard fetch error:", err) 
      } finally { 
        setLoading(false) 
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className="flex h-[70vh] justify-center items-center"><Loader size="lg" /></div>

  return (
    <div className="p-6 lg:p-10">
      {data?.stats ? (
        user?.role === 'admin' ? (
          <AdminDashboard 
            stats={data.stats} 
            revenue={data.revenue || []} 
            logs={data.logs || []}       
          />
        ) : (
          <UserDashboard stats={data.stats} user={user} />
        )
      ) : (
        <p className="text-center text-gray-500 py-10">No dashboard data found</p>
      )}
    </div>
  )
}