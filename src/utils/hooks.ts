/**
 * Hooks System
 * Action and filter hooks for Elementor
 */

import { Module } from "../core";

/**
 * Hooks system for actions and filters
 */
export declare class Hooks extends Module {
  actions: { [key: string]: Function[] };
  filters: { [key: string]: Function[] };

  /**
   * Add an action hook
   */
  addAction(action: string, callback: Function, priority?: number): void;

  /**
   * Remove an action hook
   */
  removeAction(action: string, callback: Function): void;

  /**
   * Execute an action hook
   */
  doAction(action: string, ...args: any[]): void;

  /**
   * Add a filter hook
   */
  addFilter(filter: string, callback: Function, priority?: number): void;

  /**
   * Remove a filter hook
   */
  removeFilter(filter: string, callback: Function): void;

  /**
   * Apply filters to a value
   */
  applyFilters(filter: string, value: any, ...args: any[]): any;
}
