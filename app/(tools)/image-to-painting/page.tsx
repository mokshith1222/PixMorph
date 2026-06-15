import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Brush } from 'lucide-react'
import { ImageToPainting } from '@/components/conversion/ImageToPainting'

export const metadata: Metadata = {
  title: 'Image to Painting - Free Online Tool | PixMorph',
  description: 'Convert any image to an oil painting style. Free online tool for creating paintings from photos. Fast, free, and secure browser-based tool. Your files...',
}

export default function ImageToPaintingPage() {
  return (
    <ToolLayout
      title="Image to Painting"
      description="Convert any image to an oil painting style"
      icon={<Brush className="w-6 h-6" />}
    >
      <ImageToPainting />
    </ToolLayout>
  )
}
