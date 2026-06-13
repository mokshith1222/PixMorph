import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { PenTool } from 'lucide-react'
import { ImageToSketch } from '@/components/conversion/ImageToSketch'

export const metadata: Metadata = {
  title: 'Image to Sketch - Free Online Tool | PixMorph',
  description: 'Convert any image to a pencil sketch. Free online tool for creating sketches from photos.',
}

export default function ImageToSketchPage() {
  return (
    <ToolLayout
      title="Image to Sketch"
      description="Convert any image to a pencil sketch"
      icon={<PenTool className="w-6 h-6" />}
    >
      <ImageToSketch />
    </ToolLayout>
  )
}
