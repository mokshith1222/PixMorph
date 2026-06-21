import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Crop } from 'lucide-react'
import { VideoCropper } from '@/components/conversion/VideoCropper'

export const metadata: Metadata = {
  title: 'Video Cropper - Free Online Tool | PixMorph',
  description: 'Crop video dimensions. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/video-cropper' }
}

export default function VideoCropperPage() {
  return (
    <ToolLayout
      title="Video Cropper"
      description="Crop video dimensions"
      icon={<Crop className="w-6 h-6" />}
    >
      <VideoCropper />
    </ToolLayout>
  )
}
