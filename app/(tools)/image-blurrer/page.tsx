import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Layers } from 'lucide-react'
import { ImageBlurrer } from '@/components/conversion/ImageBlurrer'

export const metadata: Metadata = {
  title: 'Image Blur Tool - Free Online Tool | PixMorph',
  description: 'Apply Gaussian blur to your images online for free. Adjust intensity with a simple slider. Fast, free, and secure browser-based tool. Your files never...',
  alternates: { canonical: '/image-blurrer' }
}

export default function ImageBlurrerPage() {
  return (
    <ToolLayout title="Image Blurrer" description="Apply a blur effect to your image with adjustable intensity" icon={<Layers className="w-6 h-6" />}>
      <ImageBlurrer />
    </ToolLayout>
  )
}
