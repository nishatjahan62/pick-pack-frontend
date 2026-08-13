// 'use client'

// import Link from 'next/link'
// import { useAuth } from '../../context/AuthContext.js'
// import { useTheme } from '../../context/ThemeContext.js'
// import { useRouter, usePathname } from 'next/navigation'
// import { useState } from 'react'
// import toast from 'react-hot-toast'
// import { FiLogOut, FiGrid, FiUser, FiChevronDown, FiMenu, FiX, FiShoppingBag, FiLayers, FiList, FiAlertCircle, FiInfo, FiSun, FiMoon } from 'react-icons/fi'
// import Button from '../ui/Button.js'

// export default function Navbar() {
//   const { user, logout } = useAuth()
//   const { isDark, toggleTheme } = useTheme()
//   const router = useRouter()
//   const pathname = usePathname()
//   const [dropdownOpen, setDropdownOpen] = useState(false)
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [showLogoutModal, setShowLogoutModal] = useState(false)

//   const handleLogout = () => {
//     logout()
//     setDropdownOpen(false)
//     setMenuOpen(false)
//     setShowLogoutModal(false)
//     toast.success('Logged out successfully!')
//     router.push('/')
//   }

//   const allNavLinks = user ? [
//     { href: '/dashboard', label: 'Dashboard', icon: <FiGrid size={16} /> },
//     { href: '/products', label: 'Products', icon: <FiShoppingBag size={16} /> },
//     { href: '/categories', label: 'Categories', icon: <FiLayers size={16} /> },
//     { href: '/orders', label: 'Orders', icon: <FiList size={16} /> },
//     { 
//       href: '/restock', 
//       label: 'Restock', 
//       icon: <FiAlertCircle size={16} />,
//       protected: true 
//     },
//     { href: '/about', label: 'About', icon: <FiInfo size={16} /> },
//   ] : [
//     { href: '/', label: 'Home' },
//     { href: '/products', label: 'Products' }, 
//     { href: '/about', label: 'About' },       
//   ]

//   const navLinks = allNavLinks.filter(link => {
//     if (link.protected) {
//       return user?.role === 'admin' || user?.role === 'manager'
//     }
//     return true
//   })

//   const isActive = (href) => {
//     if (href === '/') return pathname === '/'
//     return pathname.startsWith(href)
//   }

//   return (
//     <>
//       <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 py-3 transition-colors">
//         <div className="w-full px-6 md:px-16 lg:px-24 flex items-center justify-between">
          
//           <Link href="/" className="flex items-center gap-0.5 text-xl font-bold">
//             <span className="text-green-600">pick</span>
//             <span className="text-yellow-400">&</span>
//             <span className="text-green-600">pack</span>
//           </Link>

//           <div className="hidden md:flex items-center gap-6 text-sm">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`transition flex items-center gap-1.5 font-medium ${
//                   isActive(link.href)
//                     ? 'text-green-600 font-bold'
//                     : 'text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'
//                 }`}
//               >
//                 {user && link.icon}
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           <div className="hidden md:flex items-center gap-3">
//             {/* Theme toggle */}
//             <button
//               onClick={toggleTheme}
//               aria-label="Toggle theme"
//               className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//             >
//               {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
//             </button>

//             {user ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                   className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition"
//                 >
//                   <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 flex items-center justify-center font-bold text-xs">
//                     {user.name?.charAt(0).toUpperCase()}
//                   </div>
//                   <span>{user.name}</span>
//                   <FiChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
//                 </button>

//                 {dropdownOpen && (
//                   <div className="absolute right-0 top-12 w-52 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-lg py-2 z-50">
//                     <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
//                       <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{user.name}</p>
//                       <p className="text-xs text-gray-400 dark:text-gray-500">{user.email}</p>
//                     </div>
                    
//                     <Link href="/profile" onClick={() => setDropdownOpen(false)}
//                       className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400 transition">
//                       <FiUser size={14} /> Profile
//                     </Link>

//                     <Link href="/activity-log" onClick={() => setDropdownOpen(false)}
//                       className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400 transition">
//                       <FiList size={14} /> Activity Log
//                     </Link>

//                     <button onClick={() => setShowLogoutModal(true)}
//                       className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition border-t border-gray-50 dark:border-gray-800">
//                       <FiLogOut size={14} /> Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <Link href="/login" className="text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition font-medium">
//                   Login
//                 </Link>
//                 <Link href="/signup" className="text-sm bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition shadow-sm">
//                   Get Started
//                 </Link>
//               </>
//             )}
//           </div>

//           <div className="md:hidden flex items-center gap-2">
//            <Button className="bg-white/90 dark:bg-black/90" onClick={toggleTheme} ariaLabel="Toggle theme">
//                 {isDark ? (
//                   <div key="sun" className="text-amber-400">
//                     <FiSun size={20} className="text-amber-400" />
//                   </div>
//                 ) : (
//                   <div key="moon" className="text-amber-400">
//                     < FiMoon size={20} className="text-amber-500 dark:text-amber-300" />
//                   </div>
//                 )}
          
//             </Button>
//           </div>
//         </div>

