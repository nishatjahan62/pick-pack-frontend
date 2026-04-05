'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiClock, FiActivity, FiArrowLeft, FiDatabase, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import api from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import Loader from '@/components/ui/Loader'

export default function ActivityLogPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7 // প্রতি পেজে ৭টি ডাটা

  const isAdmin = user?.role === 'admin' || user?.role === 'manager'

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get('/dashboard')
        setLogs(res.data.data.logs || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    if (user) fetchLogs()
  }, [user])

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentLogs = logs.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(logs.length / itemsPerPage)

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  if (loading) return <div className="flex justify-center items-center h-screen"><Loader /></div>

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-green-600 mb-6 transition text-sm font-semibold">
          <FiArrowLeft /> BACK TO DASHBOARD
        </button>

        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              <FiActivity className="text-green-500" />
              {isAdmin ? 'System Logs' : 'My Activity'}
            </h1>
            <p className="text-gray-500 font-medium">Tracking system-wide actions and updates</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Page State</p>
            <p className="text-sm font-bold text-green-600">{currentPage} of {totalPages || 1}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Timestamp</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Event Action</th>
                  {isAdmin && <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Performed By</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence mode='wait'>
                  {currentLogs.map((log, idx) => (
                    <motion.tr 
                      key={log._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2, delay: idx * 0.03 }}
                      className="hover:bg-green-50/30 transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-gray-400 group-hover:text-green-600 transition">
                          <FiClock size={14} />
                          <span className="text-xs font-bold tabular-nums">
                            {format(new Date(log.createdAt), 'hh:mm a')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition">
                          {log.action}
                        </p>
                      </td>
                      {isAdmin && (
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                              {log.performedBy?.name?.charAt(0)}
                            </div>
                            <span className="text-xs font-bold text-gray-600">{log.performedBy?.name || 'System'}</span>
                          </div>
                        </td>
                      )}
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs font-bold text-gray-400">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, logs.length)} of {logs.length} logs
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border transition ${currentPage === 1 ? 'text-gray-300 border-gray-100 cursor-not-allowed' : 'text-gray-600 border-gray-200 hover:border-green-500 hover:text-green-500'}`}
              >
                <FiChevronLeft size={18} />
              </button>
              
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition ${currentPage === i + 1 ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'text-gray-400 hover:bg-gray-100'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg border transition ${currentPage === totalPages ? 'text-gray-300 border-gray-100 cursor-not-allowed' : 'text-gray-600 border-gray-200 hover:border-green-500 hover:text-green-600'}`}
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>
          
          {logs.length === 0 && (
            <div className="py-20 text-center">
              <FiDatabase size={40} className="mx-auto text-gray-200 mb-4" />
              <p className="text-gray-400 font-medium">No system logs found for this period.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}