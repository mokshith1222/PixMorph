import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Palette } from 'lucide-react'
import { ImageColorExtractor } from '@/components/conversion/ImageColorExtractor'

export const metadata: Metadata = {
  title: 'Image Color Extractor - Free Online Tool | PixMorph',
  description: 'Extract dominant color palettes from any image online for free. Click to copy hex codes. Fast, free, and secure browser-based tool. Your files never leave...',
  alternates: { canonical: '/image-color-extractor' }
}

export default function ImageColorExtractorPage() {
  return (
    <ToolLayout title="Image Color Extractor" description="Extract dominant color palettes from any image" icon={<Palette className="w-6 h-6" />}>
      <ImageColorExtractor />
    </ToolLayout>
  )
}
