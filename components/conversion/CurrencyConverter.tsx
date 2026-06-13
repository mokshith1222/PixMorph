'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import toast from 'react-hot-toast'

export function CurrencyConverter() {
  const [amount, setAmount] = useState('1')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [result, setResult] = useState<string | null>(null)
  const [rates, setRates] = useState<Record<string, number>>({})

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
        const data = await response.json()
        setRates(data.rates)
      } catch (error) {
        console.error('Failed to fetch rates:', error)
        toast.error('Failed to load exchange rates')
      }
    }
    fetchRates()
  }, [])

  const handleConvert = () => {
    if (!amount || !rates[fromCurrency] || !rates[toCurrency]) {
      toast.error('Please enter an amount and select currencies')
      return
    }

    const amountInUSD = parseFloat(amount) / rates[fromCurrency]
    const converted = amountInUSD * rates[toCurrency]
    setResult(`${parseFloat(amount)} ${fromCurrency} = ${converted.toFixed(2)} ${toCurrency}`)
  }

  const currencies = Object.keys(rates)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Amount</label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-950 dark:border-gray-700"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-950 dark:border-gray-700"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button onClick={handleConvert} className="w-full">
        Convert
      </Button>

      {result && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
          <p className="text-lg font-bold">{result}</p>
        </div>
      )}
    </div>
  )
}
