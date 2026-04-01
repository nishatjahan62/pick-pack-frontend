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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        )}
        <input
          className={`w-full ${Icon ? 'pl-9' : 'pl-3'} pr-4 py-2.5 rounded-xl border text-sm outline-none transition
            ${error
              ? 'border-red-400 focus:border-red-400 bg-red-50'
              : 'border-gray-200 focus:border-green-500 bg-white'
            } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}