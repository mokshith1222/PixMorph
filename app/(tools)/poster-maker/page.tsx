import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Palette } from 'lucide-react'
import { PosterMaker } from '@/components/conversion/PosterMaker'

export const metadata: Metadata = {
  title: 'Poster Maker - Free Online Tool | PixMorph',
  description: 'Create posters. Free online tool.',
}

export default function PosterMakerPage() {
  return (
    <ToolLayout
      title="Poster Maker"
      description="Create posters"
      icon={<Palette className="w-6 h-6" />}
    >
      <PosterMaker />
    </ToolLayout>
  )
}
