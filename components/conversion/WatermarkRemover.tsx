'use client'

import { useState, useRef, MouseEvent as ReactMouseEvent } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Download, Eraser } from 'lucide-react'
import toast from 'react-hot-toast'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'

interface Box {
  x: number
  y: number
  width: number
  height: number
}

export function WatermarkRemover() {
  const [file, setFile] = useState<File | null>(null)
  const [mediaUrl, setMediaUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const [box, setBox] = useState<Box | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null)

  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null)

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0]
      setFile(selectedFile)
      if (mediaUrl) URL.revokeObjectURL(mediaUrl)
      setMediaUrl(URL.createObjectURL(selectedFile))
      setResult(null)
      setBox(null)
    }
  }

  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!mediaRef.current) return
    const rect = mediaRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setStartPos({ x, y })
    setIsDrawing(true)
    setBox({ x, y, width: 0, height: 0 })
  }

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!isDrawing || !startPos || !mediaRef.current) return
    const rect = mediaRef.current.getBoundingClientRect()
    let currentX = e.clientX - rect.left
    let currentY = e.clientY - rect.top

    // Constrain to media bounds
    currentX = Math.max(0, Math.min(currentX, rect.width))
    currentY = Math.max(0, Math.min(currentY, rect.height))

    setBox({
      x: Math.min(startPos.x, currentX),
      y: Math.min(startPos.y, currentY),
      width: Math.abs(currentX - startPos.x),
      height: Math.abs(currentY - startPos.y)
    })
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  const handleProcess = async () => {
    if (!file || !box || box.width < 5 || box.height < 5 || !mediaRef.current) {
      toast.error('Please select an area on the media first')
      return
    }

    setLoading(true)
    try {
      // Calculate actual coordinates based on original media size
      const rect = mediaRef.current.getBoundingClientRect()
      
      let naturalWidth = 0
      let naturalHeight = 0

      if (file.type.startsWith('video/')) {
        const video = mediaRef.current as HTMLVideoElement
        naturalWidth = video.videoWidth
        naturalHeight = video.videoHeight
      } else {
        const img = mediaRef.current as HTMLImageElement
        naturalWidth = img.naturalWidth
        naturalHeight = img.naturalHeight
      }

      const scaleX = naturalWidth / rect.width
      const scaleY = naturalHeight / rect.height

      // Ensure at least 1px border for delogo filter
      let actualX = Math.floor(box.x * scaleX)
      let actualY = Math.floor(box.y * scaleY)
      let actualW = Math.floor(box.width * scaleX)
      let actualH = Math.floor(box.height * scaleY)

      actualX = Math.max(1, actualX)
      actualY = Math.max(1, actualY)
      actualW = Math.min(naturalWidth - actualX - 1, actualW)
      actualH = Math.min(naturalHeight - actualY - 1, actualH)

      const ffmpeg = new FFmpeg()
      await ffmpeg.load()

      const inputName = `input.${file.name.split('.').pop()}`
      const outputName = `output.${file.name.split('.').pop()}`

      ffmpeg.writeFile(inputName, await fetchFile(file))

      const args = [
        '-i', inputName,
        '-vf', `delogo=x=${actualX}:y=${actualY}:w=${actualW}:h=${actualH}`,
      ]

      if (file.type.startsWith('video/')) {
        args.push('-c:a', 'copy')
      }

      args.push(outputName)

      await ffmpeg.exec(args)

      const data = await ffmpeg.readFile(outputName)
      const blob = new Blob([data as any], { type: file.type })
      const url = URL.createObjectURL(blob)
      setResult(url)
      
      toast.success('Watermark removed successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to process file. Make sure area is not touching the edges.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (result) {
      const link = document.createElement('a')
      link.href = result
      link.download = `${file?.name.replace(/\.[^/.]+$/, '') || 'output'}_clean.${file?.name.split('.').pop()}`
      link.click()
      toast.success('Download started!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Upload an image or video, draw a box over the watermark, and click Process to remove it.
        </p>
      </div>

      {!file && (
        <DropZone 
          onFilesDrop={handleFiles} 
          accept="image/*,video/*"
          multiple={false}
        />
      )}

      {file && mediaUrl && (
        <div className="space-y-4">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
            <span className="text-sm truncate">{file.name}</span>
            <Button variant="ghost" size="sm" onClick={() => {
              setFile(null)
              setBox(null)
              setResult(null)
            }}>
              Change File
            </Button>
          </div>

          {!result && (
            <div className="relative inline-block w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {file.type.startsWith('video/') ? (
                <video 
                  ref={mediaRef as any}
                  src={mediaUrl} 
                  controls 
                  className="w-full h-auto block pointer-events-none"
                />
              ) : (
                <img 
                  ref={mediaRef as any}
                  src={mediaUrl} 
                  alt="Upload" 
                  className="w-full h-auto block pointer-events-none"
                  draggable={false}
                />
              )}
              
              {/* Overlay container to receive mouse events */}
              <div className="absolute inset-0 cursor-crosshair z-10" />

              {box && (
                <div 
                  className="absolute border-2 border-red-500 bg-red-500/20 pointer-events-none z-20 transition-none"
                  style={{
                    left: `${box.x}px`,
                    top: `${box.y}px`,
                    width: `${box.width}px`,
                    height: `${box.height}px`,
                  }}
                />
              )}
            </div>
          )}

          {!result && (
            <Button onClick={handleProcess} disabled={loading || !box || box.width === 0} className="w-full">
              <Eraser className="w-4 h-4 mr-2" />
              {loading ? 'Processing...' : 'Remove Watermark'}
            </Button>
          )}

          {result && (
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                {file.type.startsWith('video/') ? (
                  <video src={result} controls className="w-full h-auto" />
                ) : (
                  <img src={result} alt="Result" className="w-full h-auto" />
                )}
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-800 dark:text-green-200 text-sm">
                Processing complete! Ready to download.
              </div>
              <Button onClick={handleDownload} variant="secondary" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Clean File
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
