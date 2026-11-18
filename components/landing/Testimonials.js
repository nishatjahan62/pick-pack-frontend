
'use client'

import { FiStar } from 'react-icons/fi'
import { motion, useReducedMotion } from 'framer-motion'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'

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
  {
    name: 'Farhana Rahman',
    role: 'Retail Business Owner, Rajshahi',
    avatar: 'F',
    color: 'bg-yellow-100 text-yellow-900 dark:bg-yellow-400/15 dark:text-yellow-200',
    rating: 5,
    comment:
      'Managing multiple products is now much easier. The organized dashboard saves me valuable time.',
  },
  {
    name: 'Mahmud Hasan',
    role: 'Online Store Owner, Khulna',
    avatar: 'M',
    color: 'bg-green-100 text-green-800 dark:bg-green-400/15 dark:text-green-300',
    rating: 5,
    comment:
      'I can track orders and stock levels from one place. It makes my daily business operations much smoother.',
  },
]

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="overflow-hidden rounded-2xl bg-[#F5F7F3] px-4 py-20 transition-colors duration-300 dark:bg-[#171F1B] sm:px-8 sm:py-24">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex rounded-full border border-[#CFE2D3] bg-[#EFF8F0] px-4 py-2 text-xs font-bold tracking-widest text-[#237A50] dark:border-[#3C5A46] dark:bg-[#25352A] dark:text-[#75C99A]">
            COMMUNITY STORIES
          </div>

          <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#17251D] dark:text-[#F1F5F0] sm:text-4xl">
            Loved by{' '}
            <span className="text-[#237A50] dark:text-[#75C99A]">
              inventory managers
            </span>
          </h2>

          <p className="mx-auto max-w-md text-sm leading-7 text-[#59675D] dark:text-[#B5C1B7] sm:text-base">
            Real feedback from people who use pick&pack every day.
          </p>
        </motion.div>

        {/* Moving Testimonial Cards */}
        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          effect="coverflow"
          centeredSlides
          grabCursor
          loop
          speed={800}
          autoplay={
            shouldReduceMotion
              ? false
              : {
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
          }
          slidesPerView={1.1}
          spaceBetween={15}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 120,
            modifier: 2,
            slideShadows: false,
          }}
          className="!overflow-visible !pb-8"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.name} className="h-auto">
              <div className="flex h-full min-h-[280px] flex-col rounded-2xl border border-[#D9E1D9] bg-white p-6 shadow-sm transition-colors duration-300 dark:border-[#39483E] dark:bg-[#222D26] sm:p-8">

                {/* Stars */}
                <div
                  className="mb-5 flex items-center gap-1"
                  role="img"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <FiStar
                      key={j}
                      size={16}
                      className="fill-[#EABF45] text-[#D5A92E]"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="mb-8 flex-1 text-sm leading-7 text-[#59675D] dark:text-[#D0D9D1] sm:text-base">
                  &ldquo;{t.comment}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-[#E3E9E3] pt-5 dark:border-[#39483E]">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${t.color}`}
                  >
                    {t.avatar}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#17251D] dark:text-[#F1F5F0]">
                      {t.name}
                    </p>

                    <p className="mt-1 text-xs text-[#718075] dark:text-[#AAB8AC]">
                      {t.role}
                    </p>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  )
}