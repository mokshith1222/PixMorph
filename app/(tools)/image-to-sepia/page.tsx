import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Sunset } from 'lucide-react'
import { ImageToSepia } from '@/components/conversion/ImageToSepia'

export const metadata: Metadata = {
  title: 'Image to Sepia - Free Online Tool | PixMorph',
  description: 'Apply a warm sepia vintage filter to your photos online for free.',
}

export default function ImageToSepiaPage() {
  return (
    <ToolLayout title="Image to Sepia" description="Apply a warm vintage sepia tone to your image" icon={<Sunset className="w-6 h-6" />}>
      <ImageToSepia />
    </ToolLayout>
  )
}
