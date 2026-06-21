import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Ruler } from 'lucide-react'
import { UnitConverter } from '@/components/conversion/UnitConverter'

export const metadata: Metadata = {
  title: 'Unit Converter - Free Online Tool | PixMorph',
  description: 'Convert units of measurement including length, weight, temperature, and more. Fast, free, and secure browser-based tool. Your files never leave your device.',
  alternates: { canonical: '/unit-converter' }
}

export default function UnitConverterPage() {
  return (
    <ToolLayout
      title="Unit Converter"
      description="Convert units of measurement"
      icon={<Ruler className="w-6 h-6" />}
    >
      <UnitConverter />
    </ToolLayout>
  )
}
