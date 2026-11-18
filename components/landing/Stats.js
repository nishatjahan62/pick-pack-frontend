
'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import {
  FiPackage,
  FiShoppingCart,
  FiGrid,
  FiActivity,
} from 'react-icons/fi'
import { motion, useReducedMotion } from 'framer-motion'

const statsConfig = [
  {
    key: 'products',
    label: 'Total Products',
    icon: FiPackage,
    accent: 'green',
  },
  {
    key: 'orders',
    label: 'Total Orders',
    icon: FiShoppingCart,
    accent: 'yellow',
  },
  {
    key: 'categories',
    label: 'Categories',
    icon: FiGrid,
    accent: 'green',
  },
]

function CountUp({ target, shouldReduceMotion, active }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return

    if (shouldReduceMotion || target <= 0) return

    let start = 0
    const duration = 1400
    const increment = target / (duration / 16)

    const timer = setInterval(() => {
      start += increment

      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [target, shouldReduceMotion, active])

  const displayValue =
    !active || shouldReduceMotion || target <= 0 ? target : count

  return <>{displayValue.toLocaleString()}+</>
}

export default function Stats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const controller = new AbortController()

    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stats`,
          { signal: controller.signal }
        )

        if (!res.ok) throw new Error('Failed to fetch statistics')

        const data = await res.json()

        setStats(data.data ?? {
          products: 0,
          orders: 0,
          categories: 0,
        })
      } catch (error) {
        if (error.name !== 'AbortError') {
          setStats({
            products: 0,
            orders: 0,
            categories: 0,
          })
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchStats()

    return () => controller.abort()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#F5F7F3] px-6 py-20 transition-colors duration-300 dark:bg-[#171F1B] sm:py-24"
    >
      <div className="mx-auto max-w-7xl">

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">

          {/* Left: Statistics */}
          <div>

            <div className="mb-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D9E1D9] bg-white px-4 py-2 text-xs font-bold tracking-widest text-[#237A50] dark:border-[#39483E] dark:bg-[#222D26] dark:text-[#75C99A]">
                <FiActivity size={14} />
                PLATFORM OVERVIEW
              </div>

              <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#17251D] dark:text-[#F1F5F0] sm:text-4xl">
                Your inventory,
                <span className="block text-[#237A50] dark:text-[#75C99A]">
                  at a glance.
                </span>
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-[#59675D] dark:text-[#B5C1B7] sm:text-base">
                Get a clear overview of your products, orders, and
                categories. Everything important, all in one place.
              </p>
            </div>

            {/* Cards */}
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">

              {statsConfig.map((item, index) => {
                const Icon = item.icon
                const isYellow = item.accent === 'yellow'

                return (
                  <motion.div
                    key={item.key}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: -18 }}
                    animate={
                      isVisible && !shouldReduceMotion
                        ? { opacity: 1, x: 0 }
                        : shouldReduceMotion
                          ? undefined
                          : {}
                    }
                    transition={{ duration: 0.45, delay: index * 0.12 }}
                    className={`relative overflow-hidden rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 sm:p-6 ${
                      isYellow
                        ? 'border-[#E9DDAF] bg-gradient-to-r from-[#FFFDF4] via-[#FFF9E8] to-[#F8EECF] dark:border-[#665A35] dark:from-[#332F22] dark:via-[#302C20] dark:to-[#292719]'
                        : 'border-[#CFE2D3] bg-gradient-to-r from-[#F8FFF9] via-[#EFF8F0] to-[#DDEFE1] dark:border-[#3C5A46] dark:from-[#25352A] dark:via-[#223128] dark:to-[#1D2B23]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">

                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                            isYellow
                              ? 'bg-[#EABF45]/20 text-[#98700C] dark:text-[#F0CE70]'
                              : 'bg-[#237A50]/10 text-[#237A50] dark:text-[#75C99A]'
                          }`}
                        >
                          <Icon size={22} />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-[#59675D] dark:text-[#B5C1B7]">
                            {item.label}
                          </p>

                          <div className="mt-1 text-3xl font-bold tracking-tight text-[#17251D] dark:text-[#F1F5F0]">
                            {loading ? (
                              <span className="animate-pulse text-[#AAB5AC]">
                                ---
                              </span>
                            ) : (
                              <CountUp
                                target={Number(stats?.[item.key]) || 0}
                                active={isVisible}
                                shouldReduceMotion={shouldReduceMotion}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-full sm:flex ${
                          isYellow
                            ? 'bg-[#EABF45]/15 text-[#98700C] dark:text-[#F0CE70]'
                            : 'bg-[#237A50]/10 text-[#237A50] dark:text-[#75C99A]'
                        }`}
                      >
                        <FiActivity size={18} />
                      </div>

                    </div>
                  </motion.div>
                )
              })}

            </div>
          </div>

          {/* Right: Statistics Image */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={
              isVisible && !shouldReduceMotion
                ? { opacity: 1, scale: 1 }
                : shouldReduceMotion
                  ? undefined
                  : {}
            }
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-[#D9E1D9] bg-white p-3 shadow-[0_12px_40px_rgba(23,37,29,0.08)] dark:border-[#39483E] dark:bg-[#222D26] dark:shadow-none sm:p-5">

              <Image
                src="/stat.png"
                alt="Inventory statistics and analytics graph"
                width={900}
                height={700}
                priority={false}
                className="h-auto w-full rounded-2xl object-contain"
              />

            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-5 -right-5 -z-10 h-32 w-32 rounded-full bg-[#EABF45]/20 blur-2xl" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
