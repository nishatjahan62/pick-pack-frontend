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

const leftCards = [
  {
    delay: 0.7,
    valueColor: 'text-green-400',
    barColor: 'from-green-400 to-emerald-300',
    value: '+142',
    label: 'Orders today',
    icon: '📦',
    animY: [-6, 0, -6],
    iconAnim: { scale: [1, 1.25, 1] },
    duration: 3,
  },
  {
    delay: 1.0,
    valueColor: 'text-blue-400',
    barColor: 'from-blue-400 to-cyan-300',
    value: '98.5%',
    label: 'Fulfillment rate',
    icon: '✅',
    animY: [0, -7, 0],
    iconAnim: { rotate: [0, 10, -10, 0] },
    duration: 3.8,
  },
]

const rightCards = [
  {
    delay: 0.9,
    valueColor: 'text-yellow-400',
    barColor: 'from-yellow-400 to-orange-300',
    value: '3 alerts',
    label: 'Low stock items',
    icon: '⚠️',
    animY: [0, -8, 0],
    iconAnim: { y: [0, -4, 0] },
    duration: 3.5,
  },
  {
    delay: 1.2,
    valueColor: 'text-emerald-400',
    barColor: 'from-emerald-400 to-green-300',
    value: '৳84,200',
    label: 'Revenue today',
    icon: '💰',
    animY: [-4, 4, -4],
    iconAnim: { scale: [1, 1.2, 1] },
    duration: 4,
  },
]

function FloatingCard({ card, fromLeft }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: card.delay, duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div
        animate={{ y: card.animY }}
        transition={{ duration: card.duration, repeat: Infinity, ease: 'easeInOut' }}
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-4 text-white shadow-xl shadow-black/30 cursor-default group overflow-hidden min-w-[155px]"
      >
        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10 flex items-center gap-3">
          <motion.span
            animate={card.iconAnim}
            transition={{ duration: card.duration - 0.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-xl"
          >
            {card.icon}
          </motion.span>
          <div>
            <div className={`${card.valueColor} font-bold text-xl leading-none`}>{card.value}</div>
            <div className="text-gray-400 text-xs mt-1">{card.label}</div>
          </div>
        </div>

        {/* Animated bottom bar */}
        <motion.div
          className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r ${card.barColor} rounded-full`}
          animate={{ width: ['0%', '100%', '0%'] }}
          transition={{ duration: card.duration + 1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative h-[calc(100vh-57px)] flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating cards — LEFT (2টা) */}
      <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col gap-4">
        {leftCards.map((card, i) => (
          <FloatingCard key={i} card={card} fromLeft={true} />
        ))}
      </div>

      {/* Floating cards — RIGHT (2টা) */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col gap-4">
        {rightCards.map((card, i) => (
          <FloatingCard key={i} card={card} fromLeft={false} />
        ))}
      </div>

      {/* ── CENTER CONTENT ── */}
      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full px-6 flex flex-col items-center text-center"
      >
        <div className="max-w-2xl w-full">

          {/* Badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/40 text-yellow-300 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse inline-block" />
            Smart Inventory & Order Management
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 tracking-tight"
          >
            Manage your{' '}
            <span className="relative inline-block">
              <span className="text-green-400">stock</span>
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-green-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
              />
            </span>
            <br />
            without the chaos.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto"
          >
            Track products, handle orders, and get restock alerts —
            all from one powerful dashboard.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3 max-w-md mx-auto w-full">

            {/* Button 1 — Get Started → /register */}
            <motion.div
              animate={{ boxShadow: ['0 0 0px #22c55e55', '0 0 22px #22c55eaa', '0 0 0px #22c55e55'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-xl"
            >
              <Link
                href="/register"
                className="relative overflow-hidden flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-5 py-3.5 rounded-xl text-sm transition-all duration-300 hover:scale-105 group w-full"
              >
                <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>🚀</motion.span>
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl" />
              </Link>
            </motion.div>

            {/* Button 2 — Demo → /login */}
            <motion.div
              animate={{ borderColor: ['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.15)'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-xl border"
            >
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 text-white/80 hover:text-white font-medium px-5 py-3.5 rounded-xl text-sm transition-all duration-300 backdrop-blur-sm hover:bg-white/5 w-full"
              >
                <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>▶</motion.span>
                Demo
              </Link>
            </motion.div>

          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="mt-12 flex items-center justify-center gap-6 sm:gap-10 flex-wrap"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-6 sm:gap-10">
                {i !== 0 && <div className="w-px h-8 bg-white/20 hidden sm:block" />}
                <motion.div
                  whileHover={{ scale: 1.12, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="group cursor-default text-center"
                >
                  <div className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5 group-hover:text-gray-200 transition-colors duration-300">
                    {stat.label}
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>

        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />

    </section>
  )
}