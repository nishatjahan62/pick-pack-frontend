import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

export default function CTA() {
  return (
    <section className="bg-gray-50 px-6 py-16 transition-colors dark:bg-gray-950 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-green-700 px-6 py-12 text-center shadow-xl shadow-green-950/10 dark:bg-green-900 sm:px-12 sm:py-16">
          <div className="relative z-10 mx-auto max-w-2xl">
            <div className="mb-6 inline-flex rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white">
              Get started today
            </div>

            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to take control <br /> of your inventory?
            </h2>

            <p className="mx-auto mb-8 max-w-md text-sm leading-6 text-green-50 sm:text-base">
              Join now and start managing your products, orders, and stock levels the smart way.
            </p>

            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/signup"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-green-800 shadow-sm transition hover:bg-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
              >
                Create Free Account <FiArrowRight size={16} />
              </Link>
              <Link
                href="/login"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/35 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
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