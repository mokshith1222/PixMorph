import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { ImageIcon } from 'lucide-react'
import { HeicConverter } from '@/components/conversion/HeicConverter'

export const metadata: Metadata = {
  title: 'HEIC to WebP - Free Online Tool | PixMorph',
  description: 'Convert HEIC images to WebP format online for free. Smaller file sizes with excellent image quality. Fast, free, and secure browser-based tool. Your files...',
  alternates: { canonical: '/heic-to-webp' }
}

export default function HeicToWebpPage() {
  return (
    <ToolLayout title="HEIC to WebP" description="Convert HEIC to WebP" icon={<ImageIcon className="w-6 h-6" />}>
      <HeicConverter targetFormat="webp" />
    </ToolLayout>
  )
}