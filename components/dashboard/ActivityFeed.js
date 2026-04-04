'use client'
import { FiActivity, FiUser, FiPackage, FiSettings } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'

export default function ActivityFeed({ logs }) {
  const getLogIcon = (action) => {
    if (action.includes('role') || action.includes('User')) return <FiUser className="text-blue-500" />
    if (action.includes('Order')) return <FiPackage className="text-green-500" />
    return <FiSettings className="text-purple-500" />
  }

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-50 h-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
          <div className="w-1.5 h-6 bg-yellow-400 rounded-full"></div>
          Recent Logs
        </h2>
        <FiActivity className="text-gray-300" />
      </div>

      <div className="space-y-4">
        {logs && logs.length > 0 ? logs.map((log, index) => (
          <motion.div 
            key={log._id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4 items-center p-3 rounded-2xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-100"
          >
            <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-white transition-all">
              {getLogIcon(log.action)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-700 leading-tight truncate">{log.action}</p>
              <p className="text-[10px] text-gray-400 font-black uppercase mt-1">
                By {log.performedBy?.name || 'System'} • {formatDistanceToNow(new Date(log.createdAt))} ago
              </p>
            </div>
          </motion.div>
        )) : (
          <p className="text-center text-gray-400 py-10 font-bold italic">No logs found</p>
        )}
      </div>
    </div>
  )
}