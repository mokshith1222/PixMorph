'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Copy, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

export function PasswordGenerator() {
  const [length, setLength] = useState<number>(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password, setPassword] = useState('')

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

    let chars = ''
    if (includeUppercase) chars += uppercase
    if (includeLowercase) chars += lowercase
    if (includeNumbers) chars += numbers
    if (includeSymbols) chars += symbols

    if (chars === '') {
      toast.error('Please select at least one character type')
      return
    }

    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(result)
  }

  const handleCopy = () => {
    if (password) {
      void navigator.clipboard.writeText(password)
      toast.success('Password copied to clipboard!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Password Length ({length})</label>
        <Input
          type="range"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          min="8"
          max="64"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Options</label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
            <span className="text-sm">Include Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
            />
            <span className="text-sm">Include Lowercase (a-z)</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            <span className="text-sm">Include Numbers (0-9)</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            <span className="text-sm">Include Symbols (!@#$%...)</span>
          </label>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={generatePassword} className="flex-1">
          <RefreshCw className="w-4 h-4 mr-2" />
          Generate
        </Button>
      </div>

      {password && (
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
            <code className="text-lg font-mono break-all">{password}</code>
            <Button onClick={handleCopy} variant="ghost" size="sm">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <div className="text-sm text-gray-500">
            <p>
              Password strength:{' '}
              {length >= 16 && includeUppercase && includeLowercase && includeNumbers && includeSymbols
                ? '🔒 Strong'
                : length >= 12
                  ? '🔐 Medium'
                  : '⚠️ Weak'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
