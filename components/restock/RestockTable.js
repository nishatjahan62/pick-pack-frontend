'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUpCircle, FiAlertCircle, FiHash } from 'react-icons/fi'
import toast from 'react-hot-toast'
import api from '@/lib/api'
import Loader from '@/components/ui/Loader'
import Badge from '@/components/ui/Badge'
import Input from '@/components/ui/Input' // তোমার দেওয়া নতুন ইনপুট কম্পোনেন্ট

const priorityColors = {
  high: 'danger',
  medium: 'warning',
  low: 'info'
}

export default function RestockTable({ refreshKey, onRestockSuccess }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [restockingId, setRestockingId] = useState(null)
  const [quantity, setQuantity] = useState('')

  const fetchQueue = async () => {
    try {
      setLoading(true)
      const res = await api.get('/restock')
      setItems(res.data.data)
    } catch (err) {
      toast.error('Failed to load restock queue')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQueue()
  }, [refreshKey])

  const handleRestock = async (id) => {
    if (!quantity || quantity <= 0) return toast.error('Enter valid quantity')
    
    try {
      setRestockingId(id)
      await api.put(`/restock/${id}`, { quantity: Number(quantity) })
      toast.success('Stock updated successfully!')
      setQuantity('')
      setRestockingId(null)
      onRestockSuccess()
      fetchQueue()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
      setRestockingId(null)
    }
  }

  // তোমার দেওয়া Loader কম্পোনেন্ট ব্যবহার করা হয়েছে
  if (loading) return (
    <div className="flex justify-center items-center p-24">
      <Loader size="lg" /> 
    </div>
  )

  if (items.length === 0) return (
    <div className="text-center py-20 text-gray-400 bg-white rounded-[2.5rem] border border-dashed border-gray-200 m-6">
      <FiAlertCircle size={48} className="mx-auto mb-4 opacity-20 text-green-500" />
      <p className="text-lg font-bold text-gray-500">Inventory is Healthy!</p>
      <p className="text-sm">All products are above their minimum thresholds.</p>
    </div>
  )

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-400 text-[10px] uppercase font-bold tracking-widest">
            <th className="px-8 py-5">Product Details</th>
            <th className="px-6 py-5 text-center">Stock / Min</th>
            <th className="px-6 py-5">Status</th>
            <th className="px-6 py-5 text-right">Update Inventory</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.tr 
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-green-50/5 transition-colors group"
              >
                <td className="px-8 py-5">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-700 text-sm">{item.name}</span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                      {item.category?.name || 'Uncategorized'}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-5 text-center">
                  <div className="flex flex-col items-center">
                    <span className={`text-sm font-black ${item.stock === 0 ? 'text-red-500 animate-pulse' : 'text-gray-700'}`}>
                      {item.stock}
                    </span>
                    <div className="w-8 h-0.5 bg-gray-100 my-1 rounded-full" />
                    <span className="text-[10px] font-bold text-gray-300 italic">Target: {item.minStockThreshold}</span>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <Badge variant={priorityColors[item.priority]} className="uppercase text-[9px] px-3 font-black tracking-tighter">
                    {item.priority} Priority
                  </Badge>
                </td>

                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-3 max-w-[200px] ml-auto">
                    {/* তোমার দেওয়া Reusable Input কম্পোনেন্ট ব্যবহার করা হয়েছে */}
                    <Input 
                      type="number" 
                      placeholder="Add Qty"
                      icon={FiHash}
                      value={restockingId === item._id ? quantity : ''}
                      onChange={(e) => {
                        setRestockingId(item._id)
                        setQuantity(e.target.value)
                      }}
                      className="!py-1.5 !text-xs !rounded-lg" // টেবিলের জন্য সাইজ ছোট করা হয়েছে
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRestock(item._id)}
                      disabled={restockingId === item._id && !quantity}
                      className="p-2.5 bg-green-600 text-white rounded-xl shadow-lg shadow-green-100 hover:bg-green-700 transition-all disabled:opacity-20"
                    >
                      <FiArrowUpCircle size={20} />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  )
}