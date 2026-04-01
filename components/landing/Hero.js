'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

const stats = [
  { value: '100%', label: 'Stock accuracy' },
  { value: 'Real-time', label: 'Order tracking' },
  { value: 'Auto', label: 'Restock alerts' },
]

export default function Hero() {
  return (
    <section className="relative h-[calc(100vh-57px)] flex items-center overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />

      {/* Floating badges on image side */}
      <div className="absolute right-6 md:right-24 top-1/4 z-10 hidden md:flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white text-xs"
        >
          <div className="text-green-400 font-bold text-lg">+142</div>
          <div className="text-gray-300">Orders today</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white text-xs"
        >
          <div className="text-yellow-400 font-bold text-lg">3 alerts</div>
          <div className="text-gray-300">Low stock items</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white text-xs"
        >
          <div className="text-green-400 font-bold text-lg">৳84,200</div>
          <div className="text-gray-300">Revenue today</div>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full px-6 md:px-16 lg:px-24"
      >
        <div className="max-w-xl">

          {/* Badge */}
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-xs font-medium px-3 py-1.5 rounded-full mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse inline-block" />
            Smart Inventory & Order Management
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3"
          >
            Manage your{' '}
            <span className="text-green-400">stock</span>
            <br />
            without the chaos.
          </motion.h1>

          {/* Subtext */}
          <motion.p variants={fadeUp}
            className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 max-w-md"
          >
            Track products, handle orders, and get restock alerts —
            all from one powerful dashboard.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
            <Link
              href="/signup"
              className="bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-3 rounded-xl text-sm transition shadow-lg shadow-green-500/30"
            >
              Get Started Free →
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="mt-10 flex items-center gap-8 flex-wrap">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-8">
                {i !== 0 && <div className="w-px h-7 bg-white/20 hidden sm:block" />}
                <motion.div
                  whileHover={{ scale: 1.1, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="group cursor-default"
                >
                  <div className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-green-400">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5 transition-colors duration-300 group-hover:text-gray-200">
                    {stat.label}
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>

        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />

    </section>
  )
}