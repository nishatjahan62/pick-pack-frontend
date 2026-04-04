'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPackage } from 'react-icons/fi'
import RestockTable from '@/components/restock/RestockTable'

export default function RestockPage() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 md:p-10 min-h-screen bg-gray-50/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section (Synced with Category/Orders) */}
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="p-3 bg-red-100 rounded-2xl mb-4"
          >
            <FiPackage size={28} className="text-red-600" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
            Restock <span className="text-red-600">Queue</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2 max-w-md">
            Manage your inventory levels. Products listed here are below their minimum stock threshold and require immediate attention.
          </p>
        </div>

        {/* Restock Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden"
        >
          <RestockTable 
            refreshKey={refreshKey} 
            onRestockSuccess={() => setRefreshKey(k => k + 1)} 
          />
        </motion.div>
      </div>
    </motion.div>
  )
}