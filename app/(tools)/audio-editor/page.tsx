import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Music } from 'lucide-react'
import { AudioEditor } from '@/components/conversion/AudioEditor'

export const metadata: Metadata = {
  title: 'Audio Editor - Free Online Tool | PixMorph',
  description: 'Edit audio waveforms. Free online tool.',
}

export default function AudioEditorPage() {
  return (
    <ToolLayout
      title="Audio Editor"
      description="Edit audio waveforms"
      icon={<Music className="w-6 h-6" />}
    >
      <AudioEditor />
    </ToolLayout>
  )
}
