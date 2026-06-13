import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { TOOLS } from '@/lib/constants'

export default function ToolsPage() {
  const categories = [...new Set(TOOLS.map((t) => t.category))]

  return (
    <Container>
      <div className="py-12">
        <h1 className="text-4xl font-display font-bold mb-2">All Tools</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
          Browse our collection of free online file conversion and editing tools.
        </p>

        {categories.map((category) => (
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {TOOLS.filter((t) => t.category === category).map((tool) => (
                <Link key={tool.slug} href={`/${tool.slug}`}>
                  <Card className="p-4 h-full hover:border-primary-300 dark:hover:border-primary-700 transition-colors">
                    <h3 className="font-medium mb-1">{tool.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {tool.description}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}
