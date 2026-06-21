import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { ImageIcon } from 'lucide-react'
import { HeicConverter } from '@/components/conversion/HeicConverter'

export const metadata: Metadata = {
  title: 'HEIC to AVIF - Free Online Tool | PixMorph',
  description: 'Convert HEIC images to AVIF format online for free. Next-generation compression for smaller, high-quality images. Fast, free, and secure browser-based...',
  alternates: { canonical: '/heic-to-avif' }
}

export default function HeicToAvifPage() {
  return (
    <ToolLayout title="HEIC to AVIF" description="Convert HEIC to AVIF" icon={<ImageIcon className="w-6 h-6" />}>
      <HeicConverter targetFormat="avif" />
    </ToolLayout>
  )
}