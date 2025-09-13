/**
 * Gutenberg Integration Module Types
 * Types for Gutenberg/Block Editor integration
 */

export interface GutenbergConfig {
  enabled: boolean;
  post_types: string[];
  elementor_block_enabled: boolean;
}

export interface GutenbergModule {
  config: GutenbergConfig;

  // Integration management
  isEnabled(): boolean;
  isEnabledForPostType(postType: string): boolean;

  // Block registration
  registerElementorBlock(): void;
  unregisterElementorBlock(): void;

  // Editor switching
  switchToElementor(): void;
  switchToGutenberg(): void;
  canSwitchEditor(): boolean;
}
