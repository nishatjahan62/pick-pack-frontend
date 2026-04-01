"use client"
import { FiStar } from 'react-icons/fi'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Rafiul Islam',
    role: 'Shop Owner, Dhaka',
    avatar: 'R',
    color: 'bg-green-100 text-green-700',
    rating: 5,
    comment:
      'pick&pack has completely changed how I manage my inventory. Stock alerts save me every week!',
  },
  {
    name: 'Nusrat Jahan',
    role: 'Inventory Manager, Chittagong',
    avatar: 'N',
    color: 'bg-yellow-100 text-yellow-700',
    rating: 5,
    comment:
      'The order management is super clean. Auto stock deduction means I never oversell anymore.',
  },
  {
    name: 'Tanvir Ahmed',
    role: 'E-commerce Seller, Sylhet',
    avatar: 'T',
    color: 'bg-green-100 text-green-700',
    rating: 5,
    comment:
      'Dashboard gives me everything at a glance. Revenue, orders, low stock — all in one place.',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block bg-green-100 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            What people say
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Loved by{' '}
            <span className="text-green-500">inventory managers</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Real feedback from people who use pick&pack every day.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <FiStar key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                &ldquo;{t.comment}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center font-bold text-sm`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}