//         {menuOpen && (
//           <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-6 py-4 space-y-2 shadow-xl">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 onClick={() => setMenuOpen(false)}
//                 className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
//                   isActive(link.href) ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-bold' : 'text-gray-600 dark:text-gray-300'
//                 }`}
//               >
//                 {user && link.icon}
//                 {link.label}
//               </Link>
//             ))}

//             <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
//               {user ? (
//                 <button onClick={() => setShowLogoutModal(true)} className="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-3 rounded-xl text-sm font-bold">
//                   <FiLogOut size={16} /> Logout
//                 </button>
//               ) : (
//                 <div className="grid grid-cols-2 gap-3">
//                   <Link href="/login" onClick={() => setMenuOpen(false)} className="text-center py-3 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl">
//                     Login
//                   </Link>
//                   <Link href="/signup" onClick={() => setMenuOpen(false)} className="text-center py-3 text-sm font-medium bg-green-500 text-white rounded-xl">
//                     Sign Up
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Logout Modal */}
//       {showLogoutModal && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
//           <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FiLogOut size={30} />
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Are you sure?</h3>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Do you really want to logout from your account?</p>
//             </div>
//             <div className="flex gap-3 mt-6">
//               <button 
//                 onClick={() => setShowLogoutModal(false)}
//                 className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleLogout}
//                 className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
// <div className="h-[64px] bg-white dark:bg-gray-900" />
//     </>
//   )
// }



'use client'

import Link from 'next/link'
import { useAuth } from '../../context/AuthContext.js'
import { useTheme } from '../../context/ThemeContext.js'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FiLogOut, FiGrid, FiUser, FiChevronDown, FiMenu, FiX, FiShoppingBag, FiLayers, FiList, FiAlertCircle, FiInfo, FiSun, FiMoon } from 'react-icons/fi'
import Button from '../ui/Button.js'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleLogout = () => {
    logout()
    setDropdownOpen(false)
    setMenuOpen(false)
    setShowLogoutModal(false)
    toast.success('Logged out successfully!')
    router.push('/')
  }

  const allNavLinks = user ? [
    { href: '/dashboard', label: 'Dashboard', icon: <FiGrid size={16} /> },
    { href: '/products', label: 'Products', icon: <FiShoppingBag size={16} /> },
    { href: '/categories', label: 'Categories', icon: <FiLayers size={16} /> },
    { href: '/orders', label: 'Orders', icon: <FiList size={16} /> },
    { 
      href: '/restock', 
      label: 'Restock', 
      icon: <FiAlertCircle size={16} />,
      protected: true 
    },
    { href: '/about', label: 'About', icon: <FiInfo size={16} /> },
  ] : [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' }, 
    { href: '/about', label: 'About' },       
  ]

  const navLinks = allNavLinks.filter(link => {
    if (link.protected) {
      return user?.role === 'admin' || user?.role === 'manager'
    }
    return true
  })

  const isActive = (href) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 py-3 transition-colors">
        <div className="w-full px-6 md:px-16 lg:px-24 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-0.5 text-xl font-bold">
            <span className="text-green-600">pick</span>
            <span className="text-yellow-400">&</span>
            <span className="text-green-600">pack</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition flex items-center gap-1.5 font-medium ${
                  isActive(link.href)
                    ? 'text-green-600 font-bold'
                    : 'text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'
                }`}
              >
                {user && link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 flex items-center justify-center rounded-full text-amber-500 dark:text-amber-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {isDark ? <FiSun size={16} className="text-amber-400" /> : <FiMoon size={16} className="text-amber-500" />}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 flex items-center justify-center font-bold text-xs">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span>{user.name}</span>
                  <FiChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-12 w-52 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{user.name}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{user.email}</p>
                    </div>
                    
                    <Link href="/profile" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400 transition">
                      <FiUser size={14} /> Profile
                    </Link>

                    <Link href="/activity-log" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400 transition">
                      <FiList size={14} /> Activity Log
                    </Link>

                    <button onClick={() => setShowLogoutModal(true)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition border-t border-gray-50 dark:border-gray-800">
                      <FiLogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition font-medium">
                  Login
                </Link>
                <Link href="/signup" className="text-sm bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition shadow-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
           <Button className="bg-white/90 dark:bg-black/90" onClick={toggleTheme} ariaLabel="Toggle theme">
                {isDark ? (
                  <div key="sun" className="text-amber-400">
                    <FiSun size={20} className="text-amber-400" />
                  </div>
                ) : (
                  <div key="moon" className="text-amber-500">
                    <FiMoon size={20} className="text-amber-500" />
                  </div>
                )}
            </Button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 dark:text-gray-300">
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-6 py-4 space-y-2 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive(link.href) ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-bold' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {user && link.icon}
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              {user ? (
                <button onClick={() => setShowLogoutModal(true)} className="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-3 rounded-xl text-sm font-bold">
                  <FiLogOut size={16} /> Logout
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="text-center py-3 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl">
                    Login
                  </Link>
                  <Link href="/signup" onClick={() => setMenuOpen(false)} className="text-center py-3 text-sm font-medium bg-green-500 text-white rounded-xl">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiLogOut size={30} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Are you sure?</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Do you really want to logout from your account?</p>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="h-[64px] bg-white dark:bg-gray-900" />
    </>
  )
}