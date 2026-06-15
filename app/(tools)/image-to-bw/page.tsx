import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Contrast } from 'lucide-react'
import { ImageToBW } from '@/components/conversion/ImageToBW'

export const metadata: Metadata = {
  title: 'Image to Black & White - Free Online Tool | PixMorph',
  description: 'Convert any image to grayscale black and white using luminance-weighted processing. Fast, free, and secure browser-based tool. Your files never leave your...',
}

export default function ImageToBWPage() {
  return (
    <ToolLayout title="Image to B&W" description="Convert any image to black & white" icon={<Contrast className="w-6 h-6" />}>
      <ImageToBW />
    </ToolLayout>
  )
}
