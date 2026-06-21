import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Sliders } from 'lucide-react'
import { AudioPitchChanger } from '@/components/conversion/AudioPitchChanger'

export const metadata: Metadata = {
  title: 'Audio Pitch Changer - Free Online Tool | PixMorph',
  description: 'Change audio pitch. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/audio-pitch-changer' }
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
