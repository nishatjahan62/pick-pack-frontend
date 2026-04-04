'use client'

import { useState, useEffect } from 'react'
import { FiSave, FiTag, FiFileText } from 'react-icons/fi'
import toast from 'react-hot-toast'
import api from '@/lib/api'
import Button from '@/components/ui/Button'

export default function CategoryForm({ onSuccess, editData = null }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })

  // Edit mode ডাটা লোড
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        description: editData.description || '',
      })
    }
  }, [editData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editData) {
        await api.put(`/categories/${editData._id}`, formData)
        toast.success('Category updated!')
      } else {
        await api.post('/categories', formData)
        toast.success('Category created!')
      }
      if (onSuccess) onSuccess()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition text-sm"

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Category Name */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <FiTag className="text-green-600" size={14} /> Category Name
        </label>
        <input
          required
          type="text"
          placeholder="e.g. Electronics"
          className={inputClass}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <FiFileText className="text-green-600" size={14} /> Description (Optional)
        </label>
        <textarea
          rows="3"
          placeholder="Enter a brief description..."
          className={inputClass}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button type="submit" loading={loading} fullWidth>
          <FiSave size={16} className="mr-2" />
          {editData ? 'Update Category' : 'Save Category'}
        </Button>
      </div>
    </form>
  )
}