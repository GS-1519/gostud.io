import type { OutputType } from '@/lib/types/encoders'

// Track WASM module initialization
const wasmInitialized = new Map<OutputType, boolean>();

// Preload common formats
export async function preloadWasmModules() {
  // Start with WebP as it's most commonly used
  await ensureWasmLoaded('webp');
  
  // Load other formats in parallel
  await Promise.all([
    ensureWasmLoaded('avif'),
    ensureWasmLoaded('jpeg'),
    ensureWasmLoaded('png')
  ]).catch(error => {
    console.warn('Some formats failed to preload:', error);
  });
}

export async function ensureWasmLoaded(format: OutputType): Promise<void> {
  if (wasmInitialized.get(format)) return;
  
  try {
    // Load each format independently
    switch (format) {
      case 'avif':
        await import(/* webpackChunkName: "avif-codec" */ '@jsquash/avif');
        break;
      case 'jxl':
        await import(/* webpackChunkName: "jxl-codec" */ '@jsquash/jxl');
        break;
      case 'jpeg':
        await import(/* webpackChunkName: "jpeg-codec" */ '@jsquash/jpeg');
        break;
      case 'png':
        await import(/* webpackChunkName: "png-codec" */ '@jsquash/png');
        break;
      case 'webp':
        await import(/* webpackChunkName: "webp-codec" */ '@jsquash/webp');
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
    wasmInitialized.set(format, true);
  } catch (error) {
    console.error(`Failed to initialize ${format}:`, error);
    wasmInitialized.set(format, false);
    throw error;
  }
}

// Helper to check if a format is ready
export function isWasmReady(format: OutputType): boolean {
  return wasmInitialized.get(format) === true;
}