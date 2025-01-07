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

export async function ensureWasmLoaded(format: string) {
  try {
    switch (format) {
      case 'avif':
        await import('@jsquash/avif').catch(err => {
          console.warn('AVIF support not available:', err);
          throw err;
        });
        break;
      case 'webp':
        await import('@jsquash/webp').catch(err => {
          console.warn('WebP support not available:', err);
          throw err;
        });
        break;
      // ... other formats ...
    }
  } catch (error) {
    console.error(`Failed to load WASM for ${format}:`, error);
    throw error;
  }
}

// Helper to check if a format is ready
export function isWasmReady(format: OutputType): boolean {
  return wasmInitialized.get(format) === true;
}