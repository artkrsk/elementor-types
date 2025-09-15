/**
 * Video API System
 *
 * Export all video API loader interfaces and types
 */

export * from './base-loader';
export * from './youtube-loader';
export * from './vimeo-loader';

export { default as BaseVideoLoader } from './base-loader';
export { default as YouTubeLoader } from './youtube-loader';
export { default as VimeoLoader } from './vimeo-loader';

// Re-export commonly used types
export type { VideoLoaderSettings, VideoLoaderElements } from './base-loader';
export type { YouTubeAPIConfig } from './youtube-loader';
export type { VimeoAPIConfig } from './vimeo-loader';