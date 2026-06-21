'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { useEffect, useState } from 'react';

const ALL_TOOLS = [
  { name: 'Audio Compressor', href: '/audio-compressor', desc: 'Compress audio files online for free. Reduce audio file size...' },
  { name: 'Audio Editor', href: '/audio-editor', desc: 'Edit audio waveforms. Free online tool.' },
  { name: 'Audio Merger', href: '/audio-merger', desc: 'Merge audio files. Free online tool.' },
  { name: 'Audio Pitch Changer', href: '/audio-pitch-changer', desc: 'Change audio pitch. Free online tool.' },
  { name: 'Audio Recorder', href: '/audio-recorder', desc: 'Record audio from microphone. Free online tool.' },
  { name: 'Audio Splitter', href: '/audio-splitter', desc: 'Split audio into parts. Free online tool.' },
  { name: 'Audio Trimmer', href: '/audio-trimmer', desc: 'Trim audio clips online for free. Cut and trim audio files t...' },
  { name: 'Volume Booster', href: '/audio-volume-booster', desc: 'Boost audio volume online for free. Increase the loudness of...' },
  { name: 'Banner Maker', href: '/banner-maker', desc: 'Create banners. Free online tool.' },
  { name: 'Base64 Decoder', href: '/base64-decoder', desc: 'Decode Base64 strings. Free online tool.' },
  { name: 'Base64 Encoder', href: '/base64-encoder', desc: 'Encode text or files to Base64 format. Free online tool for ...' },
  { name: 'Character Counter', href: '/character-counter', desc: 'Count characters in text. Free online tool.' },
  { name: 'Code Beautifier', href: '/code-beautifier', desc: 'Format and beautify code online for free. Make your code rea...' },
  { name: 'Code Diff Checker', href: '/code-diff-checker', desc: 'Compare code differences online for free. Side-by-side diff ...' },
  { name: 'Code Minifier', href: '/code-minifier', desc: 'Minify code files online for free. Reduce code size by remov...' },
  { name: 'CSS Formatter', href: '/css-formatter', desc: 'Format CSS code. Free online tool.' },
  { name: 'CSS Minifier', href: '/css-minifier', desc: 'Minify CSS code. Free online tool.' },
  { name: 'CSV to HTML', href: '/csv-to-html', desc: 'Convert CSV to HTML table. Free online tool.' },
  { name: 'Currency Converter', href: '/currency-converter', desc: 'Convert currencies with live exchange rates. Free online too...' },
  { name: 'HEIC to AVIF', href: '/heic-to-avif', desc: 'Convert HEIC images to AVIF format online for free. Next-gen...' },
  { name: 'HEIC to JPG', href: '/heic-to-jpg', desc: 'Convert iPhone HEIC photos to JPG format online for free. Fa...' },
  { name: 'HEIC to PNG', href: '/heic-to-png', desc: 'Convert HEIC images to PNG format online for free. Preserve ...' },
  { name: 'HEIC to WebP', href: '/heic-to-webp', desc: 'Convert HEIC images to WebP format online for free. Smaller ...' },
  { name: 'HTML Decoder', href: '/html-decoder', desc: 'Decode HTML entities. Free online tool.' },
  { name: 'HTML Encoder', href: '/html-encoder', desc: 'Encode HTML entities. Free online tool.' },
  { name: 'HTML to CSV', href: '/html-to-csv', desc: 'Convert HTML table to CSV. Free online tool.' },
  { name: 'Icon Maker', href: '/icon-maker', desc: 'Create custom icons. Free online tool.' },
  { name: 'Image Blur Tool', href: '/image-blurrer', desc: 'Apply Gaussian blur to your images online for free. Adjust i...' },
  { name: 'Image Brightness & Contrast', href: '/image-brightness-contrast', desc: 'Adjust the brightness and contrast of your images online for...' },
  { name: 'Image Color Extractor', href: '/image-color-extractor', desc: 'Extract dominant color palettes from any image online for fr...' },
  { name: 'Image Compressor', href: '/image-compressor', desc: 'Compress images online for free. Reduce file size without lo...' },
  { name: 'Image Cropper', href: '/image-crop', desc: 'Crop images online for free. Trim and cut images to your des...' },
  { name: 'Image Enhancer', href: '/image-enhancer', desc: 'Enhance image quality online for free. Improve brightness, c...' },
  { name: 'Image Flip Tool', href: '/image-flip', desc: 'Flip your image horizontally, vertically, or both directions...' },
  { name: 'Image Mirror', href: '/image-mirror', desc: 'Mirror your image horizontally or vertically online for free...' },
  { name: 'Image Resizer', href: '/image-resizer', desc: 'Resize images online for free. Change dimensions and scale i...' },
  { name: 'Image Rotator', href: '/image-rotator', desc: 'Rotate images online for free. Flip and rotate images 90, 18...' },
  { name: 'Image Sharper', href: '/image-sharper', desc: 'Sharpen blurry images online for free. Make photos crisper a...' },
  { name: 'Image to Black & White', href: '/image-to-bw', desc: 'Convert any image to grayscale black and white using luminan...' },
  { name: 'Image to Cartoon', href: '/image-to-cartoon', desc: 'Convert any image to a cartoon style. Free online tool for c...' },
  { name: 'Image to Painting', href: '/image-to-painting', desc: 'Convert any image to an oil painting style. Free online tool...' },
  { name: 'Image to Sepia', href: '/image-to-sepia', desc: 'Apply a warm sepia vintage filter to your photos online for ...' },
  { name: 'Image to Sketch', href: '/image-to-sketch', desc: 'Convert any image to a pencil sketch. Free online tool for c...' },
  { name: 'JS Formatter', href: '/js-formatter', desc: 'Format JavaScript code. Free online tool.' },
  { name: 'JSON Formatter', href: '/json-formatter', desc: 'Format and beautify JSON data. Free online tool for pretty-p...' },
  { name: 'JSON Minifier', href: '/json-minifier', desc: 'Minify JSON objects. Free online tool.' },
  { name: 'JSON to YAML', href: '/json-to-yaml', desc: 'Convert JSON to YAML. Free online tool.' },
  { name: 'JSON Validator', href: '/json-validator', desc: 'Validate JSON formatting. Free online tool.' },
  { name: 'Logo Maker', href: '/logo-maker', desc: 'Create custom logos. Free online tool.' },
  { name: 'Markdown to HTML', href: '/markdown-to-html', desc: 'Convert Markdown to HTML. Free online tool.' },
  { name: 'MD5 Generator', href: '/md5-generator', desc: 'Generate MD5 hash. Free online tool.' },
  { name: 'MP3 to WAV', href: '/mp3-to-wav', desc: 'Convert MP3 to WAV online for free. High-quality uncompresse...' },
  { name: 'Password Generator', href: '/password-generator', desc: 'Generate secure passwords with customizable options. Free on...' },
  { name: 'PDF Add Page', href: '/pdf-add-page', desc: 'Add blank pages to PDF. Free online tool.' },
  { name: 'PDF Compressor', href: '/pdf-compressor', desc: 'Compress PDF files online for free. Reduce PDF file size whi...' },
  { name: 'PDF Merger', href: '/pdf-merger', desc: 'Merge PDF files online for free. Combine multiple PDF docume...' },
  { name: 'PDF Page Extractor', href: '/pdf-page-extractor', desc: 'Extract pages from PDF. Free online tool.' },
  { name: 'PDF Page Remover', href: '/pdf-page-remover', desc: 'Remove pages from PDF. Free online tool.' },
  { name: 'PDF Page Reorder', href: '/pdf-page-reorder', desc: 'Reorder pages in PDF. Free online tool.' },
  { name: 'PDF Rotator', href: '/pdf-rotator', desc: 'Rotate PDF pages online for free. Change page orientation in...' },
  { name: 'PDF Signer', href: '/pdf-signer', desc: 'Sign PDF documents online for free. Add your signature to PD...' },
  { name: 'PDF Splitter', href: '/pdf-splitter', desc: 'Split PDF into separate pages online for free. Extract indiv...' },
  { name: 'PDF to DOCX', href: '/pdf-to-docx', desc: 'Convert PDF to Word DOCX. Free online tool.' },
  { name: 'PDF to ePub', href: '/pdf-to-epub', desc: 'Convert PDF to ePub. Free online tool.' },
  { name: 'PDF to Excel', href: '/pdf-to-excel', desc: 'Convert PDF to Excel spreadsheets online for free. Extract t...' },
  { name: 'PDF to HTML', href: '/pdf-to-html', desc: 'Convert PDF to HTML. Free online tool.' },
  { name: 'PDF to JPG', href: '/pdf-to-jpg', desc: 'Convert PDF pages to JPG images online for free. Extract hig...' },
  { name: 'PDF to JSON', href: '/pdf-to-json', desc: 'Convert PDF to JSON. Free online tool.' },
  { name: 'PDF to Markdown', href: '/pdf-to-markdown', desc: 'Convert PDF to Markdown. Free online tool.' },
  { name: 'PDF to MOBI', href: '/pdf-to-mobi', desc: 'Convert PDF to MOBI. Free online tool.' },
  { name: 'PDF to PPT', href: '/pdf-to-ppt', desc: 'Convert PDF to PowerPoint. Free online tool.' },
  { name: 'PDF to RTF', href: '/pdf-to-rtf', desc: 'Convert PDF to RTF. Free online tool.' },
  { name: 'PDF to SVG', href: '/pdf-to-svg', desc: 'Convert PDF to SVG. Free online tool.' },
  { name: 'PDF to TXT', href: '/pdf-to-txt', desc: 'Convert PDF to Text. Free online tool.' },
  { name: 'PDF to Word', href: '/pdf-to-word', desc: 'Convert PDF to Word documents online for free. Edit PDF cont...' },
  { name: 'PDF to XML', href: '/pdf-to-xml', desc: 'Convert PDF to XML. Free online tool.' },
  { name: 'PDF Unlocker', href: '/pdf-unlocker', desc: 'Remove PDF password protection online for free. Unlock passw...' },
  { name: 'PDF Watermarker', href: '/pdf-watermarker', desc: 'Add watermarks to PDF documents online for free. Protect you...' },
  { name: 'Poster Maker', href: '/poster-maker', desc: 'Create posters. Free online tool.' },
  { name: 'QR Code Generator', href: '/qr-generator', desc: 'Generate QR codes instantly for any URL or text. Free online...' },
  { name: 'QR Code Scanner', href: '/qr-scanner', desc: 'Scan QR codes using your camera. Free online tool for readin...' },
  { name: 'Resume Maker', href: '/resume-maker', desc: 'Create resumes. Free online tool.' },
  { name: 'SHA Generator', href: '/sha-generator', desc: 'Generate SHA hash. Free online tool.' },
  { name: 'SQL Formatter', href: '/sql-formatter', desc: 'Format SQL queries online for free. Beautify and organize yo...' },
  { name: 'SQL Minifier', href: '/sql-minifier', desc: 'Minify SQL queries online for free. Compress SQL code by rem...' },
  { name: 'Unit Converter', href: '/unit-converter', desc: 'Convert units of measurement including length, weight, tempe...' },
  { name: 'URL Decoder', href: '/url-decoder', desc: 'Decode URLs. Free online tool.' },
  { name: 'URL Encoder', href: '/url-encoder', desc: 'Encode URLs and query parameters. Free online tool for URL e...' },
  { name: 'UUID Generator', href: '/uuid-generator', desc: 'Generate universally unique identifiers (UUIDs). Free online...' },
  { name: 'UUID Validator', href: '/uuid-validator', desc: 'Validate UUIDs. Free online tool.' },
  { name: 'Video Compressor', href: '/video-compressor', desc: 'Compress video files online for free. Reduce video file size...' },
  { name: 'Video Cropper', href: '/video-cropper', desc: 'Crop video dimensions. Free online tool.' },
  { name: 'Video Resizer', href: '/video-resizer', desc: 'Resize video dimensions online for free. Change video width ...' },
  { name: 'Video Rotator', href: '/video-rotator', desc: 'Rotate video. Free online tool.' },
  { name: 'Video Speed Changer', href: '/video-speed-changer', desc: 'Change video playback speed. Free online tool.' },
  { name: 'Video Stabilizer', href: '/video-stabilizer', desc: 'Stabilize shaky video. Free online tool.' },
  { name: 'Video to GIF', href: '/video-to-gif', desc: 'Convert video to GIF online for free. Create animated GIFs f...' },
  { name: 'Video to MP3', href: '/video-to-mp3', desc: 'Extract audio from video online for free. Convert video file...' },
  { name: 'Video to MP4', href: '/video-to-mp4', desc: 'Convert video to MP4 online for free. Universal MP4 format c...' },
  { name: 'Video Trimmer', href: '/video-trimmer', desc: 'Trim video duration. Free online tool.' },
  { name: 'Watermark Remover', href: '/watermark-remover', desc: 'Remove watermarks from images and videos effortlessly. Free ...' },
  { name: 'WAV to MP3', href: '/wav-to-mp3', desc: 'Convert WAV to MP3 online for free. Compress audio files to ...' },
  { name: 'Website Age Check', href: '/website-age-check', desc: 'Check domain age. Free online tool.' },
  { name: 'Website DNS Lookup', href: '/website-dns-lookup', desc: 'DNS Records Lookup. Free online tool.' },
  { name: 'Website QR Code', href: '/website-qr', desc: 'Generate QR codes for any website URL. Free online tool for ...' },
  { name: 'Website Screenshot', href: '/website-screenshot', desc: 'Capture screenshots of any website. Free online tool for tak...' },
  { name: 'Website Security Check', href: '/website-security-check', desc: 'Check the security of any website. Free online tool for veri...' },
  { name: 'Website SEO Check', href: '/website-seo-check', desc: 'Check the SEO health of any website. Free online tool for an...' },
  { name: 'Website Speed Test', href: '/website-speed-test', desc: 'Test the speed and performance of any website. Free online t...' },
  { name: 'Word Counter', href: '/word-counter', desc: 'Count words, characters, lines, and sentences in any text. F...' },
  { name: 'YAML to JSON', href: '/yaml-to-json', desc: 'Convert YAML to JSON. Free online tool.' },
];

export function RelatedTools() {
  const pathname = usePathname();
  const [related, setRelated] = useState<typeof ALL_TOOLS>([]);

  useEffect(() => {
    // Deterministically pick 8 tools based on the current pathname
    const currentIndex = ALL_TOOLS.findIndex(t => t.href === pathname);
    const startIdx = currentIndex !== -1 ? (currentIndex + 1) % ALL_TOOLS.length : 0;
    
    const selected = [];
    for(let i=0; i<8; i++) {
      selected.push(ALL_TOOLS[(startIdx + i) % ALL_TOOLS.length]);
    }
    setRelated(selected);
  }, [pathname]);

  if (related.length === 0) return null; // Wait for hydration to avoid mismatch

  return (
    <section className="mt-24 border-t border-gray-100 dark:border-gray-800 pt-16 pb-12 bg-gray-50/50 dark:bg-gray-900/50">
      <Container>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((tool) => (
              <Link 
                key={tool.href} 
                href={tool.href}
                className="p-5 rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-xl transition-all group block"
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {tool.desc}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-bold hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors active:scale-95">
              Explore all 100+ tools →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
