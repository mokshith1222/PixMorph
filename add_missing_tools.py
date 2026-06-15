import os

base_dir = r"c:\Users\moksh\OneDrive\Desktop\empty_folder\pixmorph"

tools = [
    ("character-counter", "Character Counter", "Count characters in text", "Utility Tools", "Type", "CharacterCounter"),
    ("md5-generator", "MD5 Generator", "Generate MD5 hash", "Utility Tools", "Hash", "Md5Generator"),
    ("sha-generator", "SHA Generator", "Generate SHA hash", "Utility Tools", "Hash", "ShaGenerator"),
    ("html-encoder", "HTML Encoder", "Encode HTML entities", "Utility Tools", "Code", "HtmlEncoder"),
    ("html-decoder", "HTML Decoder", "Decode HTML entities", "Utility Tools", "Code", "HtmlDecoder"),
    ("url-decoder", "URL Decoder", "Decode URLs", "Utility Tools", "Link", "UrlDecoder"),
    ("base64-decoder", "Base64 Decoder", "Decode Base64 strings", "Utility Tools", "Code", "Base64Decoder"),
    ("json-validator", "JSON Validator", "Validate JSON formatting", "Utility Tools", "Code", "JsonValidator"),
    ("json-minifier", "JSON Minifier", "Minify JSON objects", "Utility Tools", "Code", "JsonMinifier"),
    ("uuid-validator", "UUID Validator", "Validate UUIDs", "Utility Tools", "Hash", "UuidValidator"),
    ("json-to-yaml", "JSON to YAML", "Convert JSON to YAML", "Utility Tools", "Code", "JsonToYaml"),
    ("yaml-to-json", "YAML to JSON", "Convert YAML to JSON", "Utility Tools", "Code", "YamlToJson"),
    ("csv-to-html", "CSV to HTML", "Convert CSV to HTML table", "Utility Tools", "Code", "CsvToHtml"),
    ("html-to-csv", "HTML to CSV", "Convert HTML table to CSV", "Utility Tools", "Code", "HtmlToCsv"),
    ("markdown-to-html", "Markdown to HTML", "Convert Markdown to HTML", "Utility Tools", "Code", "MarkdownToHtml"),
    ("website-age-check", "Website Age Check", "Check domain age", "Web Tools", "Globe", "WebsiteAgeCheck"),
    ("website-dns-lookup", "Website DNS Lookup", "DNS Records Lookup", "Web Tools", "Globe", "WebsiteDnsLookup"),
    ("css-minifier", "CSS Minifier", "Minify CSS code", "Code Tools", "Code", "CssMinifier"),
    ("css-formatter", "CSS Formatter", "Format CSS code", "Code Tools", "Code", "CssFormatter"),
    ("js-formatter", "JS Formatter", "Format JavaScript code", "Code Tools", "Code", "JsFormatter"),
    ("logo-maker", "Logo Maker", "Create custom logos", "Design Makers", "Palette", "LogoMaker"),
    ("icon-maker", "Icon Maker", "Create custom icons", "Design Makers", "Palette", "IconMaker"),
    ("banner-maker", "Banner Maker", "Create banners", "Design Makers", "Palette", "BannerMaker"),
    ("poster-maker", "Poster Maker", "Create posters", "Design Makers", "Palette", "PosterMaker"),
    ("resume-maker", "Resume Maker", "Create resumes", "Design Makers", "FileText", "ResumeMaker"),
]

# Create directories and pages
for slug, name, desc, category, icon, comp in tools:
    dir_path = os.path.join(base_dir, "app", "(tools)", slug)
    os.makedirs(dir_path, exist_ok=True)
    
    page_content = f"""import {{ Metadata }} from 'next'
import {{ ToolLayout }} from '@/components/tools/ToolLayout'
import {{ {icon} }} from 'lucide-react'
import {{ {comp} }} from '@/components/conversion/{comp}'

export const metadata: Metadata = {{
  title: '{name} - Free Online Tool | PixMorph',
  description: '{desc}. Free online tool.',
}}

export default function {comp}Page() {{
  return (
    <ToolLayout
      title="{name}"
      description="{desc}"
      icon={{<{icon} className="w-6 h-6" />}}
    >
      <{comp} />
    </ToolLayout>
  )
}}
"""
    with open(os.path.join(dir_path, "page.tsx"), "w") as f:
        f.write(page_content)

    comp_path = os.path.join(base_dir, "components", "conversion", f"{comp}.tsx")
    if not os.path.exists(comp_path):
        comp_content = f"""'use client'

import React from 'react'

export function {comp}() {{
  return (
    <div className="p-8 text-center bg-white/5 dark:bg-gray-800/40 rounded-2xl border border-black/5 dark:border-white/5 backdrop-blur-md">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{name}</h3>
      <p className="text-gray-500 dark:text-gray-400">This tool is currently under construction. Check back soon!</p>
    </div>
  )
}}
"""
        with open(comp_path, "w") as f:
            f.write(comp_content)

print("Pages and components created.")

# Add to constants.ts
new_constants = []
for slug, name, desc, category, _, _ in tools:
    new_constants.append(f"  {{ slug: '{slug}', name: '{name}', description: '{desc}', category: '{category}' }},")

print("\n".join(new_constants))
