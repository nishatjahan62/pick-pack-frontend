import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

          {/* Logo & Tagline */}
          <div>
            <h3 className="text-2xl font-bold">
              <span className="text-green-600">pick</span>
              <span className="text-yellow-400">&</span>
              <span className="text-green-600">pack</span>
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Smart Inventory & Order Management
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row md:justify-center gap-3 md:gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600 transition">Home</Link>
            <Link href="/#features" className="hover:text-green-600 transition">Features</Link>
            <Link href="/#about" className="hover:text-green-600 transition">About</Link>
            <Link href="/login" className="hover:text-green-600 transition">Login</Link>
            <Link href="/signup" className="hover:text-green-600 transition">Sign up</Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500 md:text-right">
            © {new Date().getFullYear()} pick&pack. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  )
}
