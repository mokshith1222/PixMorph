import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Minimize } from 'lucide-react'
import { SQLMinifier } from '@/components/conversion/SQLMinifier'

export const metadata: Metadata = {
  title: 'SQL Minifier - Free Online Tool | PixMorph',
  description: 'Minify SQL queries online for free. Compress SQL code by removing unnecessary whitespace. Fast, free, and secure browser-based tool. Your files never leave...',
}

export default function SqlMinifierPage() {
  return (
    <ToolLayout title="SQL Minifier" description="Minify SQL queries" icon={<Minimize className="w-6 h-6" />}>
      <SQLMinifier />
    </ToolLayout>
  )
}