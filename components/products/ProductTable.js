'use client'

import { useEffect, useState } from 'react'
import { FiEdit2, FiTrash2, FiAlertCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import api from '@/lib/api'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import ProductForm from './ProductForm'
import Loader from '@/components/ui/Loader'

const defaultImage = "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=200&auto=format&fit=crop"

export default function ProductTable({ canManage, refreshKey }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editProduct, setEditProduct] = useState(null)
  const [editModal, setEditModal] = useState(false)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await api.get('/products')
      setProducts(res.data.data)
    } catch {
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [refreshKey])

  const handleDelete = async (product) => {
    const result = await Swal.fire({
      title: 'Delete Product?',
      text: `"${product.name}" will be permanently deleted.`,
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
        await api.delete(`/products/${product._id}`)
        toast.success(`"${product.name}" deleted!`)
        fetchProducts()
      } catch (err) {
        toast.error(err.response?.data?.message || 'Delete failed')
      }
    }
  }

  const handleEditSuccess = () => {
    setEditModal(false)
    setEditProduct(null)
    fetchProducts()
    toast.success('Product updated!')
  }

  if (loading) return (
    <div className="flex items-center justify-center p-16">
      <Loader size="md" />
    </div>
  )

  if (products.length === 0) return (
    <div className="flex flex-col items-center justify-center p-16 text-gray-400">
      <FiAlertCircle size={40} className="mb-3" />
      <p className="text-sm">No products found. Add your first product!</p>
    </div>
  )

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Product</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Price</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Stock</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              {canManage && (
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50/60 transition">

                {/* Product */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image || defaultImage}
                      alt={item.name}
                      className="w-10 h-10 rounded-xl object-cover bg-gray-100"
                    />
                    <span className="font-medium text-gray-800 text-sm">{item.name}</span>
                  </div>
                </td>

                {/* Category */}
                <td className="px-4 py-3 text-sm text-gray-500">
                  {item.category?.name || 'N/A'}
                </td>

                {/* Price */}
                <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                  ৳{item.price}
                </td>

                {/* Stock */}
                <td className="px-4 py-3">
                  <span className={`text-sm font-semibold ${
                    item.stock === 0
                      ? 'text-red-500'
                      : item.stock <= item.minStockThreshold
                      ? 'text-yellow-600'
                      : 'text-gray-700'
                  }`}>
                    {item.stock}
                    {item.stock <= item.minStockThreshold && item.stock > 0 && (
                      <span className="text-xs text-yellow-500 ml-1">(Low)</span>
                    )}
                  </span>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <Badge variant={item.status === 'Active' ? 'success' : 'danger'}>
                    {item.status}
                  </Badge>
                </td>

                {/* Actions */}
                {canManage && (
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => { setEditProduct(item); setEditModal(true) }}
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
        onClose={() => { setEditModal(false); setEditProduct(null) }}
        title="Edit Product"
        size="lg"
      >
        <ProductForm
          editData={editProduct}
          onSuccess={handleEditSuccess}
        />
      </Modal>
    </>
  )
}