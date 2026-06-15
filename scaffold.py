import os

base_dir = r"c:\Users\moksh\OneDrive\Desktop\empty_folder\pixmorph"

tools = [
  {"slug": "pdf-to-ppt", "name": "PDF to PPT", "desc": "Convert PDF to PowerPoint", "icon": "FileText"},
  {"slug": "pdf-to-html", "name": "PDF to HTML", "desc": "Convert PDF to HTML", "icon": "Code"},
  {"slug": "pdf-to-svg", "name": "PDF to SVG", "desc": "Convert PDF to SVG", "icon": "Image"},
  {"slug": "pdf-to-epub", "name": "PDF to ePub", "desc": "Convert PDF to ePub", "icon": "Book"},
  {"slug": "pdf-to-mobi", "name": "PDF to MOBI", "desc": "Convert PDF to MOBI", "icon": "Smartphone"},
  {"slug": "pdf-to-docx", "name": "PDF to DOCX", "desc": "Convert PDF to Word DOCX", "icon": "FileText"},
  {"slug": "pdf-to-rtf", "name": "PDF to RTF", "desc": "Convert PDF to RTF", "icon": "FileText"},
  {"slug": "pdf-to-txt", "name": "PDF to TXT", "desc": "Convert PDF to Text", "icon": "FileText"},
  {"slug": "pdf-to-xml", "name": "PDF to XML", "desc": "Convert PDF to XML", "icon": "Code"},
  {"slug": "pdf-to-json", "name": "PDF to JSON", "desc": "Convert PDF to JSON", "icon": "Code"},
  {"slug": "pdf-page-extractor", "name": "PDF Page Extractor", "desc": "Extract pages from PDF", "icon": "FilePlus"},
  {"slug": "pdf-page-remover", "name": "PDF Page Remover", "desc": "Remove pages from PDF", "icon": "FileMinus"},
  {"slug": "pdf-page-reorder", "name": "PDF Page Reorder", "desc": "Reorder pages in PDF", "icon": "RefreshCw"},
  {"slug": "pdf-add-page", "name": "PDF Add Page", "desc": "Add blank pages to PDF", "icon": "FilePlus"},
  {"slug": "pdf-to-markdown", "name": "PDF to Markdown", "desc": "Convert PDF to Markdown", "icon": "FileText"},
  {"slug": "video-trimmer", "name": "Video Trimmer", "desc": "Trim video duration", "icon": "Scissors"},
  {"slug": "video-cropper", "name": "Video Cropper", "desc": "Crop video dimensions", "icon": "Crop"},
  {"slug": "video-rotator", "name": "Video Rotator", "desc": "Rotate video", "icon": "RotateCw"},
  {"slug": "video-speed-changer", "name": "Video Speed Changer", "desc": "Change video playback speed", "icon": "FastForward"},
  {"slug": "video-stabilizer", "name": "Video Stabilizer", "desc": "Stabilize shaky video", "icon": "Video"},
  {"slug": "audio-merger", "name": "Audio Merger", "desc": "Merge audio files", "icon": "Music"},
  {"slug": "audio-splitter", "name": "Audio Splitter", "desc": "Split audio into parts", "icon": "Scissors"},
  {"slug": "audio-recorder", "name": "Audio Recorder", "desc": "Record audio from microphone", "icon": "Mic"},
  {"slug": "audio-editor", "name": "Audio Editor", "desc": "Edit audio waveforms", "icon": "Music"},
  {"slug": "audio-pitch-changer", "name": "Audio Pitch Changer", "desc": "Change audio pitch", "icon": "Sliders"}
]

def to_pascal_case(text):
    return ''.join(word.capitalize() for word in text.split('-'))

for tool in tools:
    slug = tool['slug']
    name = tool['name']
    desc = tool['desc']
    icon = tool['icon']
    component_name = to_pascal_case(slug)
    
    # 1. Create page.tsx
    page_dir = os.path.join(base_dir, f"app/(tools)/{slug}")
    os.makedirs(page_dir, exist_ok=True)
    page_content = f"""import {{ Metadata }} from 'next'
import {{ ToolLayout }} from '@/components/tools/ToolLayout'
import {{ {icon} }} from 'lucide-react'
import {{ {component_name} }} from '@/components/conversion/{component_name}'

export const metadata: Metadata = {{
  title: '{name} - Free Online Tool | PixMorph',
  description: '{desc}. Free online tool.',
}}

export default function {component_name}Page() {{
  return (
    <ToolLayout
      title="{name}"
      description="{desc}"
      icon={{<{icon} className="w-6 h-6" />}}
    >
      <{component_name} />
    </ToolLayout>
  )
}}
"""
    with open(os.path.join(page_dir, "page.tsx"), 'w', encoding='utf-8') as f:
        f.write(page_content)
        
    # 2. Create Component
    comp_dir = os.path.join(base_dir, "components/conversion")
    os.makedirs(comp_dir, exist_ok=True)
    comp_content = f"""'use client'

import {{ useState }} from 'react'
import {{ DropZone }} from '@/components/ui/DropZone'
import {{ Button }} from '@/components/ui/Button'
import {{ Download, {icon} }} from 'lucide-react'
import toast from 'react-hot-toast'

export function {component_name}() {{
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleFiles = (files: File[]) => {{
    if (files.length > 0) {{
      setFile(files[0])
      setResult(null)
    }}
  }}

  const handleProcess = async () => {{
    if (!file) {{
      toast.error('Please select a file')
      return
    }}

    setLoading(true)

    try {{
      // TODO: Implement actual processing logic here
      // For now we simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Fake result
      const blob = new Blob(['Sample output'], {{ type: 'text/plain' }})
      const url = URL.createObjectURL(blob)
      setResult(url)
      
      toast.success('{name} processed successfully!')
    }} catch (error) {{
      toast.error('Failed to process file')
    }} finally {{
      setLoading(false)
    }}
  }}

  const handleDownload = () => {{
    if (result) {{
      const link = document.createElement('a')
      link.href = result
      link.download = `processed_${{file?.name || 'output'}}`
      link.click()
      toast.success('Download started!')
    }}
  }}

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Upload a file to use the {name} tool.
        </p>
      </div>

      <DropZone 
        onFilesDrop={{handleFiles}} 
        accept="*"
        multiple={{false}}
      />

      {{file && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
          <span className="text-sm">{{file.name}}</span>
          <Button variant="ghost" size="sm" onClick={{() => setFile(null)}}>
            Remove
          </Button>
        </div>
      )}}

      <Button onClick={{handleProcess}} disabled={{!file || loading}} className="w-full">
        <{icon} className="w-4 h-4 mr-2" />
        {{loading ? 'Processing...' : 'Process File'}}
      </Button>

      {{result && (
        <div className="space-y-3">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-800 dark:text-green-200 text-sm">
            Processing complete! Ready to download.
          </div>
          <Button onClick={{handleDownload}} variant="secondary" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Result
          </Button>
        </div>
      )}}
    </div>
  )
}}
"""
    with open(os.path.join(comp_dir, f"{component_name}.tsx"), 'w', encoding='utf-8') as f:
        f.write(comp_content)

print("Scaffolding complete!")
