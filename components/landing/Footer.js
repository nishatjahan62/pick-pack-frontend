'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '../../context/AuthContext.js'
import { FiGrid, FiShoppingBag, FiLayers, FiList, FiAlertCircle, FiInfo, FiHome, FiLogIn, FiUserPlus } from 'react-icons/fi'
import { FaGithub, FaLinkedinIn, FaFacebookF, FaXTwitter } from 'react-icons/fa6'

const socialLinks = [
  { label: 'GitHub',     href: 'https://github.com/yourusername',     Icon: FaGithub,     bg: 'bg-[#1a1a1a]' },
  { label: 'LinkedIn',   href: 'https://linkedin.com/in/yourusername', Icon: FaLinkedinIn, bg: 'bg-[#0077b5]' },
  { label: 'X (Twitter)',href: 'https://twitter.com/yourusername',     Icon: FaXTwitter,   bg: 'bg-[#000]' },
  { label: 'Facebook',   href: 'https://facebook.com/yourusername',    Icon: FaFacebookF,  bg: 'bg-[#1877f2]' },
]

export default function Footer() {
  const pathname = usePathname()
  const { user } = useAuth()

  const allFooterLinks = user ? [
    { href: '/dashboard',  label: 'Dashboard',  icon: FiGrid },
    { href: '/products',   label: 'Products',   icon: FiShoppingBag },
    { href: '/categories', label: 'Categories', icon: FiLayers },
    { href: '/orders',     label: 'Orders',     icon: FiList },
    { href: '/restock',    label: 'Restock',    icon: FiAlertCircle, protected: true },
    { href: '/about',      label: 'About',      icon: FiInfo },
  ] : [
    { href: '/',           label: 'Home',       icon: FiHome },
    { href: '/products',   label: 'Products',   icon: FiShoppingBag },
    { href: '/about',      label: 'About',      icon: FiInfo },
    { href: '/login',      label: 'Login',      icon: FiLogIn },
    { href: '/signup',     label: 'Sign Up',    icon: FiUserPlus },
  ]

  const footerLinks = allFooterLinks.filter(link => {
    if (link.protected) return user?.role === 'admin' || user?.role === 'manager'
    return true
  })

  const isActive = (href) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <footer className="bg-gray-50 border-t border-[#d4e8c2] pt-12 pb-6 px-6">
      <div className="w-full px-6 md:px-16 lg:px-24 mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Col 1 — Logo */}
          <div>
            <Link href="/" className="flex items-center gap-0.5 text-xl lg:text-2xl font-bold mb-1">
              <span className="text-green-800">pick</span>
              <span className="text-yellow-600">&</span>
              <span className="text-green-800">pack</span>
            </Link>
            <p className="text-xs text-[#6b7c5e] leading-relaxed mt-2">
              Smart inventory &<br />order management
            </p>
          </div>

          {/* Col 2 — Nav Links */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#8fa07a] font-medium mb-3">
              Navigation
            </p>
            <div className="flex flex-col gap-0.5">
              {footerLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all w-fit ${
                      isActive(link.href)
                        ? 'bg-[#ddf0c8] text-green-800 font-semibold'
                        : 'text-[#5a6e4a] hover:bg-[#e8f4dc] hover:text-green-800'
                    }`}
                  >
                    <Icon size={14} />
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Col 3 — Social Media */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#8fa07a] font-medium mb-3">
              Find us online
            </p>
            <div className="flex flex-col gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl border border-[#cde0b4] bg-white text-[#4a6035] text-sm font-medium hover:bg-[#e8f4dc] hover:border-[#a8d080] hover:text-green-800 transition-all"
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-white ${s.bg} flex-shrink-0`}>
                    <s.Icon size={13} />
                  </span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#cde0b4] pt-5 flex items-center justify-between flex-wrap gap-3">
          <p className="text-xs text-[#8fa07a]">
            © {new Date().getFullYear()} pick&pack · All rights reserved
          </p>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-green-700 bg-[#e2f5ce] border border-[#bde099] rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            All systems operational
          </span>
        </div>

      </div>
    </footer>
  )
}
