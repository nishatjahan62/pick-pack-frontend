'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import ProductTable from '@/components/products/ProductTable'
import ProductForm from '@/components/products/ProductForm'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { FiPlus, FiBox } from 'react-icons/fi'

export default function ProductsPage() {
  const { user } = useAuth()
  const [addModal, setAddModal] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const canManage = user && (user.role === 'admin' || user.role === 'manager')

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 md:p-10 min-h-screen bg-gray-50/30"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Centered Header Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.7 }}
            className="p-3 bg-green-50 rounded-2xl mb-4 border border-green-100"
          >
            <FiBox size={28} className="text-green-600" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-black text-green-600 uppercase tracking-wider">
            Inventory Assets
          </h1>
          <p className="text-gray-400 mt-2 max-w-lg text-sm">
            Detailed overview of your stock levels, pricing, and product status in real-time.
          </p>

         
        </div>

        {/* Premium Table Card */}
        <motion.div 
          layout
          className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/40 border border-gray-50 overflow-hidden"
        >
        
          <ProductTable refreshKey={refreshKey} canManage={canManage} />
        </motion.div>

        <div className='flex justify-center items-center'> {canManage && (
            <motion.div 
              className="mt-6"
              whileHover={{ y: -3 }}
            >
              <Button 
                onClick={() => setAddModal(true)} 
                
              >
                <FiPlus size={20} className="mr-2" /> Register Product
              </Button>
            </motion.div>
          )}</div>
      </div>

      <Modal isOpen={addModal} onClose={() => setAddModal(false)} title="Add New Product to Stock" size="lg">
        <ProductForm onSuccess={() => { setAddModal(false); setRefreshKey(prev => prev + 1); }} />
      </Modal>
    </motion.div>
  )
}