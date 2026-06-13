'use client'

import { useCallback, useState } from 'react'
import { Upload, FileImage } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DropZoneProps {
  onFilesDrop: (files: File[]) => void
  className?: string
  accept?: string
  multiple?: boolean
}

export function DropZone({
  onFilesDrop,
  className,
  accept = '*/*',
  multiple = true,
}: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const files = Array.from(e.dataTransfer.files)
      onFilesDrop(files)
    },
    [onFilesDrop]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      onFilesDrop(files)
      e.target.value = ''
    },
    [onFilesDrop]
  )

  return (
    <div
      className={cn(
        'relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 cursor-pointer',
        isDragging
          ? 'border-primary-500 bg-primary-50/50 scale-[1.01]'
          : 'border-gray-300 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-gray-50 dark:hover:bg-gray-900/50',
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInput}
        className="absolute inset-0 cursor-pointer opacity-0"
      />

      <div className="flex flex-col items-center justify-center text-center">
        <div
          className={cn(
            'p-4 rounded-full mb-4 transition-colors',
            isDragging
              ? 'bg-primary-100 dark:bg-primary-900/30'
              : 'bg-gray-100 dark:bg-gray-800'
          )}
        >
          {isDragging ? (
            <FileImage className="w-10 h-10 text-primary-500 animate-pulse" />
          ) : (
            <Upload className="w-10 h-10 text-gray-500 dark:text-gray-400" />
          )}
        </div>

        <h3 className="text-lg font-semibold mb-1">Drop files here</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          or click to browse
        </p>
      </div>
    </div>
  )
}
