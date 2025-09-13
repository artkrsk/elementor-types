/**
 * YouTube Integration Types
 * Types for YouTube player integration
 */

/**
 * YouTube API types
 */
export interface YouTubeAPI {
  Player: any;
  PlayerState: {
    PLAYING: number;
    PAUSED: number;
    ENDED: number;
  };
  loaded: boolean;
}

/**
 * Vimeo API types
 */
export interface VimeoAPI {
  Player: any;
}
