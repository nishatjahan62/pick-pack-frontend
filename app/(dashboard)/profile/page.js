'use client'

import { useAuth } from '@/context/AuthContext'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiShield, FiCalendar, FiEdit3 } from 'react-icons/fi'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto min-h-screen bg-gray-50/30 dark:bg-gray-700 transition-colors">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800 dark:text-gray-100">My <span className="text-green-600 dark:text-green-400">Profile</span></h1>
        <p className="text-gray-400 dark:text-gray-500 text-sm">Manage your account settings and personal information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Card: Avatar & Status */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl shadow-gray-100 dark:shadow-none border border-gray-50 dark:border-gray-800 flex flex-col items-center text-center transition-colors"
        >
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-[3rem] bg-green-100 dark:bg-green-950/60 flex items-center justify-center text-4xl font-black text-green-600 dark:text-green-400 border-4 border-white dark:border-gray-800 shadow-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <button className="absolute bottom-1 right-1 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md text-green-600 dark:text-green-400 hover:scale-110 transition">
              <FiEdit3 size={16} />
            </button>
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{user?.name}</h2>
          <p className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/60 px-3 py-1 rounded-full mt-2 uppercase tracking-widest border border-green-100 dark:border-green-900">
            {user?.role}
          </p>
        </motion.div>

        {/* Right Card: Details Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl shadow-gray-100 dark:shadow-none border border-gray-50 dark:border-gray-800 transition-colors"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Full Name" 
              value={user?.name || ''} 
              icon={FiUser} 
              readOnly 
              className="bg-gray-50/50 dark:bg-gray-800/50"
            />
            <Input 
              label="Email Address" 
              value={user?.email || ''} 
              icon={FiMail} 
              readOnly 
              className="bg-gray-50/50 dark:bg-gray-800/50"
            />
            <Input 
              label="User Role" 
              value={user?.role?.toUpperCase() || ''} 
              icon={FiShield} 
              readOnly 
              className="bg-gray-50/50 dark:bg-gray-800/50"
            />
            <Input 
              label="Account ID" 
              value={user?._id?.substring(0, 12) + '...' || ''} 
              icon={FiCalendar} 
              readOnly 
              className="bg-gray-50/50 dark:bg-gray-800/50"
            />
          </div>

          <div className="mt-10 pt-6 border-t border-gray-50 dark:border-gray-800 flex justify-end gap-3">
             <Button variant="outline" className="rounded-xl px-6 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">Change Password</Button>
             <Button className="rounded-xl px-8 shadow-green-100 dark:shadow-none shadow-lg">Edit Profile</Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}