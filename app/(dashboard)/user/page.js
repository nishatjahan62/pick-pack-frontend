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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-gray-800 tracking-tight">
          User <span className="text-green-600">Management</span>
        </h1>
        <p className="text-gray-400 font-medium">Control user access and promote managers.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-6 font-black text-gray-400 uppercase text-[11px] tracking-widest">User Info</th>
                <th className="px-8 py-6 font-black text-gray-400 uppercase text-[11px] tracking-widest">Current Role</th>
                <th className="px-8 py-6 font-black text-gray-400 uppercase text-[11px] tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 font-bold text-lg">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-400 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-tighter ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-600' :
                      user.role === 'manager' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      {user.role !== 'admin' && (
                        <button 
                          onClick={() => handleToggleRole(user._id, user.role)}
                          className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 hover:border-green-600 hover:text-green-600 transition-all shadow-sm"
                        >
                          <FiShield size={16} />
                          {user.role === 'user' ? 'Make Manager' : 'Demote to User'}
                        </button>
                      )}
                      <button className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all">
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