import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Database } from 'lucide-react'
import { SQLFormatter } from '@/components/conversion/SQLFormatter'

export const metadata: Metadata = {
  title: 'SQL Formatter - Free Online Tool | PixMorph',
  description: 'Format SQL queries online for free. Beautify and organize your SQL code for better readability. Fast, free, and secure browser-based tool. Your files never...',
  alternates: { canonical: '/sql-formatter' }
}

export default function SqlFormatterPage() {
  return (
    <ToolLayout title="SQL Formatter" description="Format SQL queries" icon={<Database className="w-6 h-6" />}>
      <SQLFormatter />
    </ToolLayout>
  )
}