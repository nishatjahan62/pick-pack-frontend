'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { motion } from 'framer-motion'
import {
  FiGrid, FiPackage, FiLayers, FiShoppingCart,
  FiRefreshCw, FiLogOut, FiX, FiInfo, FiChevronLeft, FiChevronRight
} from 'react-icons/fi'




export default function Sidebar({ onClose, collapsed = false, onToggleCollapse }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: FiGrid },
    { href: '/products', label: 'Products', icon: FiPackage },
    { href: '/categories', label: 'Categories', icon: FiLayers },
    { href: '/orders', label: 'Orders', icon: FiShoppingCart },
    ...(user?.role === 'admin' || user?.role === 'manager'
      ? [{ href: '/restock', label: 'Restock', icon: FiRefreshCw }]
      : []),
    { href: '/#about', label: 'About', icon: FiInfo },
  ]
  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className={`${collapsed ? 'w-[72px]' : 'w-64'} h-full bg-[#052e16] flex flex-col py-5 transition-all duration-300 overflow-hidden`}>

      {/* Logo + buttons */}
      <div className="flex items-center justify-between px-4 mb-6">
        {!collapsed && (
          <Link href="/" className="text-xl font-bold">
            <span className="text-green-400">pick</span>
            <span className="text-yellow-300">&</span>
            <span className="text-green-400">pack</span>
          </Link>
        )}

        {/* Mobile close */}
        {onClose && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="lg:hidden text-green-300 hover:text-white transition p-1 ml-auto"
          >
            <FiX size={20} />
          </motion.button>
        )}

        {/* Desktop collapse toggle */}
        {onToggleCollapse && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-green-300 hover:text-white hover:bg-green-800/40 transition ml-auto"
          >
            {collapsed ? <FiChevronRight size={16} /> : <FiChevronLeft size={16} />}
          </motion.button>
        )}
      </div>

      {/* User info */}
      {user && !collapsed && (
        <div className="flex items-center gap-3 mx-3 px-3 py-3 mb-4 bg-green-900/30 rounded-xl border border-green-800/30">
          <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-sm font-medium truncate">{user.name}</p>
            <p className="text-green-400 text-xs capitalize">{user.role}</p>
          </div>
        </div>
      )}

      {/* Collapsed avatar */}
      {user && collapsed && (
        <div className="flex justify-center mb-4">
          <div className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        </div>
      )}

      {/* Nav Links */}
      <nav className="flex-1 space-y-1 px-2">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                  : 'text-green-200 hover:bg-green-800/40 hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {label}
                </motion.span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-2 mt-2">
        <button
          onClick={handleLogout}
          title={collapsed ? 'Logout' : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-green-300 hover:bg-red-500/20 hover:text-red-300 transition-all ${collapsed ? 'justify-center' : ''}`}
        >
          <FiLogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

    </div>
  )
}