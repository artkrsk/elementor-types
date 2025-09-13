/**
 * Additional Utility Classes
 * Various utility classes for Elementor functionality
 */

import { Module } from "../core";

/**
 * React integration utilities
 */
export declare class React extends Module {
  /**
   * Render a React component to an element
   */
  render(component: any, element: HTMLElement): void;

  /**
   * Unmount a React component from an element
   */
  unmount(element: HTMLElement): void;
}

/**
 * Time utilities
 */
export declare class Time extends Module {
  /**
   * Get user timestamp string
   */
  getUserTimestamp(date?: Date): string;

  /**
   * Format timestamp to readable time
   */
  formatTime(timestamp: number): string;
}

/**
 * Notification system
 */
export declare class Notifications extends Module {
  /**
   * Show a toast notification
   */
  showToast(options: {
    message: string;
    type?: "info" | "success" | "warning" | "error";
    duration?: number;
  }): void;
}

/**
 * Introduction system for onboarding
 */
export declare class Introduction extends Module {
  /**
   * Show an introduction
   */
  show(introductionId: string): void;

  /**
   * Hide an introduction
   */
  hide(introductionId: string): void;

  /**
   * Check if introduction has been viewed
   */
  hasViewed(introductionId: string): boolean;

  /**
   * Mark introduction as viewed
   */
  markAsViewed(introductionId: string): void;
}

/**
 * JSON upload warning message utility
 */
export declare class JsonUploadWarningMessage extends Module {
  /**
   * Show warning message
   */
  show(message: string): void;

  /**
   * Hide warning message
   */
  hide(): void;
}

/**
 * Tiers system for feature management
 */
export declare class Tiers extends Module {
  TIERS: {
    free: string;
    essential: string;
    advanced: string;
    expert: string;
  };
}
