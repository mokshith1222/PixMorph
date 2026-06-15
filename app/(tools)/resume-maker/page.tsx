import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { FileText } from 'lucide-react'
import { ResumeMaker } from '@/components/conversion/ResumeMaker'

export const metadata: Metadata = {
  title: 'Resume Maker - Free Online Tool | PixMorph',
  description: 'Create resumes. Free online tool.',
}

export default function ResumeMakerPage() {
  return (
    <ToolLayout
      title="Resume Maker"
      description="Create resumes"
      icon={<FileText className="w-6 h-6" />}
    >
      <ResumeMaker />
    </ToolLayout>
  )
}
