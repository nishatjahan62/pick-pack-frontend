'use client'

import { useState, useEffect } from 'react'
import { FiSave, FiPackage, FiDollarSign, FiHash, FiLayers, FiAlertTriangle } from 'react-icons/fi'
import toast from 'react-hot-toast'
import api from '@/lib/api'
import Button from '@/components/ui/Button'

export default function ProductForm({ onSuccess, editData = null }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    minStockThreshold: 5,
  })

  // edit mode hole data prefill
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        category: editData.category?._id || editData.category,
        price: editData.price,
        stock: editData.stock,
        minStockThreshold: editData.minStockThreshold,
      })
    }
  }, [editData])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories')
        setCategories(res.data.data)
      } catch {
        toast.error('Failed to load categories')
      }
    }
    fetchCategories()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editData) {
        await api.patch(`/products/${editData._id}`, formData)
        toast.success('Product updated successfully!')
      } else {
        await api.post('/products', formData)
        toast.success('Product added successfully!')
      }
      setFormData({ name: '', category: '', price: '', stock: '', minStockThreshold: 5 })
      if (onSuccess) onSuccess()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition text-sm"

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

      {/* Product Name */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <FiPackage className="text-green-600" size={14} /> Product Name
        </label>
        <input
          required
          type="text"
          placeholder="e.g. iPhone 15 Pro"
          className={inputClass}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <FiLayers className="text-green-600" size={14} /> Category
        </label>
        <select
          required
          className={`${inputClass} bg-white`}
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <FiDollarSign className="text-green-600" size={14} /> Price
        </label>
        <input
          required
          type="number"
          placeholder="0.00"
          className={inputClass}
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
      </div>

      {/* Stock */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <FiHash className="text-green-600" size={14} /> Stock Quantity
        </label>
        <input
          required
          type="number"
          placeholder="e.g. 50"
          className={inputClass}
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
        />
      </div>

      {/* Min Threshold */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <FiAlertTriangle className="text-yellow-500" size={14} /> Low Stock Threshold
        </label>
        <input
          type="number"
          className={inputClass}
          value={formData.minStockThreshold}
          onChange={(e) => setFormData({ ...formData, minStockThreshold: e.target.value })}
        />
      </div>

      {/* Submit */}
      <div className="md:col-span-2 pt-2">
        <Button type="submit" loading={loading}>
          <FiSave size={14} />
          {editData ? 'Update Product' : 'Save Product'}
        </Button>
      </div>

    </form>
  )
}