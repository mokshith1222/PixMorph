'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

type UnitCategory = 'length' | 'weight' | 'temperature' | 'volume'

interface Unit {
  label: string
  value: string
  toBase: (val: number) => number
  fromBase: (val: number) => number
}

const unitData: Record<UnitCategory, Unit[]> = {
  length: [
    { label: 'Meters', value: 'm', toBase: (v) => v, fromBase: (v) => v },
    { label: 'Kilometers', value: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { label: 'Centimeters', value: 'cm', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    { label: 'Millimeters', value: 'mm', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { label: 'Miles', value: 'mi', toBase: (v) => v * 1609.34, fromBase: (v) => v / 1609.34 },
    { label: 'Yards', value: 'yd', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
    { label: 'Feet', value: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    { label: 'Inches', value: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
  ],
  weight: [
    { label: 'Kilograms', value: 'kg', toBase: (v) => v, fromBase: (v) => v },
    { label: 'Grams', value: 'g', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { label: 'Pounds', value: 'lb', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    { label: 'Ounces', value: 'oz', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
  ],
  temperature: [
    { label: 'Celsius', value: 'c', toBase: (v) => v, fromBase: (v) => v },
    { label: 'Fahrenheit', value: 'f', toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => v * (9 / 5) + 32 },
    { label: 'Kelvin', value: 'k', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  ],
  volume: [
    { label: 'Liters', value: 'l', toBase: (v) => v, fromBase: (v) => v },
    { label: 'Milliliters', value: 'ml', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { label: 'Gallons', value: 'gal', toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
    { label: 'Quarts', value: 'qt', toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
  ],
}

export function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>('length')
  const [fromUnit, setFromUnit] = useState('m')
  const [toUnit, setToUnit] = useState('km')
  const [value, setValue] = useState('1')
  const [result, setResult] = useState<string | null>(null)

  const handleConvert = () => {
    const units = unitData[category]
    const from = units.find((u) => u.value === fromUnit)
    const to = units.find((u) => u.value === toUnit)

    if (!from || !to || !value) return

    const numValue = parseFloat(value)
    const inBase = from.toBase(numValue)
    const converted = to.fromBase(inBase)

    setResult(`${numValue} ${from.label} = ${converted.toFixed(4)} ${to.label}`)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as UnitCategory)}
          className="w-full p-2 border rounded-lg dark:bg-gray-950 dark:border-gray-700"
        >
          <option value="length">Length</option>
          <option value="weight">Weight</option>
          <option value="temperature">Temperature</option>
          <option value="volume">Volume</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Value</label>
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">From</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-950 dark:border-gray-700"
          >
            {unitData[category].map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">To</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-950 dark:border-gray-700"
          >
            {unitData[category].map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
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
