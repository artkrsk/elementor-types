/**
 * Lightbox System
 *
 * Export all lightbox interfaces and types
 */

export * from './lightbox-manager';
export * from './lightbox';

export { default as LightboxManager } from './lightbox-manager';
export { default as Lightbox } from './lightbox';

// Re-export commonly used types
export type { LightboxSettings, LightboxElements } from './lightbox-manager';
export type { LightboxConfig, LightboxSlide } from './lightbox';