'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiGrid, FiBox, FiShoppingBag, FiLayers, FiRefreshCw, FiUser, FiUsers } from 'react-icons/fi'
import { useAuth } from '@/context/AuthContext' 

export default function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth() 

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiGrid, role: 'all' },
    { name: 'Products', path: '/products', icon: FiBox, role: 'all' },
    { name: 'Orders', path: '/orders', icon: FiShoppingBag, role: 'all' },
    { name: 'Categories', path: '/categories', icon: FiLayers, role: 'all' },
    { name: 'Restock', path: '/restock', icon: FiRefreshCw, role: 'all' },
    { name: 'User Management', path: '/user', icon: FiUsers, role: 'admin' }, // Only admin
    { name: 'Profile', path: '/profile', icon: FiUser, role: 'all' },
  ]

  return (
    <aside className="w-72 bg-white h-screen border-r border-gray-100 p-6 flex flex-col sticky top-0">
      <div className="p-4 mb-8">
        <Link href="/" className="flex items-center gap-1 text-2xl font-black italic tracking-tighter">
          <span className="text-green-600">pick</span>
          <span className="text-yellow-400">&</span>
          <span className="text-green-600">pack</span>
        </Link>
      </div>
      
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          // Role check
          if (item.role === 'admin' && user?.role !== 'admin') return null

          const isActive = pathname === item.path
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 ${
                isActive 
                ? 'bg-green-600 text-white shadow-lg shadow-green-100 scale-[1.02]' 
                : 'text-gray-400 hover:bg-green-50 hover:text-green-600'
              }`}
            >
              <item.icon size={22} className={isActive ? 'text-white' : 'text-gray-300'} />
              <span className="text-[15px]">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Profile Status */}
      <div className="mt-auto p-4 bg-gray-50 rounded-3xl border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-green-600 text-white flex items-center justify-center font-black">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-black text-gray-800 truncate">{user?.name || 'User'}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{user?.role || 'Guest'}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}