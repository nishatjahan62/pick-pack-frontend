'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import CategoryTable from '@/components/categories/CategoryTable'
import CategoryForm from '@/components/categories/CategoryForm'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { FiPlus, FiLayers } from 'react-icons/fi'

export default function CategoriesPage() {
  const { user } = useAuth()
  const [addModal, setAddModal] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const canManage = user && (user.role === 'admin' || user.role === 'manager')

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 md:p-10 min-h-screen bg-gray-50/30 dark:bg-gray-700 transition-colors"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Centered Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="p-3 bg-green-100 dark:bg-green-950/65 rounded-2xl mb-4"
          >
            <FiLayers size={28} className="text-green-600 dark:text-green-400" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-600 dark:text-green-400 tracking-tight">
            Product Categories
          </h1>
          <p className="text-gray-500 dark:text-gray-300 text-sm mt-2 max-w-md">
            Organize and manage your inventory structure effectively from one central hub.
          </p>
        </div>

        {/* Enhanced Table Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors"
        >
          <CategoryTable refreshKey={refreshKey} canManage={canManage} />
        </motion.div>

        <div className="flex justify-center items-center">
          {canManage && (
            <motion.div 
              className="mt-6"
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button onClick={() => setAddModal(true)} className="rounded-full px-8 shadow-lg shadow-green-100 dark:shadow-none">
                <FiPlus size={18} className="mr-2" /> Add New Category
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      <Modal isOpen={addModal} onClose={() => setAddModal(false)} title="Create New Category">
        <CategoryForm onSuccess={() => { setAddModal(false); setRefreshKey(k => k + 1); }} />
      </Modal>
    </motion.div>
  )
}