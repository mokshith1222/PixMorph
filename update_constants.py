import os
import re

constants_file = r"c:\Users\moksh\OneDrive\Desktop\empty_folder\pixmorph\lib\constants.ts"

with open(constants_file, "r", encoding="utf-8") as f:
    content = f.read()

new_tools = """
  // Utility/Dev Tools
  { name: 'Character Counter', category: 'utility', path: '/tools/character-counter', description: 'Count characters, words, and lines instantly' },
  { name: 'MD5 Generator', category: 'utility', path: '/tools/md5-generator', description: 'Generate MD5 hashes from text securely' },
  { name: 'SHA Generator', category: 'utility', path: '/tools/sha-generator', description: 'Generate SHA-1, SHA-256, and SHA-512 hashes' },
  { name: 'HTML Encoder', category: 'utility', path: '/tools/html-encoder', description: 'Safely encode HTML entities' },
  { name: 'HTML Decoder', category: 'utility', path: '/tools/html-decoder', description: 'Decode HTML entities back to text' },
  { name: 'URL Decoder', category: 'utility', path: '/tools/url-decoder', description: 'Decode URL-encoded strings securely' },
  { name: 'Base64 Decoder', category: 'utility', path: '/tools/base64-decoder', description: 'Decode Base64 strings to text' },
  { name: 'JSON Validator', category: 'utility', path: '/tools/json-validator', description: 'Validate and lint JSON payloads' },
  { name: 'JSON Minifier', category: 'utility', path: '/tools/json-minifier', description: 'Minify JSON payloads' },
  { name: 'UUID Validator', category: 'utility', path: '/tools/uuid-validator', description: 'Validate UUIDs instantly' },
  { name: 'JSON to YAML', category: 'utility', path: '/tools/json-to-yaml', description: 'Convert JSON objects to YAML' },
  { name: 'YAML to JSON', category: 'utility', path: '/tools/yaml-to-json', description: 'Convert YAML strings to JSON' },
  { name: 'CSV to HTML', category: 'utility', path: '/tools/csv-to-html', description: 'Convert CSV data to an HTML table' },
  { name: 'HTML to CSV', category: 'utility', path: '/tools/html-to-csv', description: 'Extract CSV from an HTML table' },
  { name: 'Markdown to HTML', category: 'utility', path: '/tools/markdown-to-html', description: 'Render Markdown into raw HTML' },
  { name: 'CSS Minifier', category: 'utility', path: '/tools/css-minifier', description: 'Minify CSS code' },
  { name: 'CSS Formatter', category: 'utility', path: '/tools/css-formatter', description: 'Format and beautify CSS code' },
  { name: 'JS Formatter', category: 'utility', path: '/tools/js-formatter', description: 'Format and beautify JS code' },

  // Network Tools
  { name: 'Website Age Check', category: 'network', path: '/tools/website-age', description: 'Check the domain registration age' },
  { name: 'Website DNS Lookup', category: 'network', path: '/tools/dns-lookup', description: 'Lookup DNS records for any domain' },

  // Design Makers
  { name: 'Logo Maker', category: 'design', path: '/tools/logo-maker', description: 'Generate simple logos using templates' },
  { name: 'Icon Maker', category: 'design', path: '/tools/icon-maker', description: 'Generate clean icons using canvas templates' },
  { name: 'Banner Maker', category: 'design', path: '/tools/banner-maker', description: 'Generate web banners using canvas templates' },
  { name: 'Poster Maker', category: 'design', path: '/tools/poster-maker', description: 'Generate simple posters using canvas templates' },
  { name: 'Resume Maker', category: 'design', path: '/tools/resume-maker', description: 'Generate professional resumes using templates' },
"""

# Insert before the closing bracket of TOOLS array
if "Resume Maker" not in content:
    content = content.replace("]\n\nexport const CATEGORIES", new_tools + "]\n\nexport const CATEGORIES")
    
    # Also we need to add the new categories to the CATEGORIES array
    new_categories = """
  {
    id: 'network',
    name: 'Network Tools',
    description: 'Instant DNS Lookups and Domain Age checks.',
    icon: 'Globe2'
  },
  {
    id: 'design',
    name: 'Design Makers',
    description: 'Generate Logos, Icons, Banners, Posters and Resumes.',
    icon: 'Palette'
  }
]"""
    content = content.replace("]\n", new_categories + "\n")
    
    with open(constants_file, "w", encoding="utf-8") as f:
        f.write(content)
    print("Updated constants.ts")
else:
    print("constants.ts already updated")
