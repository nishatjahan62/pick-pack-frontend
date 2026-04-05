"use client"
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import StatsCard from '@/components/dashboard/StatsCard';

import { FiShoppingBag, FiCreditCard, FiClock, FiCheckCircle, FiCalendar } from 'react-icons/fi'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

export default function UserDashboard({ stats, user, logs, chartData }) {
  
  const COLORS = ['#EAB308', '#22C55E', '#3B82F6', '#EF4444'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, <span className="text-green-600">{user?.name}</span> 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">Here is your personal order summary.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatsCard title="Total Orders" value={stats.myOrders} icon={FiShoppingBag} color="bg-green-600" />
        <StatsCard title="Today's Orders" value={stats.myTodayOrders} icon={FiCalendar} color="bg-blue-500" />
        <StatsCard title="Pending" value={stats.myPending} icon={FiClock} color="bg-yellow-500" />
        <StatsCard title="Delivered" value={stats.myDelivered} icon={FiCheckCircle} color="bg-green-500" />
        <StatsCard title="Total Spent" value={`৳${stats.mySpent?.toLocaleString()}`} icon={FiCreditCard} color="bg-purple-500" />
      </div>

      {/* Charts & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Order Status Pie Chart */}
        <div className="lg:col-span-1 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Order Status Distribution</h3>
          <div className="h-[300px] w-full">
            {chartData && chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">No data available</div>
            )}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <ActivityFeed logs={logs} title="My Recent Activity" />
        </div>

      </div>
    </div>
  )
}