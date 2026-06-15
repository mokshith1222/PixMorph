import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Mic } from 'lucide-react'
import { AudioRecorder } from '@/components/conversion/AudioRecorder'

export const metadata: Metadata = {
  title: 'Audio Recorder - Free Online Tool | PixMorph',
  description: 'Record audio from microphone. Free online tool.',
}

export default function AudioRecorderPage() {
  return (
    <ToolLayout
      title="Audio Recorder"
      description="Record audio from microphone"
      icon={<Mic className="w-6 h-6" />}
    >
      <AudioRecorder />
    </ToolLayout>
  )
}
