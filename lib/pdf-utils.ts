import * as lamejs from '@breezystack/lamejs'
export function audioBufferToMp3(buffer: AudioBuffer, kbps: number = 128): ArrayBuffer {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const mp3encoder = new lamejs.Mp3Encoder(numChannels, sampleRate, kbps);
  const mp3Data = [];

  const left = buffer.getChannelData(0);
  const right = numChannels > 1 ? buffer.getChannelData(1) : left;

  const sampleBlockSize = 1152;
  const int16Left = new Int16Array(left.length);
  const int16Right = new Int16Array(right.length);

  for (let i = 0; i < left.length; i++) {
    int16Left[i] = Math.max(-32768, Math.min(32767, left[i] * 32767.5));
    int16Right[i] = Math.max(-32768, Math.min(32767, right[i] * 32767.5));
  }

  for (let i = 0; i < left.length; i += sampleBlockSize) {
    const leftChunk = int16Left.subarray(i, i + sampleBlockSize);
    const rightChunk = int16Right.subarray(i, i + sampleBlockSize);
    const mp3buf = numChannels > 1 
      ? mp3encoder.encodeBuffer(leftChunk, rightChunk)
      : mp3encoder.encodeBuffer(leftChunk);
    if (mp3buf.length > 0) {
      mp3Data.push(mp3buf);
    }
  }

  const mp3buf = mp3encoder.flush();
  if (mp3buf.length > 0) {
    mp3Data.push(mp3buf);
  }

  const totalLength = mp3Data.reduce((acc, val) => acc + val.length, 0);
  const mp3Array = new Uint8Array(totalLength);
  let offset = 0;
  for (let i = 0; i < mp3Data.length; i++) {
    mp3Array.set(mp3Data[i], offset);
    offset += mp3Data[i].length;
  }
  return mp3Array.buffer;
}
let workerInitialized = false

async function initPdfJs() {
  const pdfjs = await import('pdfjs-dist')
  if (!workerInitialized && typeof window !== 'undefined') {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`
    workerInitialized = true
  }
  return pdfjs
}

async function loadPdf(file: File) {
  const pdfjs = await initPdfJs()
  const data = new Uint8Array(await file.arrayBuffer())
  return pdfjs.getDocument({ data }).promise
}

export async function extractTextFromPdf(file: File): Promise<string> {
  const pdf = await loadPdf(file)
  const pages: string[] = []

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const text = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ')
    pages.push(text)
  }

  return pages.join('\n\n')
}

export async function renderPdfPageToJpeg(
  file: File,
  pageNumber: number,
  scale = 2
): Promise<Blob> {
  const pdf = await loadPdf(file)
  const page = await pdf.getPage(pageNumber)
  const viewport = page.getViewport({ scale })
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) throw new Error('Could not get canvas context')

  canvas.width = viewport.width
  canvas.height = viewport.height

  await page.render({
    canvasContext: context,
    viewport,
    canvas,
  } as Parameters<typeof page.render>[0]).promise

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Failed to render page'))
      },
      'image/jpeg',
      0.92
    )
  })
}

export async function getPdfPageCount(file: File): Promise<number> {
  const pdf = await loadPdf(file)
  return pdf.numPages
}

export function textToRtf(text: string): string {
  const escaped = text
    .replace(/\\/g, '\\\\')
    .replace(/{/g, '\\{')
    .replace(/}/g, '\\}')
    .replace(/\n/g, '\\par\n')
  return `{\\rtf1\\ansi\\deff0{\\fonttbl{\\f0 Arial;}}\\f0\\fs24 ${escaped}}`
}

export function audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
  const numChannels = buffer.numberOfChannels
  const sampleRate = buffer.sampleRate
  const bitDepth = 16
  const bytesPerSample = bitDepth / 8
  const blockAlign = numChannels * bytesPerSample
  const dataLength = buffer.length * blockAlign
  const wav = new ArrayBuffer(44 + dataLength)
  const view = new DataView(wav)

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i))
    }
  }

  writeString(0, 'RIFF')
  view.setUint32(4, 36 + dataLength, true)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, numChannels, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * blockAlign, true)
  view.setUint16(32, blockAlign, true)
  view.setUint16(34, bitDepth, true)
  writeString(36, 'data')
  view.setUint32(40, dataLength, true)

  let offset = 44
  for (let i = 0; i < buffer.length; i++) {
    for (let channel = 0; channel < numChannels; channel++) {
      const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]))
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true)
      offset += 2
    }
  }

  return wav
}
