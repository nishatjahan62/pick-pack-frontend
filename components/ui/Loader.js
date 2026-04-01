export default function Loader({ size = 'md', fullScreen = false }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        <div className={`${sizes[size]} border-2 border-green-200 border-t-green-500 rounded-full animate-spin`} />
      </div>
    )
  }

  return (
    <div className={`${sizes[size]} border-2 border-green-200 border-t-green-500 rounded-full animate-spin`} />
  )
}