'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiSave, FiPackage, FiDollarSign, FiHash, FiLayers, FiAlertTriangle } from 'react-icons/fi'

export default function ProductForm({ onSuccess }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    minStockThreshold: 5
  })

  // Dropdown er jonno categories fetch kora
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
        setCategories(res.data.data)
      } catch (err) {
        console.error("Categories fetch failed", err)
      }
    }
    fetchCategories()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // API call to create product
      // Note: Config e headers thaka dorkar Auth token er jonno
      const token = localStorage.getItem('token') 
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`, 
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      // Success hole form reset kora ebong parent ke janano
      setFormData({ name: '', category: '', price: '', stock: '', minStockThreshold: 5 })
      if (onSuccess) onSuccess()
      alert('Product Added Successfully!')
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Product Name */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <FiPackage className="text-green-600" /> Product Name
        </label>
        <input
          required
          type="text"
          placeholder="e.g. iPhone 15 Pro"
          className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>

      {/* Category Select */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <FiLayers className="text-green-600" /> Category
        </label>
        <select
          required
          className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition bg-white"
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <FiDollarSign className="text-green-600" /> Price ($)
        </label>
        <input
          required
          type="number"
          placeholder="0.00"
          className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})}
        />
      </div>

      {/* Stock Quantity */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <FiHash className="text-green-600" /> Stock Quantity
        </label>
        <input
          required
          type="number"
          placeholder="e.g. 50"
          className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition"
          value={formData.stock}
          onChange={(e) => setFormData({...formData, stock: e.target.value})}
        />
      </div>

      {/* Minimum Threshold */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <FiAlertTriangle className="text-yellow-500" /> Low Stock Threshold
        </label>
        <input
          type="number"
          className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition"
          value={formData.minStockThreshold}
          onChange={(e) => setFormData({...formData, minStockThreshold: e.target.value})}
        />
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2 pt-4">
        <button
          disabled={loading}
          type="submit"
          className={`w-full md:w-max px-8 py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <FiSave /> {loading ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </form>
  )
}