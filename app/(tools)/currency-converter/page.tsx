import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { DollarSign } from 'lucide-react'
import { CurrencyConverter } from '@/components/conversion/CurrencyConverter'

export const metadata: Metadata = {
  title: 'Currency Converter - Free Online Tool | PixMorph',
  description: 'Convert currencies with live exchange rates. Free online tool for currency conversion.',
}

export default function CurrencyConverterPage() {
  return (
    <ToolLayout
      title="Currency Converter"
      description="Convert currencies with live exchange rates"
      icon={<DollarSign className="w-6 h-6" />}
    >
      <CurrencyConverter />
    </ToolLayout>
  )
}
