import os
import re

base_dir = r"c:\Users\moksh\OneDrive\Desktop\empty_folder\pixmorph"
pdf_utils_path = os.path.join(base_dir, "lib", "pdf-utils.ts")

# Add mp3 encoding to pdf-utils.ts
with open(pdf_utils_path, "r", encoding="utf-8") as f:
    pdf_utils_content = f.read()

if "import lamejs" not in pdf_utils_content:
    mp3_func = """
import lamejs from 'lamejs'

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
"""
    pdf_utils_content = mp3_func + pdf_utils_content
    with open(pdf_utils_path, "w", encoding="utf-8") as f:
        f.write(pdf_utils_content)

# Fix MP3ToWAV
mp3_to_wav = os.path.join(base_dir, "components", "conversion", "MP3ToWAV.tsx")
with open(mp3_to_wav, "r", encoding="utf-8") as f:
    c = f.read()
c = c.replace("const audioContext = new AudioContext()", "const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;\n        const audioContext = new AudioCtx()")
with open(mp3_to_wav, "w", encoding="utf-8") as f:
    f.write(c)

# Fix WAVToMP3
wav_to_mp3 = os.path.join(base_dir, "components", "conversion", "WAVToMP3.tsx")
with open(wav_to_mp3, "r", encoding="utf-8") as f:
    c = f.read()
c = c.replace("const createDummyMP3 = (): ArrayBuffer =>\n  new Uint8Array([0x49, 0x44, 0x33, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).buffer", "")
if "import { audioBufferToMp3 }" not in c:
    c = c.replace("import toast from 'react-hot-toast'", "import toast from 'react-hot-toast'\nimport { audioBufferToMp3 } from '@/lib/pdf-utils'")
c = c.replace("const audioContext = new AudioContext()", "const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;\n        const audioContext = new AudioCtx()")
c = c.replace("await audioContext.decodeAudioData(arrayBuffer)", "const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)")
c = c.replace("const mp3Data = createDummyMP3()", "const mp3Data = audioBufferToMp3(audioBuffer, 192)")
with open(wav_to_mp3, "w", encoding="utf-8") as f:
    f.write(c)

# Fix AudioCompressor
audio_compressor = os.path.join(base_dir, "components", "conversion", "AudioCompressor.tsx")
with open(audio_compressor, "r", encoding="utf-8") as f:
    c = f.read()
c = c.replace("const createDummyMP3 = (): ArrayBuffer =>\n  new Uint8Array([0x49, 0x44, 0x33, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).buffer", "")
if "import { audioBufferToMp3 }" not in c:
    c = c.replace("import toast from 'react-hot-toast'", "import toast from 'react-hot-toast'\nimport { audioBufferToMp3 } from '@/lib/pdf-utils'")
c = c.replace("const audioContext = new AudioContext()", "const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;\n        const audioContext = new AudioCtx()")
c = c.replace("await audioContext.decodeAudioData(arrayBuffer)", "const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)")
c = c.replace("const compressedData = createDummyMP3()", "const compressedData = audioBufferToMp3(audioBuffer, 64) // Compress to 64kbps")
with open(audio_compressor, "w", encoding="utf-8") as f:
    f.write(c)

# Fix AudioTrimmer
audio_trimmer = os.path.join(base_dir, "components", "conversion", "AudioTrimmer.tsx")
with open(audio_trimmer, "r", encoding="utf-8") as f:
    c = f.read()
c = c.replace("const createDummyMP3 = (): ArrayBuffer =>\n  new Uint8Array([0x49, 0x44, 0x33, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).buffer", "")
if "import { audioBufferToMp3 }" not in c:
    c = c.replace("import toast from 'react-hot-toast'", "import toast from 'react-hot-toast'\nimport { audioBufferToMp3 } from '@/lib/pdf-utils'")
c = c.replace("const audioContext = new AudioContext()", "const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;\n        const audioContext = new AudioCtx()")
c = c.replace("await audioContext.decodeAudioData(arrayBuffer)", "const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)")
trim_logic = """
        const startOffset = Math.floor(startTime * audioBuffer.sampleRate);
        const endOffset = Math.floor(endTime * audioBuffer.sampleRate);
        const actualEnd = Math.min(endOffset, audioBuffer.length);
        const newLength = actualEnd - startOffset;
        
        let trimmedData: ArrayBuffer;
        if (newLength > 0 && startOffset < audioBuffer.length) {
            const trimmedBuffer = audioContext.createBuffer(audioBuffer.numberOfChannels, newLength, audioBuffer.sampleRate);
            for (let ch = 0; ch < audioBuffer.numberOfChannels; ch++) {
                const channelData = audioBuffer.getChannelData(ch);
                const trimmedChannel = new Float32Array(newLength);
                for (let j = 0; j < newLength; j++) {
                    trimmedChannel[j] = channelData[startOffset + j];
                }
                trimmedBuffer.getChannelData(ch).set(trimmedChannel);
            }
            trimmedData = audioBufferToMp3(trimmedBuffer, 128);
        } else {
            trimmedData = audioBufferToMp3(audioBuffer, 128);
        }
"""
c = c.replace("const trimmedData = createDummyMP3()", trim_logic.strip())
with open(audio_trimmer, "w", encoding="utf-8") as f:
    f.write(c)

# Fix VolumeBooster
volume_booster = os.path.join(base_dir, "components", "conversion", "VolumeBooster.tsx")
with open(volume_booster, "r", encoding="utf-8") as f:
    c = f.read()
c = c.replace("const createDummyMP3 = (): ArrayBuffer =>\n  new Uint8Array([0x49, 0x44, 0x33, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).buffer", "")
if "import { audioBufferToMp3 }" not in c:
    c = c.replace("import toast from 'react-hot-toast'", "import toast from 'react-hot-toast'\nimport { audioBufferToMp3 } from '@/lib/pdf-utils'")
c = c.replace("const audioContext = new AudioContext()", "const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;\n        const audioContext = new AudioCtx()")
c = c.replace("await audioContext.decodeAudioData(arrayBuffer)", "const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)")
boost_logic = """
        const boostedBuffer = audioContext.createBuffer(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate);
        for (let ch = 0; ch < audioBuffer.numberOfChannels; ch++) {
            const channelData = audioBuffer.getChannelData(ch);
            const boostedChannel = new Float32Array(audioBuffer.length);
            for (let j = 0; j < audioBuffer.length; j++) {
                boostedChannel[j] = Math.max(-1, Math.min(1, channelData[j] * boostLevel));
            }
            boostedBuffer.getChannelData(ch).set(boostedChannel);
        }
        const boostedData = audioBufferToMp3(boostedBuffer, 128);
"""
c = c.replace("const boostedData = createDummyMP3()", boost_logic.strip())
with open(volume_booster, "w", encoding="utf-8") as f:
    f.write(c)

print("Audio tools fixed!")
