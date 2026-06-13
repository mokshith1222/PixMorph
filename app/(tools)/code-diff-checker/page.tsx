import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { GitCompare } from 'lucide-react'
import { CodeDiffChecker } from '@/components/conversion/CodeDiffChecker'

export const metadata: Metadata = {
  title: 'Code Diff Checker - Free Online Tool | PixMorph',
  description: 'Compare code differences online for free. Side-by-side diff comparison to find changes in your code.',
}

export default function CodeDiffCheckerPage() {
  return (
    <ToolLayout title="Code Diff Checker" description="Compare code differences" icon={<GitCompare className="w-6 h-6" />}>
      <CodeDiffChecker />
    </ToolLayout>
  )
}