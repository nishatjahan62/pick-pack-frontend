'use client'

import { FiBox, FiCheckCircle, FiRefreshCw, FiAlertTriangle } from 'react-icons/fi'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50/50 py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            About <span className="text-green-600">pick</span><span className="text-yellow-400">&</span><span className="text-green-600">pack</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Welcome to the Smart Inventory & Order Management System. This platform is designed to seamlessly manage products, track live stock levels, handle customer orders, and optimize fulfillment workflows with zero conflicts.
          </p>
        </div>

        {/* Project Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
              <FiBox size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Smart Inventory Control</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Manually add products, set minimum stock thresholds, and watch the system dynamically flag low-stock items. When an order is placed, stock is automatically deducted.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center mb-4">
              <FiRefreshCw size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Automated Restock Queue</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Never run out of bestsellers. Items that fall below their threshold automatically drop into a prioritized Restock Queue, ensuring zero downtime for your business.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <FiCheckCircle size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Smooth Order Workflow</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              From Pending to Delivered, manage the complete lifecycle of customer orders. The app handles auto-pricing calculation and stock management in the background.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4">
              <FiAlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Conflict Prevention</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Built-in validation checks stop duplicate entries in a single order and prevent users from purchasing items that are out of stock or inactive.
            </p>
          </div>
        </div>

        {/* Tech Stack or Goal Section */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 text-center shadow-sm">
          <span className="text-xs uppercase font-bold tracking-wider text-green-600 mb-2 block">Our Goal</span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Simplifying Supply Chain for Creators</h2>
          <p className="text-gray-500 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
            This project was developed to answer the growing need for organized warehousing and logistics tracking. By merging an Activity Log to track real-time operations with an intuitive Dashboard, we bring full warehouse transparency to your fingertips.
          </p>
          <div className="mt-8 flex justify-center gap-4 text-sm font-medium">
            <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-600">Secure Auth</span>
            <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-600">Analytics Ready</span>
            <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-600">Live Deployment</span>
          </div>
        </div>
      </div>
    </main>
  )
}