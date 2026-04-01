'use client'

import { useEffect, useState } from 'react'
import { FiPackage, FiShoppingCart, FiGrid } from 'react-icons/fi'
import { motion } from 'framer-motion'

const icons = [FiPackage, FiShoppingCart, FiGrid]
const labels = ['Products', 'Orders', 'Categories']
const keys = ['products', 'orders', 'categories']

function CountUp({ target }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (target === 0) return
    let start = 0
    const duration = 1500
    const increment = target / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [target])

  return <span>{count}+</span>
}

export default function Stats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats`)
        const data = await res.json()
        setStats(data.data)
      } catch {
        setStats({ products: 0, orders: 0, categories: 0 })
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
           Our system, <span className="text-green-500">your growth.</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2">Live numbers from our system</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {keys.map((key, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={22} />
                </div>

                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {loading ? (
                    <span className="text-gray-300 animate-pulse">--</span>
                  ) : (
                    <CountUp target={stats?.[key] || 0} />
                  )}
                </div>

                <div className="text-sm text-gray-500 font-medium">{labels[i]}</div>

                <div className="mt-3 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  Live data
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}