'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Copy, RefreshCw } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'

export function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState<number>(1)

  const generateUUIDs = () => {
    const newUUIDs: string[] = []
    for (let i = 0; i < count; i++) {
      newUUIDs.push(uuidv4())
    }
    setUuids(newUUIDs)
    toast.success(`Generated ${count} UUID(s)!`)
  }

  const handleCopy = (text: string) => {
    void navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const handleCopyAll = () => {
    const all = uuids.join('\n')
    void navigator.clipboard.writeText(all)
    toast.success('All UUIDs copied!')
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Number of UUIDs</label>
        <div className="flex gap-2">
          <Button onClick={() => setCount(1)} variant={count === 1 ? 'primary' : 'secondary'} size="sm">
            1
          </Button>
          <Button onClick={() => setCount(5)} variant={count === 5 ? 'primary' : 'secondary'} size="sm">
            5
          </Button>
          <Button onClick={() => setCount(10)} variant={count === 10 ? 'primary' : 'secondary'} size="sm">
            10
          </Button>
          <Button onClick={() => setCount(50)} variant={count === 50 ? 'primary' : 'secondary'} size="sm">
            50
          </Button>
        </div>
      </div>

      <Button onClick={generateUUIDs} className="w-full">
        <RefreshCw className="w-4 h-4 mr-2" />
        Generate UUIDs
      </Button>

      {uuids.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{uuids.length} UUID(s) generated</span>
            <Button onClick={handleCopyAll} variant="secondary" size="sm">
              <Copy className="w-4 h-4 mr-2" />
              Copy All
            </Button>
          </div>
          <div className="space-y-2">
            {uuids.map((uuid, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <code className="font-mono text-sm">{uuid}</code>
                <Button onClick={() => handleCopy(uuid)} variant="ghost" size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
