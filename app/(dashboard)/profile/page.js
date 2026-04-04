'use client'

import { useAuth } from '@/context/AuthContext'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiShield, FiCalendar, FiEdit3 } from 'react-icons/fi'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800">My <span className="text-green-600">Profile</span></h1>
        <p className="text-gray-400 text-sm">Manage your account settings and personal information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Card: Avatar & Status */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-100 border border-gray-50 flex flex-col items-center text-center"
        >
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-[3rem] bg-green-100 flex items-center justify-center text-4xl font-black text-green-600 border-4 border-white shadow-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <button className="absolute bottom-1 right-1 p-2 bg-white rounded-full shadow-md text-green-600 hover:scale-110 transition">
              <FiEdit3 size={16} />
            </button>
          </div>
          <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
          <p className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full mt-2 uppercase tracking-widest">
            {user?.role}
          </p>
        </motion.div>

        {/* Right Card: Details Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-100 border border-gray-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Full Name" 
              value={user?.name || ''} 
              icon={FiUser} 
              readOnly 
              className="bg-gray-50/50"
            />
            <Input 
              label="Email Address" 
              value={user?.email || ''} 
              icon={FiMail} 
              readOnly 
              className="bg-gray-50/50"
            />
            <Input 
              label="User Role" 
              value={user?.role?.toUpperCase() || ''} 
              icon={FiShield} 
              readOnly 
              className="bg-gray-50/50"
            />
            <Input 
              label="Account ID" 
              value={user?._id?.substring(0, 12) + '...' || ''} 
              icon={FiCalendar} 
              readOnly 
              className="bg-gray-50/50"
            />
          </div>

          <div className="mt-10 pt-6 border-t border-gray-50 flex justify-end gap-3">
             <Button variant="outline" className="rounded-xl px-6">Change Password</Button>
             <Button className="rounded-xl px-8 shadow-green-100 shadow-lg">Edit Profile</Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}