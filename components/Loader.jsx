export default function Loader({ size = 'md', fullScreen = false }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50">
        <div className="text-center">
          <div className={`${sizeClasses[size]} border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4`}></div>
          <p className="text-white text-lg font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div className={`${sizeClasses[size]} border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin`}></div>
    </div>
  )
}




