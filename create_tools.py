import os

tools = [
  ('character-counter', 'Character Counter'),
  ('md5-generator', 'MD5 Generator'),
  ('sha-generator', 'SHA Generator'),
  ('html-encoder', 'HTML Encoder'),
  ('html-decoder', 'HTML Decoder'),
  ('url-decoder', 'URL Decoder'),
  ('base64-decoder', 'Base64 Decoder'),
  ('json-validator', 'JSON Validator'),
  ('json-minifier', 'JSON Minifier'),
  ('uuid-validator', 'UUID Validator'),
  ('json-to-yaml', 'JSON to YAML'),
  ('yaml-to-json', 'YAML to JSON'),
  ('csv-to-html', 'CSV to HTML'),
  ('html-to-csv', 'HTML to CSV'),
  ('markdown-to-html', 'Markdown to HTML'),
  ('css-minifier', 'CSS Minifier'),
  ('css-formatter', 'CSS Formatter'),
  ('js-formatter', 'JS Formatter'),
  ('website-age', 'Website Age Check'),
  ('dns-lookup', 'Website DNS Lookup'),
  ('logo-maker', 'Logo Maker'),
  ('icon-maker', 'Icon Maker'),
  ('banner-maker', 'Banner Maker'),
  ('poster-maker', 'Poster Maker'),
  ('resume-maker', 'Resume Maker')
]

base_dir = r"c:\Users\moksh\OneDrive\Desktop\empty_folder\pixmorph"
app_dir = os.path.join(base_dir, "app", "(tools)")
components_dir = os.path.join(base_dir, "components", "conversion")

page_template = """'use client'

import {Toolbox} from '@/components/conversion/Toolbox'
import { {component_name} } from '@/components/conversion/{slug}'
import { TOOLS } from '@/lib/constants'

export default function Page() {
  const tool = TOOLS.find(t => t.path === '/tools/{slug}')
  
  if (!tool) return null

  return (
    <Toolbox title={tool.name} description={tool.description}>
      <{component_name} />
    </Toolbox>
  )
}
"""

component_template = """'use client'

import React, { useState } from 'react'

export function {component_name}() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleProcess = async () => {
    // Basic boilerplate logic
    setOutput('Processing for {title}...')
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-32 p-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none"
          placeholder="Enter content here..."
        />
      </div>
      
      <button 
        onClick={handleProcess}
        className="px-6 py-2 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors"
      >
        Process
      </button>

      {output && (
        <div>
          <label className="block text-sm font-medium mb-2">Output</label>
          <div className="p-4 bg-black/20 rounded-xl border border-white/10">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
"""

for slug, title in tools:
    # component_name = slug to PascalCase
    component_name = "".join(x.capitalize() for x in slug.split('-'))
    
    # Create app route
    route_dir = os.path.join(app_dir, slug)
    os.makedirs(route_dir, exist_ok=True)
    with open(os.path.join(route_dir, 'page.tsx'), 'w', encoding='utf-8') as f:
        f.write(page_template.replace('{slug}', slug).replace('{component_name}', component_name))
        
    # Create component file
    comp_file = os.path.join(components_dir, slug + '.tsx')
    if not os.path.exists(comp_file):
        with open(comp_file, 'w', encoding='utf-8') as f:
            f.write(component_template.replace('{title}', title).replace('{component_name}', component_name))

print("Scaffolded all 25 tools successfully.")
