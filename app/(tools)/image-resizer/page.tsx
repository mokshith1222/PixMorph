import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Crop } from 'lucide-react'
import { ImageResizer } from '@/components/conversion/ImageResizer'

export const metadata: Metadata = {
  title: 'Image Resizer - Free Online Tool | PixMorph',
  description: 'Resize images online for free. Change dimensions and scale images to any size quickly and easily.',
}

export default function ImageResizerPage() {
  return (
    <ToolLayout title="Image Resizer" description="Resize images" icon={<Crop className="w-6 h-6" />}>
      <ImageResizer />
    </ToolLayout>
  )
}