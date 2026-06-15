import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Crop } from 'lucide-react'
import { VideoCropper } from '@/components/conversion/VideoCropper'

export const metadata: Metadata = {
  title: 'Video Cropper - Free Online Tool | PixMorph',
  description: 'Crop video dimensions. Free online tool.',
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
