import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { FlipHorizontal } from 'lucide-react'
import { ImageMirror } from '@/components/conversion/ImageMirror'

export const metadata: Metadata = {
  title: 'Image Mirror - Free Online Tool | PixMorph',
  description: 'Mirror your image horizontally or vertically online for free. Fast, free, and secure browser-based tool. Your files never leave your device. All processing ...',
  alternates: { canonical: '/image-mirror' }
}

export default function ImageMirrorPage() {
  return (
    <ToolLayout title="Image Mirror" description="Mirror your image horizontally or vertically" icon={<FlipHorizontal className="w-6 h-6" />}>
      <ImageMirror />
    </ToolLayout>
  )
}
