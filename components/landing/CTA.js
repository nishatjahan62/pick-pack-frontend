import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

export default function CTA() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-12 text-center relative overflow-hidden">

          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="inline-block bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              Get started today
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to take control <br /> of your inventory?
            </h2>

            <p className="text-green-100 text-sm mb-8 max-w-md mx-auto">
              Join now and start managing your products, orders, and stock levels the smart way.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/signup"
                className="bg-white text-green-600 hover:bg-green-50 font-semibold px-8 py-3.5 rounded-xl text-sm transition flex items-center gap-2 shadow-lg"
              >
                Create Free Account <FiArrowRight size={16} />
              </Link>
              <Link
                href="/login"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium px-8 py-3.5 rounded-xl text-sm transition"
              >
                Login
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}