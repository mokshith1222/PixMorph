const fs = require('fs');
const path = require('path');

const baseUrl = 'https://pix-morph-chi.vercel.app';

// Generate robots.txt
const robotsTxt = `User-Agent: *
Allow: /
Disallow: /private/

Sitemap: ${baseUrl}/sitemap.xml
`;
fs.writeFileSync(path.join(__dirname, 'public', 'robots.txt'), robotsTxt);
console.log('Robots.txt generated successfully at public/robots.txt');

// Generate sitemap.xml
const staticRoutes = [
  '',
  '/tools',
  '/privacy',
  '/terms',
  '/contact'
];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

staticRoutes.forEach(route => {
  sitemap += `  <url>
    <loc>${baseUrl}${route === '' ? '/' : route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>
`;
});

try {
  const toolsDir = path.join(__dirname, 'app', '(tools)');
  if (fs.existsSync(toolsDir)) {
    const tools = fs.readdirSync(toolsDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith('.') && !dirent.name.startsWith('_'))
      .map((dirent) => dirent.name);

    tools.forEach(tool => {
      sitemap += `  <url>
    <loc>${baseUrl}/${tool}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    });
  } else {
    console.warn('Tools directory not found at', toolsDir);
  }
} catch (error) {
  console.error('Failed to generate tool routes for sitemap:', error);
}

sitemap += `</urlset>`;

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemap);
console.log('Sitemap generated successfully at public/sitemap.xml');
