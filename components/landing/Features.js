
import {
  FiPackage,
  FiShoppingCart,
  FiAlertCircle,
  FiBarChart2,
  FiRefreshCw,
  FiShield,
  FiArrowUpRight,
} from 'react-icons/fi'

const features = [
  {
    icon: FiPackage,
    number: '01',
    title: 'Product Management',
    desc: 'Organize products, manage categories, and monitor inventory levels from one place.',
  },
  {
    icon: FiShoppingCart,
    number: '02',
    title: 'Order Management',
    desc: 'Create orders, automate stock deduction, and keep every order on track.',
  },
  {
    icon: FiAlertCircle,
    number: '03',
    title: 'Low Stock Alerts',
    desc: 'Stay ahead of shortages with automatic alerts when inventory runs low.',
  },
  {
    icon: FiRefreshCw,
    number: '04',
    title: 'Smart Restocking',
    desc: 'Prioritize essential products with an organized and efficient restock queue.',
  },
  {
    icon: FiBarChart2,
    number: '05',
    title: 'Analytics & Insights',
    desc: 'Understand revenue, orders, and inventory with real-time business insights.',
  },
  {
    icon: FiShield,
    number: '06',
    title: 'Role Based Access',
    desc: 'Manage permissions with separate admin and manager access levels.',
  },
]

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#fafbf9] px-6 py-24 transition-colors dark:bg-gray-950 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">

        {/* Section heading */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">

          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold tracking-wide text-green-800 dark:border-green-900 dark:bg-green-950/50 dark:text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              WHAT WE OFFER
            </div>

            <h2 className="text-4xl font-bold leading-[1.15] tracking-tight text-gray-950 dark:text-white sm:text-5xl">
              Everything in sync.
              <br />
              <span className="text-green-600 dark:text-green-400">
                Nothing overlooked.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-gray-500 dark:text-gray-400 md:pb-1">
            Powerful tools to simplify your inventory,
            streamline operations, and keep your business
            moving forward.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {features.map(({ icon: Icon, number, title, desc }) => (
            <article
              key={number}
              className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl hover:shadow-green-950/[0.05] dark:border-gray-800 dark:bg-gray-900 dark:hover:border-green-800 sm:p-8"
            >
              {/* Top row */}
              <div className="mb-10 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white dark:bg-green-950 dark:text-green-400 dark:group-hover:bg-green-500 dark:group-hover:text-white">
                  <Icon size={21} strokeWidth={1.7} />
                </div>

                <span className="text-xs font-medium tracking-widest text-gray-300 dark:text-gray-600">
                  {number}
                </span>
              </div>

              {/* Content */}
              <h3 className="mb-3 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                {title}
              </h3>

              <p className="text-sm leading-7 text-gray-500 dark:text-gray-400">
                {desc}
              </p>

              {/* Hover indicator */}
              <div className="mt-7 flex items-center justify-between">
                <div className="h-px w-10 bg-gray-200 transition-all duration-300 group-hover:w-16 group-hover:bg-green-500 dark:bg-gray-700" />

                <FiArrowUpRight
                  size={18}
                  className="text-gray-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-green-600 dark:group-hover:text-green-400"
                />
              </div>
            </article>
          ))}

        </div>

        {/* Bottom note */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-gray-200 pt-6 dark:border-gray-800 sm:flex-row sm:items-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Designed to make inventory management effortless.
          </p>

          <span className="text-xs font-medium tracking-wide text-green-700 dark:text-green-400">
            SIMPLE. SMART. EFFICIENT.
          </span>
        </div>

      </div>
    </section>
  )
}
