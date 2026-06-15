import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Sliders } from 'lucide-react'
import { AudioPitchChanger } from '@/components/conversion/AudioPitchChanger'

export const metadata: Metadata = {
  title: 'Audio Pitch Changer - Free Online Tool | PixMorph',
  description: 'Change audio pitch. Free online tool.',
}

export default function AudioPitchChangerPage() {
  return (
    <ToolLayout
      title="Audio Pitch Changer"
      description="Change audio pitch"
      icon={<Sliders className="w-6 h-6" />}
    >
      <AudioPitchChanger />
    </ToolLayout>
  )
}
