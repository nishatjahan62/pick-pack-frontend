'use client'

import { FiUserPlus, FiPackage, FiShoppingCart } from 'react-icons/fi'
import { motion } from 'framer-motion'

const steps = [
  {
    icon: FiUserPlus,
    step: '01',
    title: 'Create your account',
    desc: 'Sign up in seconds. No credit card required. Start managing your inventory right away.',
    iconBg: 'bg-green-50 text-green-600 border-green-200',
  },
  {
    icon: FiPackage,
    step: '02',
    title: 'Add your products',
    desc: 'Add products with categories, prices, stock levels and minimum threshold alerts.',
    iconBg: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  },
  {
    icon: FiShoppingCart,
    step: '03',
    title: 'Manage orders',
    desc: 'Create orders, track status, and let the system handle stock deduction automatically.',
    iconBg: 'bg-green-50 text-green-600 border-green-200',
  },
]

export default function HowItWorks() {
  return (
    <section id="about" className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-yellow-100 text-yellow-700 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            Simple process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get started in{' '}
            <span className="text-green-500">3 easy steps</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            No complex setup. Just sign up, add your products, and start managing.
          </p>
        </div>

        {/* Steps — mobile: vertical, desktop: horizontal */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-0">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={i} className="flex flex-col md:flex-row items-center w-full">

                {/* Step card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                  className="flex-1 w-full"
                >
                  {/* Step number */}
                  <div className="text-center mb-4">
                    <span className="text-xs font-bold text-gray-300 tracking-widest">
                      STEP {s.step}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-5">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center ${s.iconBg} shadow-sm`}
                    >
                      <Icon size={26} />
                    </motion.div>
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-2xl p-6 border border-gray-200 text-center mx-2"
                  >
                    <h3 className="font-semibold text-gray-800 mb-2 text-base">{s.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                  </motion.div>
                </motion.div>

                {/* Connector — arrow between steps */}
                {i < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 + 0.3 }}
                    className="flex items-center justify-center my-6 md:my-0 md:px-2 flex-shrink-0"
                  >
                    {/* Mobile: down arrow */}
                    <div className="md:hidden flex flex-col items-center gap-1">
                      <div className="w-px h-6 bg-gray-200" />
                      <div className="w-2 h-2 border-r-2 border-b-2 border-gray-300 rotate-45 -mt-1" />
                    </div>

                    {/* Desktop: right arrow */}
                    <div className="hidden md:flex items-center gap-1">
                      <div className="w-8 h-px bg-gray-200" />
                      <div className="w-2 h-2 border-r-2 border-b-2 border-gray-300 rotate-[-45deg]" />
                    </div>
                  </motion.div>
                )}

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}