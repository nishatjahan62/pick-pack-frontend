'use client'

export default function Input({
  label,
  error,
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
        )}
        <input
          className={`w-full ${Icon ? 'pl-9' : 'pl-3'} pr-4 py-2.5 rounded-xl border text-sm outline-none transition
            ${error
              ? 'border-red-400 dark:border-red-500 focus:border-red-400 dark:focus:border-red-500 bg-red-50 dark:bg-red-900/20 text-gray-900 dark:text-gray-100'
              : 'border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'
            } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}