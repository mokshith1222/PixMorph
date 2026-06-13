'use client'

interface ProgressBarProps {
  progress: number
  className?: string
}

export function ProgressBar({ progress, className = '' }: ProgressBarProps) {
  return (
    <div
      className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 ${className}`}
    >
      <div
        className="bg-primary-600 h-2.5 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${Math.min(100, progress)}%` }}
      />
    </div>
  )
}
