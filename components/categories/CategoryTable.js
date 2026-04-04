'use client'

import { useEffect, useState } from 'react'
import { FiEdit2, FiTrash2, FiAlertCircle, FiLayers } from 'react-icons/fi'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import api from '@/lib/api'
import Modal from '@/components/ui/Modal'
import CategoryForm from './CategoryForm'
import Loader from '@/components/ui/Loader'

export default function CategoryTable({ canManage, refreshKey }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [editCategory, setEditCategory] = useState(null)
  const [editModal, setEditModal] = useState(false)

  const fetchCategories = async () => {
    setLoading(true)
    try {
      const res = await api.get('/categories')
      setCategories(res.data.data)
    } catch {
      toast.error('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [refreshKey])

  const handleDelete = async (category) => {
    const result = await Swal.fire({
      title: 'Delete Category?',
      text: `"${category.name}" and its associations will be affected.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'Cancel',
      borderRadius: '16px',
    })

    if (result.isConfirmed) {
      try {
        await api.delete(`/categories/${category._id}`)
        toast.success(`"${category.name}" deleted!`)
        fetchCategories()
      } catch (err) {
        toast.error(err.response?.data?.message || 'Delete failed')
      }
    }
  }

  const handleEditSuccess = () => {
    setEditModal(false)
    setEditCategory(null)
    fetchCategories()
    toast.success('Category updated!')
  }

  if (loading) return (
    <div className="flex items-center justify-center p-16">
      <Loader size="md" />
    </div>
  )

  if (categories.length === 0) return (
    <div className="flex flex-col items-center justify-center p-16 text-gray-400">
      <FiAlertCircle size={40} className="mb-3" />
      <p className="text-sm">No categories found. Start by adding one!</p>
    </div>
  )

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Category Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Created At</th>
              {canManage && (
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {categories.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50/60 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                      <FiLayers size={14} />
                    </div>
                    <span className="font-medium text-gray-800 text-sm">{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {item.description || '---'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                {canManage && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => { setEditCategory(item); setEditModal(true) }}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                      >
                        <FiEdit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={editModal}
        onClose={() => { setEditModal(false); setEditCategory(null) }}
        title="Edit Category"
        size="md"
      >
        <CategoryForm
          editData={editCategory}
          onSuccess={handleEditSuccess}
        />
      </Modal>
    </>
  )
}