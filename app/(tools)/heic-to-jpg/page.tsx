import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { ImageIcon } from 'lucide-react'
import { HeicConverter } from '@/components/conversion/HeicConverter'

export const metadata: Metadata = {
  title: 'HEIC to JPG - Free Online Tool | PixMorph',
  description: 'Convert iPhone HEIC photos to JPG format online for free. Fast, secure, and no software installation required.',
}

export default function HeicToJpgPage() {
  return (
    <ToolLayout title="HEIC to JPG" description="Convert iPhone HEIC to JPG" icon={<ImageIcon className="w-6 h-6" />}>
      <HeicConverter targetFormat="jpg" />
    </ToolLayout>
  )
}