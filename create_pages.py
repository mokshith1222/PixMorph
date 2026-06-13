import os

base_dir = r"c:\Users\moksh\OneDrive\Desktop\empty_folder\pixmorph"

files = {
    "app/(tools)/image-color-extractor/page.tsx": """import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Palette } from 'lucide-react'
import { ImageColorExtractor } from '@/components/conversion/ImageColorExtractor'

export const metadata: Metadata = {
  title: 'Image Color Extractor - Free Online Tool | PixMorph',
  description: 'Extract colors from any image. Free online tool for color palette extraction.',
}

export default function ImageColorExtractorPage() {
  return (
    <ToolLayout
      title="Image Color Extractor"
      description="Extract colors from any image"
      icon={<Palette className="w-6 h-6" />}
    >
      <ImageColorExtractor />
    </ToolLayout>
  )
}
""",
    "app/(tools)/image-to-sketch/page.tsx": """import { Metadata } from 'next'
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
""",
    "app/(tools)/image-to-cartoon/page.tsx": """import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Smile } from 'lucide-react'
import { ImageToCartoon } from '@/components/conversion/ImageToCartoon'

export const metadata: Metadata = {
  title: 'Image to Cartoon - Free Online Tool | PixMorph',
  description: 'Convert any image to a cartoon style. Free online tool for creating cartoons from photos.',
}

export default function ImageToCartoonPage() {
  return (
    <ToolLayout
      title="Image to Cartoon"
      description="Convert any image to a cartoon style"
      icon={<Smile className="w-6 h-6" />}
    >
      <ImageToCartoon />
    </ToolLayout>
  )
}
""",
    "app/(tools)/image-to-painting/page.tsx": """import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Brush } from 'lucide-react'
import { ImageToPainting } from '@/components/conversion/ImageToPainting'

export const metadata: Metadata = {
  title: 'Image to Painting - Free Online Tool | PixMorph',
  description: 'Convert any image to an oil painting style. Free online tool for creating paintings from photos.',
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
""",
    "app/(tools)/image-to-bw/page.tsx": """import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Image as ImageIcon } from 'lucide-react'
import { ImageToBW } from '@/components/conversion/ImageToBW'

export const metadata: Metadata = {
  title: 'Image to B&W - Free Online Tool | PixMorph',
  description: 'Convert any image to black and white. Free online tool for creating monochrome images.',
}

export default function ImageToBWPage() {
  return (
    <ToolLayout
      title="Image to B&W"
      description="Convert any image to black and white"
      icon={<ImageIcon className="w-6 h-6" />}
    >
      <ImageToBW />
    </ToolLayout>
  )
}
""",
    "app/(tools)/image-to-sepia/page.tsx": """import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Sunset } from 'lucide-react'
import { ImageToSepia } from '@/components/conversion/ImageToSepia'

export const metadata: Metadata = {
  title: 'Image to Sepia - Free Online Tool | PixMorph',
  description: 'Convert any image to a vintage sepia tone. Free online tool for creating retro-style photos.',
}

export default function ImageToSepiaPage() {
  return (
    <ToolLayout
      title="Image to Sepia"
      description="Convert any image to a vintage sepia tone"
      icon={<Sunset className="w-6 h-6" />}
    >
      <ImageToSepia />
    </ToolLayout>
  )
}
""",
    "app/(tools)/image-mirror/page.tsx": """import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { MoveHorizontal } from 'lucide-react'
import { ImageMirror } from '@/components/conversion/ImageMirror'

export const metadata: Metadata = {
  title: 'Image Mirror - Free Online Tool | PixMorph',
  description: 'Mirror images horizontally or vertically. Free online tool for creating mirror images.',
}

export default function ImageMirrorPage() {
  return (
    <ToolLayout
      title="Image Mirror"
      description="Mirror images horizontally or vertically"
      icon={<MoveHorizontal className="w-6 h-6" />}
    >
      <ImageMirror />
    </ToolLayout>
  )
}
""",
    "app/(tools)/image-blurrer/page.tsx": """import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Blur } from 'lucide-react'
import { ImageBlurrer } from '@/components/conversion/ImageBlurrer'

export const metadata: Metadata = {
  title: 'Image Blurrer - Free Online Tool | PixMorph',
  description: 'Blur images for privacy or effect. Free online tool for applying blur to photos.',
}

export default function ImageBlurrerPage() {
  return (
    <ToolLayout
      title="Image Blurrer"
      description="Blur images for privacy or effect"
      icon={<Blur className="w-6 h-6" />}
    >
      <ImageBlurrer />
    </ToolLayout>
  )
}
""",
    "app/(tools)/image-flip/page.tsx": """import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { FlipVertical } from 'lucide-react'
import { ImageFlip } from '@/components/conversion/ImageFlip'

export const metadata: Metadata = {
  title: 'Image Flip - Free Online Tool | PixMorph',
  description: 'Flip images vertically or horizontally. Free online tool for flipping photos.',
}

export default function ImageFlipPage() {
  return (
    <ToolLayout
      title="Image Flip"
      description="Flip images vertically or horizontally"
      icon={<FlipVertical className="w-6 h-6" />}
    >
      <ImageFlip />
    </ToolLayout>
  )
}
""",
    "app/(tools)/image-brightness-contrast/page.tsx": """import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Sun } from 'lucide-react'
import { ImageBrightnessContrast } from '@/components/conversion/ImageBrightnessContrast'

export const metadata: Metadata = {
  title: 'Image Brightness & Contrast - Free Online Tool | PixMorph',
  description: 'Adjust brightness and contrast of images. Free online tool for photo enhancement.',
}

export default function ImageBrightnessContrastPage() {
  return (
    <ToolLayout
      title="Image Brightness & Contrast"
      description="Adjust brightness and contrast of images"
      icon={<Sun className="w-6 h-6" />}
    >
      <ImageBrightnessContrast />
    </ToolLayout>
  )
}
"""
}

for rel_path, content in files.items():
    full_path = os.path.join(base_dir, rel_path.replace('/', os.sep))
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Pages created!")
