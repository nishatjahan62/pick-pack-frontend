'use client'

import { useEffect, useState } from 'react'
import { FiEdit2, FiTrash2, FiAlertCircle, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import api from '@/lib/api'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import ProductForm from './ProductForm'
import Loader from '@/components/ui/Loader'

const ITEMS_PER_PAGE = 6
const defaultImage = "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=200&auto=format&fit=crop"

export default function ProductTable({ canManage, refreshKey }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editProduct, setEditProduct] = useState(null)
  const [editModal, setEditModal] = useState(false)

  // Search + Filter + Pagination
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)

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

  // reset page on search/filter change
  useEffect(() => {
    setPage(1)
  }, [search, statusFilter])

  // Filter logic
  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.name?.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter ? p.status === statusFilter : true
    return matchSearch && matchStatus
  })

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

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
  }

  if (loading) return (
    <div className="flex items-center justify-center p-16">
      <Loader size="md" />
    </div>
  )

  return (
    <>
      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 p-4 border-b border-gray-100">
        <div className="relative flex-1 w-full">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <input
            type="text"
            placeholder="Search products or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-green-400 transition"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-green-400 bg-white text-gray-600 transition"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      {/* Table */}
      {paginated.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 text-gray-400">
          <FiAlertCircle size={36} className="mb-3" />
          <p className="text-sm">No products found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Product</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Price</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Stock</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                {canManage && (
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50/60 transition group">
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
                  <td className="px-4 py-3 text-sm text-gray-500">{item.category?.name || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">৳{item.price}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-semibold ${
                      item.stock === 0 ? 'text-red-500' :
                      item.stock <= item.minStockThreshold ? 'text-yellow-600' : 'text-gray-700'
                    }`}>
                      {item.stock}
                      {item.stock > 0 && item.stock <= item.minStockThreshold && (
                        <span className="text-xs text-yellow-500 ml-1">(Low)</span>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={item.status === 'Active' ? 'success' : 'danger'}>
                      {item.status}
                    </Badge>
                  </td>
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
      )}

      {/* Pagination — only if more than 6 products */}
      {filtered.length > ITEMS_PER_PAGE && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-green-400 hover:text-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <FiChevronLeft size={15} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition ${
                  page === n
                    ? 'bg-green-500 text-white'
                    : 'border border-gray-200 text-gray-500 hover:border-green-400 hover:text-green-600'
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-green-400 hover:text-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <FiChevronRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        isOpen={editModal}
        onClose={() => { setEditModal(false); setEditProduct(null) }}
        title="Edit Product"
        size="lg"
      >
        <ProductForm editData={editProduct} onSuccess={handleEditSuccess} />
      </Modal>
    </>
  )
}