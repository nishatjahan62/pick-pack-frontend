'use client'

import { motion } from 'framer-motion'
import { FiLoader } from 'react-icons/fi'

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
}) {
  const base = `inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${fullWidth ? 'w-full' : ''}`

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-3.5 text-base',
  }

  const variants = {
    primary: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white shadow-lg shadow-green-500/25',
    secondary: 'bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-200 hover:to-yellow-300 text-yellow-900 shadow-lg shadow-yellow-400/25',
    outline: 'border border-gray-200 hover:border-green-400 text-gray-600 hover:text-green-600 bg-white',
    ghost: 'text-gray-600 hover:text-green-600 hover:bg-green-50',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white shadow-lg shadow-red-500/25',
  }

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {loading && <FiLoader className="animate-spin" size={14} />}
      {children}
    </motion.button>
  )
}