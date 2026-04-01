'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ProductTable({ canManage }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const defaultImage = "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=200&auto=format&fit=crop"

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
        setProducts(res.data.data)
      } catch (err) {
        console.error("Error fetching products", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) return <div className="p-10 text-center">Loading products...</div>

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="p-4 font-semibold text-gray-600">Product</th>
            <th className="p-4 font-semibold text-gray-600">Category</th>
            <th className="p-4 font-semibold text-gray-600">Price</th>
            <th className="p-4 font-semibold text-gray-600">Stock</th>
            <th className="p-4 font-semibold text-gray-600">Status</th>
            {canManage && <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
              <td className="p-4 flex items-center gap-3">
                <img 
                  src={item.image || defaultImage} 
                  alt={item.name} 
                  className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                />
                <span className="font-medium text-gray-800">{item.name}</span>
              </td>
              <td className="p-4 text-gray-600">{item.category?.name || 'N/A'}</td>
              <td className="p-4 font-semibold">${item.price}</td>
              <td className="p-4">
                <span className={`${item.stock <= item.minStockThreshold ? 'text-red-500 font-bold' : 'text-gray-600'}`}>
                  {item.stock}
                </span>
              </td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {item.status}
                </span>
              </td>
              {canManage && (
                <td className="p-4 text-right">
                  <button className="text-blue-600 hover:underline mr-3 text-sm">Edit</button>
                  <button className="text-red-500 hover:underline text-sm">Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}