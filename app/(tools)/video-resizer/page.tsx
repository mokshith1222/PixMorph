import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Crop } from 'lucide-react'
import { VideoResizer } from '@/components/conversion/VideoResizer'

export const metadata: Metadata = {
  title: 'Video Resizer - Free Online Tool | PixMorph',
  description: 'Resize video dimensions online for free. Change video width and height to any resolution. Fast, free, and secure browser-based tool. Your files never leave...',
}

export default function VideoResizerPage() {
  return (
    <ToolLayout title="Video Resizer" description="Resize video dimensions" icon={<Crop className="w-6 h-6" />}>
      <VideoResizer />
    </ToolLayout>
  )
}