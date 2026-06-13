'use client'

import { X, FileImage } from 'lucide-react'
import { Button } from './Button'
import { formatFileSize } from '@/lib/utils'

interface FileListProps {
  files: File[]
  onRemove: (index: number) => void
  converting?: boolean
}

export function FileList({ files, onRemove, converting = false }: FileListProps) {
  if (files.length === 0) return null

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500 dark:text-gray-400">
          {files.length} file{files.length !== 1 ? 's' : ''} selected
        </span>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20">
                <FileImage className="w-4 h-4 text-primary-500" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate max-w-[150px] sm:max-w-[300px]">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(index)}
              disabled={converting}
              className="text-gray-400 hover:text-red-500 hover:bg-red-50"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
