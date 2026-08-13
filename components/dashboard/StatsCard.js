export default function StatsCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] shadow-xl shadow-gray-100 dark:shadow-none border border-gray-50 dark:border-gray-800 flex items-center gap-5 transition-transform hover:scale-[1.02] transition-colors">
      <div className={`${color} p-4 rounded-2xl text-white shadow-lg`}><Icon size={24} /></div>
      <div>
        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{title}</p>
        <p className="text-2xl font-black text-gray-800 dark:text-gray-100 leading-none mt-1">{value}</p>
      </div>
    </div>
  )
}