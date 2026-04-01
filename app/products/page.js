'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import ProductTable from '@/components/products/ProductTable'
import ProductForm from '@/components/products/ProductForm'
import { FiPlus, FiBox } from 'react-icons/fi'

export default function ProductsPage() {
  const { user } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  // Role check: admin ba manager kina
  const canManage = user && (user.role === 'admin' || user.role === 'manager')

  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <FiBox className="text-green-600" /> Our Products
            </h1>
            <p className="text-gray-500 mt-1">Browse and manage your smart inventory.</p>
          </div>

          {/* Shudhu Admin/Manager hole Add Button dekhabe */}
          {canManage && (
            <button 
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl transition shadow-sm font-medium"
            >
              {showForm ? 'Close Form' : <><FiPlus /> Add Product</>}
            </button>
          )}
        </div>

        {showForm && canManage && (
          <div className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <ProductForm onSuccess={() => {
              setShowForm(false)
              setRefreshKey(prev => prev + 1)
            }} />
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* RefreshKey use kora hoyeche jate product add korle table update hoy */}
          <ProductTable key={refreshKey} canManage={canManage} />
        </div>
      </div>
    </div>
  )
}