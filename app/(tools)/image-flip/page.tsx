import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { ArrowUpDown } from 'lucide-react'
import { ImageFlip } from '@/components/conversion/ImageFlip'

export const metadata: Metadata = {
  title: 'Image Flip Tool - Free Online Tool | PixMorph',
  description: 'Flip your image horizontally, vertically, or both directions online for free. Fast, free, and secure browser-based tool. Your files never leave your device.',
}

export default function ImageFlipPage() {
  return (
    <ToolLayout title="Image Flip" description="Flip your image horizontally, vertically, or both" icon={<ArrowUpDown className="w-6 h-6" />}>
      <ImageFlip />
    </ToolLayout>
  )
}
