'use client'
import { BarChart } from '@mui/x-charts/BarChart'
import { useAuth } from '@/context/AuthContext'

export default function RevenueChart({ data = [], loading = false }) {
  const { user } = useAuth()

  // শুধু যদি একদম খালি অ্যারে আসে তাহলে মেসেজ দেখাবে
  const hasAnyData = data && data.length > 0;

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-50">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
            <div className="w-1.5 h-6 bg-green-500 rounded-full"></div>
            {user?.role === 'admin' ? 'Sales Flow' : 'My Spending Flow'}
          </h2>
        </div>
      </div>

      <div className="h-72 w-full relative">
        {/* No data message শুধু যদি কোনো ডেটাই না আসে */}
        {!hasAnyData && !loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/70 backdrop-blur-sm rounded-[2rem]">
            <p className="text-gray-400 font-bold text-sm bg-gray-50 px-5 py-2.5 rounded-full border border-gray-100">
              No data available
            </p>
          </div>
        )}

        <BarChart
          dataset={data || []}
          xAxis={[{
            scaleType: 'band',
            dataKey: 'day',
            tickLabelStyle: { 
              fill: '#9CA3AF', 
              fontSize: 13, 
              fontWeight: 700 
            }
          }]}
          series={[{
            dataKey: 'revenue',
            color: user?.role === 'admin' ? '#16A34A' : '#EAB308',
            borderRadius: 6,
            valueFormatter: (v) => `৳${v || 0}`,
            // 0 value এর জন্যও ছোট করে বার দেখাবে
            minBarSize: 3,     
          }]}
          height={300}
          margin={{ top: 20, bottom: 60, left: 70, right: 25 }}   // bottom বাড়ালাম লেবেলের জন্য
          slotProps={{ 
            legend: { hidden: true },
            // yAxis এর min 0 রাখা
          }}
          yAxis={[{
            min: 0,
          }]}
        />
      </div>
    </div>
  )
}