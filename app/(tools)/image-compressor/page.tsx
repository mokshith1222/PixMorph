import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Zap } from 'lucide-react'
import { ImageCompressor } from '@/components/conversion/ImageCompressor'

export const metadata: Metadata = {
  title: 'Image Compressor - Free Online Tool | PixMorph',
  description: 'Compress images online for free. Reduce file size without losing quality using our fast image compressor. Fast, free, and secure browser-based tool. Your...',
  alternates: { canonical: '/image-compressor' }
}

export default function ImageCompressorPage() {
  return (
    <ToolLayout title="Image Compressor" description="Compress images" icon={<Zap className="w-6 h-6" />}>
      <ImageCompressor />
    </ToolLayout>
  )
}