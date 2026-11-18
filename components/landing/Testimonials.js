"use client"
import { FiStar } from 'react-icons/fi'
import { motion, useReducedMotion } from 'framer-motion'

const testimonials = [
  {
    name: 'Rafiul Islam',
    role: 'Shop Owner, Dhaka',
    avatar: 'R',
    color: 'bg-green-100 text-green-800 dark:bg-green-400/15 dark:text-green-300',
    rating: 5,
    comment:
      'pick&pack has completely changed how I manage my inventory. Stock alerts save me every week!',
  },
  {
    name: 'Nusrat Jahan',
    role: 'Inventory Manager, Chittagong',
    avatar: 'N',
    color: 'bg-yellow-100 text-yellow-900 dark:bg-yellow-400/15 dark:text-yellow-200',
    rating: 5,
    comment:
      'The order management is super clean. Auto stock deduction means I never oversell anymore.',
  },
  {
    name: 'Tanvir Ahmed',
    role: 'E-commerce Seller, Sylhet',
    avatar: 'T',
    color: 'bg-green-100 text-green-800 dark:bg-green-400/15 dark:text-green-300',
    rating: 5,
    comment:
      'Dashboard gives me everything at a glance. Revenue, orders, low stock — all in one place.',
  },
]

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="bg-white px-6 py-20 transition-colors dark:bg-gray-900 sm:py-24">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
          <div className="mb-4 inline-flex rounded-full border border-green-200 bg-green-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-green-800 dark:border-green-800 dark:bg-green-950/60 dark:text-green-300">
            What people say
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Loved by{' '}
            <span className="text-green-600 dark:text-green-400">inventory managers</span>
          </h2>
          <p className="mx-auto max-w-md text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">
            Real feedback from people who use pick&pack every day.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex h-full flex-col rounded-2xl border border-gray-200/80 bg-gray-50 p-6 transition-colors hover:border-green-300 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-green-800 sm:p-7"
            >
              {/* Stars */}
              <div className="mb-4 flex items-center gap-1" role="img" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <FiStar key={j} size={14} className="fill-yellow-500 text-yellow-600 dark:fill-yellow-300 dark:text-yellow-300" aria-hidden="true" />
                ))}
              </div>

              {/* Comment */}
              <p className="mb-7 flex-1 text-sm leading-6 text-gray-700 dark:text-gray-200">
                &ldquo;{t.comment}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-gray-200 pt-5 dark:border-gray-800">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${t.color}`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}