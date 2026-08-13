'use client'
import { useEffect, useState } from 'react'
import api from '@/lib/api' // তোমার তৈরি করা Axios instance
import { FiUserCheck, FiShield, FiTrash2 } from 'react-icons/fi'
import Loader from '@/components/ui/Loader'
import { toast } from 'react-hot-toast'

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users')
      setUsers(res.data.data)
    } catch (err) {
      toast.error("Failed to fetch users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  const handleToggleRole = async (userId, currentRole) => {
    try {
      const newRole = currentRole === 'user' ? 'manager' : 'user'
      await api.patch('/admin/update-role', { userId, newRole })
      toast.success(`User updated to ${newRole}`)
      fetchUsers() // ডাটা রিফ্রেশ করা
    } catch (err) {
      toast.error("Role update failed")
    }
  }

  if (loading) return <div className="flex h-[70vh] justify-center items-center"><Loader size="lg" /></div>

  return (
    <div className="space-y-8 animate-in fade-in duration-500 min-h-screen bg-gray-50/30 dark:bg-gray-700 p-6 md:p-10 transition-colors">
      <div>
        <h1 className="text-3xl font-black text-gray-800 dark:text-gray-100 tracking-tight">
          User <span className="text-green-600 dark:text-green-400">Management</span>
        </h1>
        <p className="text-gray-400 dark:text-gray-500 font-medium">Control user access and promote managers.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl shadow-gray-100/50 dark:shadow-none border border-gray-50 dark:border-gray-800 overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                <th className="px-8 py-6 font-black text-gray-400 dark:text-gray-500 uppercase text-[11px] tracking-widest">User Info</th>
                <th className="px-8 py-6 font-black text-gray-400 dark:text-gray-500 uppercase text-[11px] tracking-widest">Current Role</th>
                <th className="px-8 py-6 font-black text-gray-400 dark:text-gray-500 uppercase text-[11px] tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-950/60 flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-lg border border-green-100 dark:border-green-900">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 dark:text-gray-100">{user.name}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-tighter ${
                      user.role === 'admin' ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900' :
                      user.role === 'manager' ? 'bg-yellow-100 dark:bg-yellow-950/60 text-yellow-600 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900' :
                      'bg-green-100 dark:bg-green-950/60 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-900'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      {user.role !== 'admin' && (
                        <button 
                          onClick={() => handleToggleRole(user._id, user.role)}
                          className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:border-green-600 dark:hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition-all shadow-sm"
                        >
                          <FiShield size={16} />
                          {user.role === 'user' ? 'Make Manager' : 'Demote to User'}
                        </button>
                      )}
                      <button className="p-3 bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-600 hover:text-white transition-all border border-red-100 dark:border-red-900">
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}