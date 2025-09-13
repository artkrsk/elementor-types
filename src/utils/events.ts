/**
 * Events System
 * Event handling utilities for Elementor
 */

import { Module } from "../core";

/**
 * Events system for dispatching custom events
 */
export declare class Events extends Module {
  /**
   * Dispatch a custom event on a context element
   */
  dispatch(
    context: HTMLElement | JQuery<HTMLElement>,
    event: string,
    data?: any
  ): void;
}
