import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Crop } from 'lucide-react'
import { ImageCropper } from '@/components/conversion/ImageCropper'

export const metadata: Metadata = {
  title: 'Image Cropper - Free Online Tool | PixMorph',
  description: 'Crop images online for free. Trim and cut images to your desired dimensions with our easy image cropper. Fast, free, and secure browser-based tool. Your...',
  alternates: { canonical: '/image-crop' }
}

export default function ImageCropPage() {
  return (
    <ToolLayout title="Image Cropper" description="Crop images" icon={<Crop className="w-6 h-6" />}>
      <ImageCropper />
    </ToolLayout>
  )
}