'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiTrash2, FiShoppingCart, FiUser } from 'react-icons/fi'
import toast from 'react-hot-toast'
import api from '@/lib/api'
import Button from '@/components/ui/Button'
import Loader from '@/components/ui/Loader'

export default function OrderForm({ onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([]) // ড্রপডাউনের জন্য সব প্রোডাক্ট
  const [customerName, setCustomerName] = useState('')
  const [items, setItems] = useState([{ product: '', quantity: 1 }])

  // ১. সব প্রোডাক্ট ফেচ করা (যাতে ড্রপডাউনে দেখানো যায়)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products')
        // শুধু স্টকে আছে এমন প্রোডাক্ট ফিল্টার করতে পারো
        setProducts(res.data.data)
      } catch {
        toast.error('Could not load products')
      }
    }
    fetchProducts()
  }, [])

  // ২. নতুন আইটেম রো অ্যাড করা
  const addItemRow = () => {
    setItems([...items, { product: '', quantity: 1 }])
  }

  // ৩. আইটেম রিমুভ করা
  const removeItemRow = (index) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index)
      setItems(newItems)
    }
  }

  // ৪. ইনপুট চেঞ্জ হ্যান্ডেল করা
  const handleItemChange = (index, field, value) => {
    const newItems = [...items]
    newItems[index][field] = value
    setItems(newItems)
  }

  // ৫. টোটাল প্রাইজ ক্যালকুলেট করা (লাইভ প্রিভিউ)
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const product = products.find(p => p._id === item.product)
      return total + (product ? product.price * item.quantity : 0)
    }, 0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.post('/orders', { customerName, items })
      toast.success('Order placed successfully!')
      onSuccess()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create order')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-2">
      {/* Customer Info Section */}
      <div className="bg-green-50/50 p-5 rounded-2xl border border-green-100">
        <label className="block text-sm font-bold text-green-700 mb-2 flex items-center gap-2">
          <FiUser /> Customer Name
        </label>
        <input
          required
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter client name"
          className="w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-green-500 shadow-sm"
        />
      </div>

      {/* Items Selection Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="font-bold text-gray-700 flex items-center gap-2">
            <FiShoppingCart className="text-green-600" /> Selected Items
          </h3>
          <button 
            type="button" 
            onClick={addItemRow}
            className="text-xs font-bold text-green-600 hover:text-green-700 flex items-center gap-1"
          >
            <FiPlus /> Add Another
          </button>
        </div>

        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-wrap md:flex-nowrap gap-3 items-end bg-white p-4 rounded-2xl border border-gray-100 shadow-sm"
            >
              {/* Product Dropdown */}
              <div className="flex-1 min-w-[200px]">
                <label className="text-[10px] uppercase font-bold text-gray-400 ml-1">Product</label>
                <select
                  required
                  value={item.product}
                  onChange={(e) => handleItemChange(index, 'product', e.target.value)}
                  className="w-full mt-1 px-3 py-2.5 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-green-500 text-sm"
                >
                  <option value="">Select a product</option>
                  {products.map(p => (
                    <option key={p._id} value={p._id} disabled={p.stock <= 0}>
                      {p.name} — ${p.price} ({p.stock} in stock)
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Input */}
              <div className="w-24">
                <label className="text-[10px] uppercase font-bold text-gray-400 ml-1">Qty</label>
                <input
                  required
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                  className="w-full mt-1 px-3 py-2.5 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeItemRow(index)}
                className="p-3 text-red-400 hover:bg-red-50 rounded-lg transition-colors mb-0.5"
              >
                <FiTrash2 size={18} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer: Total & Submit */}
      <div className="pt-6 border-t border-dashed border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">Total Amount</p>
          <p className="text-3xl font-black text-green-600">${calculateTotal().toFixed(2)}</p>
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full md:w-auto px-12 py-4 rounded-2xl shadow-xl shadow-green-100"
        >
          {loading ? <Loader /> : 'Confirm Order'}
        </Button>
      </div>
    </form>
  )
}