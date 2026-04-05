'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '@/components/layout/Sidebar'
import { FiMenu } from 'react-icons/fi'

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar — mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed z-40 h-full lg:hidden"
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar — desktop */}
      <motion.div
        animate={{ width: sidebarCollapsed ? 72 : 256 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:block h-full flex-shrink-0"
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">

      {/* Mobile — top-left floating button */}
<motion.button
  whileTap={{ scale: 0.85 }}
  onClick={() => setSidebarOpen(true)}
  className="lg:hidden fixed top-4 mt-10 left-4 z-50 p-2.5 rounded-xl bg-white shadow-md border border-gray-100 text-gray-500 hover:text-green-600 transition"
>
  <FiMenu size={20} />
</motion.button>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto p-4 lg:p-8">
            {children}
          </div>
        </main>

      </div>
    </div>
  )
}