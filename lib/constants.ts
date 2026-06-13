export interface ToolDefinition {
  slug: string
  name: string
  description: string
  category: string
}

export const TOOLS: ToolDefinition[] = [
  // Image
  { slug: 'heic-to-jpg', name: 'HEIC to JPG', description: 'Convert iPhone HEIC to JPG', category: 'Image Tools' },
  { slug: 'heic-to-png', name: 'HEIC to PNG', description: 'Convert HEIC to PNG', category: 'Image Tools' },
  { slug: 'heic-to-webp', name: 'HEIC to WebP', description: 'Convert HEIC to WebP', category: 'Image Tools' },
  { slug: 'heic-to-avif', name: 'HEIC to AVIF', description: 'Convert HEIC to AVIF', category: 'Image Tools' },
  { slug: 'image-compressor', name: 'Image Compressor', description: 'Compress images', category: 'Image Tools' },
  { slug: 'image-resizer', name: 'Image Resizer', description: 'Resize images', category: 'Image Tools' },
  { slug: 'image-crop', name: 'Image Cropper', description: 'Crop images', category: 'Image Tools' },
  { slug: 'image-rotator', name: 'Image Rotator', description: 'Rotate images', category: 'Image Tools' },
  { slug: 'image-enhancer', name: 'Image Enhancer', description: 'Enhance image quality', category: 'Image Tools' },
  { slug: 'image-sharper', name: 'Image Sharper', description: 'Sharpen blurry images', category: 'Image Tools' },
  { slug: 'image-color-extractor', name: 'Image Color Extractor', description: 'Extract color palettes', category: 'Image Tools' },
  { slug: 'image-to-sketch', name: 'Image to Sketch', description: 'Convert image to pencil sketch', category: 'Image Tools' },
  { slug: 'image-to-cartoon', name: 'Image to Cartoon', description: 'Cartoonify your images', category: 'Image Tools' },
  { slug: 'image-to-painting', name: 'Image to Painting', description: 'Turn image into painting', category: 'Image Tools' },
  { slug: 'image-to-bw', name: 'Image to B&W', description: 'Convert image to black & white', category: 'Image Tools' },
  { slug: 'image-to-sepia', name: 'Image to Sepia', description: 'Apply sepia filter to image', category: 'Image Tools' },
  { slug: 'image-mirror', name: 'Image Mirror', description: 'Mirror image horizontally/vertically', category: 'Image Tools' },
  { slug: 'image-blurrer', name: 'Image Blurrer', description: 'Apply blur to images', category: 'Image Tools' },
  { slug: 'image-flip', name: 'Image Flip', description: 'Flip image horizontally/vertically', category: 'Image Tools' },
  { slug: 'image-brightness-contrast', name: 'Image Brightness', description: 'Adjust brightness and contrast', category: 'Image Tools' },
  // PDF
  { slug: 'pdf-to-jpg', name: 'PDF to JPG', description: 'Convert PDF pages to JPG', category: 'PDF Tools' },
  { slug: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF to Word', category: 'PDF Tools' },
  { slug: 'pdf-to-excel', name: 'PDF to Excel', description: 'Convert PDF to Excel', category: 'PDF Tools' },
  { slug: 'pdf-compressor', name: 'PDF Compressor', description: 'Compress PDF files', category: 'PDF Tools' },
  { slug: 'pdf-merger', name: 'PDF Merger', description: 'Merge PDF files', category: 'PDF Tools' },
  { slug: 'pdf-splitter', name: 'PDF Splitter', description: 'Split PDF into pages', category: 'PDF Tools' },
  { slug: 'pdf-rotator', name: 'PDF Rotator', description: 'Rotate PDF pages', category: 'PDF Tools' },
  { slug: 'pdf-unlocker', name: 'PDF Unlocker', description: 'Remove PDF password', category: 'PDF Tools' },
  { slug: 'pdf-watermarker', name: 'PDF Watermarker', description: 'Add watermarks to PDF', category: 'PDF Tools' },
  { slug: 'pdf-signer', name: 'PDF Signer', description: 'Sign PDF documents', category: 'PDF Tools' },
  // Video
  { slug: 'video-to-gif', name: 'Video to GIF', description: 'Convert video to GIF', category: 'Video Tools' },
  { slug: 'video-to-mp3', name: 'Video to MP3', description: 'Extract audio from video', category: 'Video Tools' },
  { slug: 'video-to-mp4', name: 'Video to MP4', description: 'Convert video to MP4', category: 'Video Tools' },
  { slug: 'video-compressor', name: 'Video Compressor', description: 'Compress video files', category: 'Video Tools' },
  { slug: 'video-resizer', name: 'Video Resizer', description: 'Resize video dimensions', category: 'Video Tools' },
  // Audio
  { slug: 'mp3-to-wav', name: 'MP3 to WAV', description: 'Convert MP3 to WAV', category: 'Audio Tools' },
  { slug: 'wav-to-mp3', name: 'WAV to MP3', description: 'Convert WAV to MP3', category: 'Audio Tools' },
  { slug: 'audio-compressor', name: 'Audio Compressor', description: 'Compress audio files', category: 'Audio Tools' },
  { slug: 'audio-volume-booster', name: 'Volume Booster', description: 'Boost audio volume', category: 'Audio Tools' },
  { slug: 'audio-trimmer', name: 'Audio Trimmer', description: 'Trim audio clips', category: 'Audio Tools' },
  // Code
  { slug: 'code-beautifier', name: 'Code Beautifier', description: 'Format and beautify code', category: 'Code Tools' },
  { slug: 'code-minifier', name: 'Code Minifier', description: 'Minify code files', category: 'Code Tools' },
  { slug: 'sql-formatter', name: 'SQL Formatter', description: 'Format SQL queries', category: 'Code Tools' },
  { slug: 'sql-minifier', name: 'SQL Minifier', description: 'Minify SQL queries', category: 'Code Tools' },
  { slug: 'code-diff-checker', name: 'Code Diff Checker', description: 'Compare code differences', category: 'Code Tools' },
  // Utility
  { slug: 'qr-generator', name: 'QR Code Generator', description: 'Generate QR codes for text or URLs', category: 'Utility Tools' },
  { slug: 'qr-scanner', name: 'QR Code Scanner', description: 'Scan QR codes from images', category: 'Utility Tools' },
  { slug: 'currency-converter', name: 'Currency Converter', description: 'Convert currencies with live rates', category: 'Utility Tools' },
  { slug: 'unit-converter', name: 'Unit Converter', description: 'Convert units of measurement', category: 'Utility Tools' },
  { slug: 'password-generator', name: 'Password Generator', description: 'Generate secure passwords', category: 'Utility Tools' },
  { slug: 'word-counter', name: 'Word Counter', description: 'Count words and characters', category: 'Utility Tools' },
  { slug: 'json-formatter', name: 'JSON Formatter', description: 'Format and beautify JSON', category: 'Utility Tools' },
  { slug: 'base64-encoder', name: 'Base64 Encoder', description: 'Encode and decode Base64', category: 'Utility Tools' },
  { slug: 'url-encoder', name: 'URL Encoder', description: 'Encode and decode URLs', category: 'Utility Tools' },
  { slug: 'uuid-generator', name: 'UUID Generator', description: 'Generate unique identifiers', category: 'Utility Tools' },
  // Web
  { slug: 'website-screenshot', name: 'Website Screenshot', description: 'Capture website screenshots', category: 'Web Tools' },
  { slug: 'website-qr', name: 'Website QR Code', description: 'Generate QR codes for websites', category: 'Web Tools' },
  { slug: 'website-speed-test', name: 'Website Speed Test', description: 'Test website performance', category: 'Web Tools' },
  { slug: 'website-seo-check', name: 'Website SEO Check', description: 'Analyze website SEO', category: 'Web Tools' },
  { slug: 'website-security-check', name: 'Website Security Check', description: 'Check website security', category: 'Web Tools' },
]
