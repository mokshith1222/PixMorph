import Link from 'next/link';
import { Container } from '@/components/ui/Container';

const TOOLS = [
  { name: 'Image Compressor', href: '/image-compressor', desc: 'Reduce image file size instantly' },
  { name: 'Audio Trimmer', href: '/audio-trimmer', desc: 'Cut and trim audio files' },
  { name: 'PDF Merger', href: '/pdf-merger', desc: 'Combine multiple PDFs together' },
  { name: 'QR Generator', href: '/qr-generator', desc: 'Create custom QR codes' },
  { name: 'Image to Sketch', href: '/image-to-sketch', desc: 'Convert photo to drawing' },
  { name: 'Word Counter', href: '/word-counter', desc: 'Count words and characters' },
  { name: 'Password Generator', href: '/password-generator', desc: 'Create secure passwords' },
  { name: 'Base64 Encoder', href: '/base64-encoder', desc: 'Encode text to Base64 format' },
];

export function RelatedTools() {
  return (
    <section className="mt-24 border-t border-gray-100 dark:border-gray-800 pt-16 pb-12 bg-gray-50/50 dark:bg-gray-900/50">
      <Container>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOOLS.map((tool) => (
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
              Explore all 70+ tools →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
