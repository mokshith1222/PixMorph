declare module 'heic2any' {
  interface Heic2anyOptions {
    blob: Blob
    toType: string
    quality?: number
  }
  function heic2any(options: Heic2anyOptions): Promise<Blob | Blob[]>
  export default heic2any
}

declare module 'compressorjs' {
  interface CompressorOptions {
    quality?: number
    success?(result: Blob | File): void
    error?(err: Error): void
  }
  class Compressor {
    constructor(file: File | Blob, options?: CompressorOptions)
  }
  export default Compressor
}
