import { FiPackage, FiShoppingCart, FiAlertCircle, FiBarChart2, FiRefreshCw, FiShield } from 'react-icons/fi'

const features = [
  {
    icon: FiPackage,
    title: 'Product Management',
    desc: 'Add, update, and track all your products with stock levels and categories.',
    color: 'bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400',
  },
  {
    icon: FiShoppingCart,
    title: 'Order Management',
    desc: 'Create and manage orders with auto stock deduction and status tracking.',
    color: 'bg-yellow-50 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-400',
  },
  {
    icon: FiAlertCircle,
    title: 'Low Stock Alerts',
    desc: 'Get notified automatically when products fall below minimum threshold.',
    color: 'bg-red-50 dark:bg-red-950/40 text-red-500 dark:text-red-400',
  },
  {
    icon: FiRefreshCw,
    title: 'Restock Queue',
    desc: 'Priority-based restock queue so you never run out of important items.',
    color: 'bg-blue-50 dark:bg-blue-950/40 text-blue-500 dark:text-blue-400',
  },
  {
    icon: FiBarChart2,
    title: 'Dashboard & Analytics',
    desc: 'Real-time insights on orders, revenue, and inventory at a glance.',
    color: 'bg-purple-50 dark:bg-purple-950/40 text-purple-500 dark:text-purple-400',
  },
  {
    icon: FiShield,
    title: 'Role Based Access',
    desc: 'Admin and manager roles with different levels of access and control.',
    color: 'bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-gray-50 dark:bg-gray-700 transition-colors">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-400 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            Everything you need
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Built for speed &{' '}
            <span className="text-green-500 dark:text-green-400">accuracy</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
            From product setup to order fulfillment — pick&pack handles it all in one place.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:border-green-200 dark:hover:border-green-800 hover:shadow-md transition-all duration-300 group"
              >
                <div className={`w-11 h-11 ${f.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}