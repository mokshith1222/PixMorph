import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Table } from 'lucide-react'
import { PDFToExcel } from '@/components/conversion/PDFToExcel'

export const metadata: Metadata = {
  title: 'PDF to Excel - Free Online Tool | PixMorph',
  description: 'Convert PDF to Excel spreadsheets online for free. Extract tables and data from PDF files. Fast, free, and secure browser-based tool. Your files never...',
  alternates: { canonical: '/pdf-to-excel' }
}

export default function PdfToExcelPage() {
  return (
    <ToolLayout title="PDF to Excel" description="Convert PDF to Excel" icon={<Table className="w-6 h-6" />}>
      <PDFToExcel />
    </ToolLayout>
  )
}