import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Sun } from 'lucide-react'
import { ImageBrightnessContrast } from '@/components/conversion/ImageBrightnessContrast'

export const metadata: Metadata = {
  title: 'Image Brightness & Contrast - Free Online Tool | PixMorph',
  description: 'Adjust the brightness and contrast of your images online for free. Get live preview.',
}

export default function ImageBrightnessContrastPage() {
  return (
    <ToolLayout title="Image Brightness & Contrast" description="Adjust brightness and contrast with live preview" icon={<Sun className="w-6 h-6" />}>
      <ImageBrightnessContrast />
    </ToolLayout>
  )
}
