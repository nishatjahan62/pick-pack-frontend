import StatsCard from './StatsCard'
import RevenueChart from './RevenueChart'
import { FiShoppingBag, FiCreditCard, FiClock } from 'react-icons/fi'

export default function UserDashboard({ stats, user }) {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="My Orders" value={stats.myOrders} icon={FiShoppingBag} color="bg-green-600" />
        <StatsCard title="Total Spent" value={`৳${stats.mySpent}`} icon={FiCreditCard} color="bg-blue-500" />
        <StatsCard title="Pending" value={stats.pending || 0} icon={FiClock} color="bg-yellow-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <RevenueChart /> {/* চার্টের ভেতরেই "My Spending Flow" টাইটেল আছে */}
        </div>
      </div>
    </div>
  )
}