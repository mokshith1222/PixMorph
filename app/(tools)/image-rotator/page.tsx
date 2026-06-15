import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { RotateCw } from 'lucide-react'
import { ImageRotator } from '@/components/conversion/ImageRotator'

export const metadata: Metadata = {
  title: 'Image Rotator - Free Online Tool | PixMorph',
  description: 'Rotate images online for free. Flip and rotate images 90, 180, or 270 degrees instantly. Fast, free, and secure browser-based tool. Your files never leave...',
}

export default function ImageRotatorPage() {
  return (
    <ToolLayout title="Image Rotator" description="Rotate images" icon={<RotateCw className="w-6 h-6" />}>
      <ImageRotator />
    </ToolLayout>
  )
}