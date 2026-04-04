'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiEye, FiXCircle, FiChevronDown } from 'react-icons/fi'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import api from '@/lib/api'
import Loader from '@/components/ui/Loader'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import { useAuth } from '@/context/AuthContext'

// ব্যাকএন্ডের ORDER_STATUS এর সাথে মিল রেখে ছোটহাতে (Lowercase) রাখা হয়েছে
const statusColors = {
  pending: 'warning',
  confirmed: 'info',
  shipped: 'pending',
  delivered: 'success',
  cancelled: 'danger',
}

const statusOptions = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']

export default function OrderTable({ refreshKey, statusFilter }) {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewOrder, setViewOrder] = useState(null)

  const canManage = user?.role === 'admin' || user?.role === 'manager'

  const fetchOrders = async () => {
    try {
      setLoading(true)
      // ফিল্টার ভ্যালু ছোটহাতে পাঠানো হচ্ছে যাতে DB তে থাকা lowercase ভ্যালুর সাথে ম্যাচ করে
      const url = statusFilter ? `/orders?status=${statusFilter.toLowerCase()}` : '/orders'
      const res = await api.get(url)
      setOrders(res.data.data)
    } catch {
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [refreshKey, statusFilter])

  const handleStatusUpdate = async (orderId, newStatus) => {
    // অপটিমিস্টিক আপডেট (UI আগে চেঞ্জ হবে)
    const oldOrders = [...orders]
    setOrders(prev =>
      prev.map(o => o._id === orderId ? { ...o, status: newStatus.toLowerCase() } : o)
    )

    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus.toLowerCase() })
      toast.success(`Order marked as ${newStatus}`)
    } catch (err) {
      setOrders(oldOrders) // এরর হলে আগের ডাটাতে ফিরে যাবে
      toast.error(err.response?.data?.message || 'Update failed')
    }
  }

  const handleCancel = async (order) => {
    const result = await Swal.fire({
      title: 'Cancel Order?',
      text: 'Stock will be restored automatically.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, cancel it!',
    })

    if (result.isConfirmed) {
      try {
        await api.put(`/orders/${order._id}/cancel`)
        toast.success('Order cancelled!')
        fetchOrders()
      } catch (err) {
        toast.error(err.response?.data?.message || 'Cancel failed')
      }
    }
  }

  if (loading) return <div className="flex justify-center p-20"><Loader size="md" /></div>

  if (orders.length === 0) return (
    <div className="text-center py-16 text-gray-400">
      <FiXCircle size={36} className="mx-auto mb-3 opacity-20" />
      <p className="text-sm">No orders found.</p>
    </div>
  )

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-400 text-[10px] uppercase font-bold tracking-widest">
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Total Price</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <AnimatePresence mode="popLayout">
              {orders.map((order, index) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.04 }}
                  className="hover:bg-green-50/10 transition-colors group"
                >
                  {/* Customer */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-black shadow-sm">
                        {order.customerName?.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-bold text-gray-700 text-sm">{order.customerName}</span>
                    </div>
                  </td>

                  {/* Items */}
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-1 rounded-md font-bold uppercase">
                      {order.items?.length || 0} Products
                    </span>
                  </td>

                  {/* Total */}
                  <td className="px-6 py-4 font-black text-green-600 text-sm">
                    ৳{order.totalPrice?.toLocaleString()}
                  </td>

                  {/* Status Logic */}
                  <td className="px-6 py-4">
                    {canManage && 
                     order.status?.toLowerCase() !== 'cancelled' && 
                     order.status?.toLowerCase() !== 'delivered' ? (
                      <div className="relative inline-block">
                        <select
                          value={order.status?.toLowerCase()}
                          onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                          className="text-[10px] font-bold uppercase pl-3 pr-8 py-1.5 rounded-full border-0 outline-none cursor-pointer appearance-none bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                          {statusOptions.map(s => (
                            <option key={s} value={s}>{s.toUpperCase()}</option>
                          ))}
                        </select>
                        <FiChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    ) : (
                      <Badge variant={statusColors[order.status?.toLowerCase()] || 'default'} className="capitalize font-bold text-[10px] px-3">
                        {order.status}
                      </Badge>
                    )}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-xs font-medium text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit', month: 'short', year: 'numeric'
                    })}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 ">
                      <button
                        onClick={() => setViewOrder(order)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-all hover:scale-110"
                        title="View details"
                      >
                        <FiEye size={18} />
                      </button>
                      {order.status?.toLowerCase() !== 'cancelled' && order.status?.toLowerCase() !== 'delivered' && (
                        <button
                          onClick={() => handleCancel(order)}
                          className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-all hover:scale-110"
                          title="Cancel order"
                        >
                          <FiXCircle size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* View Order Modal */}
      <Modal isOpen={!!viewOrder} onClose={() => setViewOrder(null)} title="Order Summary" size="md">
        {viewOrder && (
          <div className="space-y-6 p-2">
            <div className="flex justify-between items-end">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Customer</h4>
                <p className="text-xl font-black text-gray-800">{viewOrder.customerName}</p>
              </div>
              <Badge variant={statusColors[viewOrder.status?.toLowerCase()]} className="uppercase text-[10px]">
                {viewOrder.status}
              </Badge>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Order Items</h4>
              {viewOrder.items?.map((item, i) => (
                <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl">
                  <div>
                    <p className="text-sm font-bold text-gray-700">{item.product?.name || 'Product'}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-green-600">৳{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="bg-green-600 p-5 rounded-[2rem] text-white flex justify-between items-center shadow-lg shadow-green-100">
              <span className="font-bold text-sm uppercase opacity-80">Total Amount</span>
              <span className="text-2xl font-black">৳{viewOrder.totalPrice?.toLocaleString()}</span>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}