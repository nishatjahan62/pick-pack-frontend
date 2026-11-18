
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
    value: 2500,
    icon: FiPackage,
    accent: 'green',
  },
  {
    key: 'orders',
    label: 'Total Orders',
    value: 1200,
    icon: FiShoppingCart,
    accent: 'yellow',
  },
  {
    key: 'categories',
    label: 'Categories',
    value: 50,
    icon: FiGrid,
    accent: 'green',
  },
]

function CountUp({ target, active, shouldReduceMotion }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active || shouldReduceMotion) return

    let startTime = null
    const duration = 1600
    let animationFrame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      )

      setCount(Math.floor(progress * target))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [target, active, shouldReduceMotion])

  const displayValue = shouldReduceMotion
    ? target
    : active
      ? count
      : 0

  return <>{displayValue.toLocaleString()}+</>
}

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false)

  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

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

        {/* Main Layout */}
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-12">

          {/* Left: Content + Statistics */}
          <div className="flex flex-col">

            {/* Heading */}
            <div className="mb-5">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D9E1D9] bg-white px-4 py-2 text-xs font-bold tracking-widest text-[#237A50] dark:border-[#39483E] dark:bg-[#222D26] dark:text-[#75C99A]">
                <FiActivity size={14} />
                PLATFORM OVERVIEW
              </div>

              <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#17251D] dark:text-[#F1F5F0] sm:text-4xl">
                Your inventory,
                <span className="block text-[#237A50] dark:text-[#75C99A]">
                  at a glance.
                </span>
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-[#59675D] dark:text-[#B5C1B7] sm:text-base">
                Get a clear overview of your products, orders, and
                categories. Everything important, all in one place.
              </p>
            </div>

            {/* Compact Statistics Cards */}
            <div className="flex flex-1 flex-col justify-between gap-3">

              {statsConfig.map((item, index) => {
                const Icon = item.icon
                const isYellow = item.accent === 'yellow'

                return (
                  <motion.div
                    key={item.key}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, x: -18 }
                    }
                    animate={
                      isVisible && !shouldReduceMotion
                        ? { opacity: 1, x: 0 }
                        : undefined
                    }
                    transition={{
                      duration: 0.45,
                      delay: index * 0.12,
                    }}
                    className={`flex min-h-[68px] items-center justify-between rounded-2xl border px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 sm:px-5 ${
                      isYellow
                        ? 'border-[#E9DDAF] bg-gradient-to-r from-[#FFFDF4] via-[#FFF9E8] to-[#F8EECF] dark:border-[#665A35] dark:from-[#332F22] dark:via-[#302C20] dark:to-[#292719]'
                        : 'border-[#CFE2D3] bg-gradient-to-r from-[#F8FFF9] via-[#EFF8F0] to-[#DDEFE1] dark:border-[#3C5A46] dark:from-[#25352A] dark:via-[#223128] dark:to-[#1D2B23]'
                    }`}
                  >
                    <div className="flex items-center gap-3">

                      {/* Icon */}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          isYellow
                            ? 'bg-[#EABF45]/20 text-[#98700C] dark:text-[#F0CE70]'
                            : 'bg-[#237A50]/10 text-[#237A50] dark:text-[#75C99A]'
                        }`}
                      >
                        <Icon size={19} />
                      </div>

                      {/* Label + Number */}
                      <div>
                        <p className="text-xs font-medium text-[#59675D] dark:text-[#B5C1B7] sm:text-sm">
                          {item.label}
                        </p>

                        <div className="mt-0.5 text-2xl font-bold tracking-tight text-[#17251D] dark:text-[#F1F5F0]">
                          <CountUp
                            target={item.value}
                            active={isVisible}
                            shouldReduceMotion={shouldReduceMotion}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Activity Icon */}
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        isYellow
                          ? 'bg-[#EABF45]/15 text-[#98700C] dark:text-[#F0CE70]'
                          : 'bg-[#237A50]/10 text-[#237A50] dark:text-[#75C99A]'
                      }`}
                    >
                      <FiActivity size={16} />
                    </div>
                  </motion.div>
                )
              })}

            </div>
          </div>

          {/* Right: Statistics Image */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, scale: 0.96 }
            }
            animate={
              isVisible && !shouldReduceMotion
                ? { opacity: 1, scale: 1 }
                : undefined
            }
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-full min-h-[360px]"
          >
            <div className="relative h-full min-h-[360px] overflow-hidden rounded-3xl border border-[#D9E1D9] bg-white p-3 shadow-[0_12px_40px_rgba(23,37,29,0.08)] dark:border-[#39483E] dark:bg-[#222D26] dark:shadow-none sm:p-5">

              <Image
                src="/stats.png"
                alt="Inventory statistics and analytics graph"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-3 sm:p-5"
              />

            </div>

            <div className="absolute -bottom-5 -right-5 -z-10 h-32 w-32 rounded-full bg-[#EABF45]/20 blur-2xl" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}