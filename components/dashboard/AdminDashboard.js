import StatsCard from './StatsCard'
import RevenueChart from './RevenueChart'
import ActivityFeed from './ActivityFeed'
import { FiBox, FiTrendingUp, FiShoppingBag, FiUsers } from 'react-icons/fi'

export default function AdminDashboard({ stats, revenue, logs }) {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Products" value={stats?.products} icon={FiBox} color="bg-green-600" />
        <StatsCard title="Revenue" value={`৳${stats?.revenue || 0}`} icon={FiTrendingUp} color="bg-yellow-400" />
<StatsCard title="Total Orders" value={stats?.orders || 0} icon={FiShoppingBag} color="bg-blue-500" />
        <StatsCard title="Total Users" value={stats?.users} icon={FiUsers} color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RevenueChart data={revenue} />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed logs={logs} />
        </div>
      </div>
    </div>
  )
}