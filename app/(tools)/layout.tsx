import { RelatedTools } from '@/components/shared/RelatedTools'

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <RelatedTools />
    </>
  )
}
