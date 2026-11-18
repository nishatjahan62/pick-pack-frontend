
'use client'

import {
  FiUserPlus,
  FiPackage,
  FiShoppingCart,
  FiArrowRight,
} from 'react-icons/fi'
import { motion, useReducedMotion } from 'framer-motion'

const steps = [
  {
    step: '01',
    title: 'Create your account',
    desc: 'Sign up in seconds and get access to your inventory dashboard. No complicated setup required.',
    detail: 'Quick registration',
    icon: FiUserPlus,
    accent: 'green',
  },
  {
    step: '02',
    title: 'Add your products',
    desc: 'Organize your products with categories, prices, stock quantities, and minimum stock thresholds.',
    detail: 'Organized inventory',
    icon: FiPackage,
    accent: 'yellow',
  },
  {
    step: '03',
    title: 'Manage your orders',
    desc: 'Create and track orders while inventory quantities update automatically as orders are processed.',
    detail: 'Simplified operations',
    icon: FiShoppingCart,
    accent: 'green',
  },
]

export default function HowItWorks() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#F5F7F3] px-6 py-24 transition-colors duration-300 dark:bg-[#171F1B] sm:py-28"
    >
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E9DDAF] bg-[#FFF9E8] px-4 py-2 text-xs font-bold tracking-widest text-[#98700C] dark:border-[#665A35] dark:bg-[#332F22] dark:text-[#F0CE70]">
            HOW IT WORKS
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-[#17251D] dark:text-[#F1F5F0] sm:text-4xl lg:text-5xl">
            From setup to success,
            <span className="block text-[#237A50] dark:text-[#75C99A]">
              in three simple steps.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#59675D] dark:text-[#B5C1B7] sm:text-base">
            Everything you need to start managing your inventory,
            without the complexity.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Desktop connecting line */}
          <div
            aria-hidden="true"
            className="absolute left-[16.66%] right-[16.66%] top-[38px] hidden h-px bg-gradient-to-r from-[#237A50]/30 via-[#EABF45] to-[#237A50]/30 md:block"
          />

          <div className="grid gap-12 md:grid-cols-3 md:gap-8">

            {steps.map((item, index) => {
              const Icon = item.icon
              const isYellow = item.accent === 'yellow'

              return (
                <motion.div
                  key={item.step}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 24 }
                  }
                  whileInView={
                    shouldReduceMotion
                      ? undefined
                      : { opacity: 1, y: 0 }
                  }
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.15,
                  }}
                  className="relative"
                >

                  {/* Step icon */}
                  <div className="relative z-10 mb-8 flex items-center justify-center md:justify-start">
                    <div
                      className={`flex h-[76px] w-[76px] items-center justify-center rounded-2xl border-4 border-[#F5F7F3] shadow-md dark:border-[#171F1B] ${
                        isYellow
                          ? 'bg-[#EABF45] text-[#49370B]'
                          : 'bg-[#237A50] text-white dark:bg-[#75C99A] dark:text-[#17251D]'
                      }`}
                    >
                      <Icon size={28} strokeWidth={1.8} />
                    </div>

                    <span className="ml-4 text-sm font-bold tracking-[0.18em] text-[#718075] dark:text-[#849287] md:hidden">
                      STEP {item.step}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative min-h-[220px] overflow-hidden rounded-2xl border border-[#D9E1D9] bg-white p-7 transition-all duration-300 hover:border-[#237A50]/40 hover:shadow-lg hover:shadow-[#17251D]/5 dark:border-[#39483E] dark:bg-[#222D26] dark:hover:border-[#75C99A]/40 sm:p-8">

                    {/* Large background number */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-1 -top-8 text-[110px] font-black leading-none tracking-tighter text-[#237A50]/[0.055] dark:text-[#75C99A]/[0.07]"
                    >
                      {item.step}
                    </span>

                    <div className="relative">

                      <div className="mb-5 hidden text-xs font-bold tracking-[0.18em] text-[#718075] dark:text-[#849287] md:block">
                        STEP {item.step}
                      </div>

                      <h3 className="max-w-[230px] text-xl font-bold tracking-tight text-[#17251D] dark:text-[#F1F5F0]">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-[#59675D] dark:text-[#B5C1B7]">
                        {item.desc}
                      </p>

                      <div className="mt-7 flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            isYellow
                              ? 'bg-[#EABF45]'
                              : 'bg-[#237A50] dark:bg-[#75C99A]'
                          }`}
                        />

                        <span className="text-xs font-semibold text-[#59675D] dark:text-[#B5C1B7]">
                          {item.detail}
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Mobile connecting line */}
                  {index !== steps.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="absolute -bottom-10 left-[37px] h-8 w-px bg-gradient-to-b from-[#237A50]/50 to-[#EABF45]/50 md:hidden"
                    />
                  )}

                </motion.div>
              )
            })}

          </div>
        </div>

        {/* Bottom message */}
        <div className="mt-16 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <span className="text-sm font-medium text-[#59675D] dark:text-[#B5C1B7]">
            That&apos;s all it takes to get started.
          </span>

          <span className="flex items-center gap-2 text-sm font-bold text-[#237A50] dark:text-[#75C99A]">
            Simple. Organized. Efficient.
            <FiArrowRight size={16} />
          </span>
        </div>

      </div>
    </section>
  )
}
