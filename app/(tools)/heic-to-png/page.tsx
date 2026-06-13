import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { ImageIcon } from 'lucide-react'
import { HeicConverter } from '@/components/conversion/HeicConverter'

export const metadata: Metadata = {
  title: 'HEIC to PNG - Free Online Tool | PixMorph',
  description: 'Convert HEIC images to PNG format online for free. Preserve transparency and quality with our fast HEIC to PNG converter.',
}

export default function HeicToPngPage() {
  return (
    <ToolLayout title="HEIC to PNG" description="Convert HEIC to PNG" icon={<ImageIcon className="w-6 h-6" />}>
      <HeicConverter targetFormat="png" />
    </ToolLayout>
  )
}