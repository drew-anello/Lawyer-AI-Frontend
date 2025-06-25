import React from 'react'

const LoadingOverlay: React.FC = () => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur flex flex-col items-center justify-center z-50">
    <div className="w-20 h-20 border-4 border-white/20 border-t-purple-500 rounded-full animate-spin" />
    <p className="mt-4 text-xl text-gray-200">Generating...</p>
  </div>
)

export default LoadingOverlay 