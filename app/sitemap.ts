import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pixmorph.com'

  const staticRoutes = [
    '',
    '/tools',
    '/privacy',
    '/terms',
    '/contact'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  let toolRoutes: MetadataRoute.Sitemap = []
  
  try {
    const toolsDir = path.join(process.cwd(), 'app', '(tools)')
    if (fs.existsSync(toolsDir)) {
      const tools = fs.readdirSync(toolsDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith('.') && !dirent.name.startsWith('_'))
        .map((dirent) => dirent.name)

      toolRoutes = tools.map((tool) => ({
        url: `${baseUrl}/${tool}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    }
  } catch (error) {
    console.error('Failed to generate tool routes for sitemap:', error)
  }

  return [...staticRoutes, ...toolRoutes]
}
