'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import OrderTable from '@/components/orders/OrderTable'
import OrderForm from '@/components/orders/OrderForm'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { FiShoppingCart, FiPlus } from 'react-icons/fi'
import { useAuth } from '@/context/AuthContext'

const filters = ['', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled']
const filterLabels = {
  '': 'All',
  Pending: 'Pending',
  Confirmed: 'Confirmed',
  Shipped: 'Shipped',
  Delivered: 'Delivered',
  Cancelled: 'Cancelled',
}

export default function OrdersPage() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin' || user?.role === 'manager'

  const [addModal, setAddModal] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [statusFilter, setStatusFilter] = useState('')

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 md:p-10 min-h-screen bg-gray-50/30 dark:bg-gray-700 transition-colors"
    >
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="p-3 bg-green-100 dark:bg-green-950/60 rounded-2xl mb-4"
          >
            <FiShoppingCart size={28} className="text-green-600 dark:text-green-400" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-green-600 dark:text-green-400 tracking-tight">
            {isAdmin ? 'Customer Orders' : 'My Orders'}
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-md">
            {isAdmin 
              ? 'Track and manage your sales pipeline and customer order fulfillment effectively.' 
              : 'View your order history and track the status of your current purchases.'}
          </p>
        </div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 flex-wrap mb-6 justify-center"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                statusFilter === f
                  ? 'bg-green-500 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-700 hover:text-green-600 dark:hover:text-green-400'
              }`}
            >
              {filterLabels[f]}
            </button>
          ))}
        </motion.div>

        {/* Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors"
        >
          <OrderTable refreshKey={refreshKey} statusFilter={statusFilter} />
        </motion.div>

        <div className='flex justify-center items-center mt-8'>
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={() => setAddModal(true)} className="rounded-full px-8 shadow-lg shadow-green-100 dark:shadow-none">
              <FiPlus size={18} className="mr-2" /> Place New Order
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Add Modal */}
      <Modal isOpen={addModal} onClose={() => setAddModal(false)} title="Place New Order" size="xl">
        <OrderForm onSuccess={() => { setAddModal(false); setRefreshKey(k => k + 1) }} />
      </Modal>
    </motion.div>
  )
}