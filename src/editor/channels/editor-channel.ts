/**
 * Editor Channel Specific Interfaces
 * Detailed typing for window.elementor.channels.editor methods based on actual usage patterns
 */

import type { BackboneRadioChannel } from "../../third-party";
import type { ControlView } from "../main";

/**
 * Element view interface for channel events
 */
export interface ElementView {
  model: any;
  $el: JQuery<HTMLElement>;
  getContainer?(): any;
  render?(): this;
  isEditable?(): boolean;
}

/**
 * Changed model interface for edit settings events
 * Enhanced with better typing for common change scenarios
 */
export interface ChangedModel {
  /** Object containing the changed properties and their new values */
  changed: Record<string, any>;
  /** Get model attribute */
  get(attribute: string): any;
  /** Previous attribute values */
  previous(attribute: string): any;
  /** Check if specific attribute has changed */
  hasChanged(attribute: string): boolean;
  /** Get all changed attribute names */
  changedAttributes(): Record<string, any> | false;
}

/**
 * Device mode change details
 */
export interface DeviceChangeDetails {
  previous: string;
  current: string;
}

/**
 * Document change details
 */
export interface DocumentChangeDetails {
  documentId: string;
  changeType: 'content' | 'settings' | 'structure';
  affectedElements?: string[];
}

/**
 * Element selection change details
 */
export interface ElementChangeDetails {
  elementId: string;
  elementType: string;
  container: any;
  previous?: {
    elementId: string;
    elementType: string;
  };
}

/**
 * Icon setting configuration for insertion events
 */
export interface IconSetting {
  library: string;
  value: string;
  svg?: string;
}

/**
 * Editor channel event signatures
 * Maps event names to their callback function signatures
 */
export interface EditorChannelEvents {
  // Section events
  'section:activated': (sectionName: string, editor: any) => void;

  // Settings change events
  'change:editSettings': (changedModel: ChangedModel, elementView: ElementView) => void;
  'change': (controlView: ControlView, elementView?: ElementView) => void;
  'change:device': (deviceMode: string, details: DeviceChangeDetails) => void;
  'change:element': (elementView: ElementView, details: ElementChangeDetails) => void;
  'change:document': (document: any, details: DocumentChangeDetails) => void;
  'change:selection': (elementView: ElementView | null, previous?: ElementView | null) => void;

  // Kit change events
  'kit:change:stretchContainer': () => void;
  'kit:change:viewport': () => void;
  'kit:change:container': () => void;

  // Asset insertion events
  'svg:insertion': (data: any, valueId: string) => void;
  'fontIcon:insertion': (iconType: string, iconSetting: IconSetting) => void;
  'Icon:insertion': (iconType: string, iconValue: string, attributes: Record<string, any>, tag: string, view: ElementView) => void;
  'font:insertion': (fontType: string, font: string) => void;

  // Images manager events
  'imagesManager:detailsReceived': (data: any) => void;

  // Document events
  'saved': (data: any) => void; // deprecated
  'document:saved': (data: any) => void;

  // Status events
  'status:change': (status: boolean) => void;

  // Generic event handler
  [eventName: string]: (...args: any[]) => void;
}

/**
 * Editor channel request signatures
 * Maps request names to their return types
 */
export interface EditorChannelRequests {
  // Element state requests
  'element:dragged': ElementView | null;
  'contextMenu:targetView': ElementView | null;

  // Editor status requests
  'status': boolean;

  // Generic request handler
  [requestName: string]: any;
}

/**
 * Editor channel reply signatures
 * Maps reply names to their parameter types
 */
export interface EditorChannelReplies {
  // Element state replies
  'element:dragged': (elementView: ElementView | null) => void;
  'contextMenu:targetView': (elementView: ElementView | null) => void;

  // Editor status replies
  'status': (status: boolean) => void;

  // Generic reply handler
  [replyName: string]: (...args: any[]) => void;
}

/**
 * Enhanced Editor Channel Interface
 * Extends BackboneRadioChannel with specific editor event typing
 */
export interface ElementorEditorChannel extends BackboneRadioChannel {
  /**
   * Register event listener with specific event typing
   * @param event - Event name
   * @param callback - Event callback function
   * @param context - Optional callback context
   */
  on<K extends keyof EditorChannelEvents>(
    event: K,
    callback: EditorChannelEvents[K],
    context?: any
  ): this;

  /**
   * Register event listener with generic typing
   * @param event - Event name
   * @param callback - Event callback function
   * @param context - Optional callback context
   */
  on(event: string, callback: (...args: any[]) => void, context?: any): this;

  /**
   * Remove event listener with specific event typing
   * @param event - Event name
   * @param callback - Optional specific callback to remove
   * @param context - Optional callback context
   */
  off<K extends keyof EditorChannelEvents>(
    event: K,
    callback?: EditorChannelEvents[K],
    context?: any
  ): this;

  /**
   * Remove event listener with generic typing
   * @param event - Event name
   * @param callback - Optional specific callback to remove
   * @param context - Optional callback context
   */
  off(event?: string, callback?: Function, context?: any): this;

  /**
   * Trigger event with specific event typing
   * @param event - Event name
   * @param args - Event arguments
   */
  trigger<K extends keyof EditorChannelEvents>(
    event: K,
    ...args: Parameters<EditorChannelEvents[K]>
  ): this;

  /**
   * Trigger event with generic typing
   * @param event - Event name
   * @param args - Event arguments
   */
  trigger(event: string, ...args: any[]): this;

  /**
   * Make request with specific request typing
   * @param request - Request name
   * @param args - Request arguments
   */
  request<K extends keyof EditorChannelRequests>(
    request: K,
    ...args: any[]
  ): EditorChannelRequests[K];

  /**
   * Make request with generic typing
   * @param request - Request name
   * @param args - Request arguments
   */
  request(request: string, ...args: any[]): any;

  /**
   * Register reply handler with specific reply typing
   * @param reply - Reply name
   * @param callback - Reply callback function
   */
  reply<K extends keyof EditorChannelReplies>(
    reply: K,
    callback: EditorChannelReplies[K]
  ): this;

  /**
   * Register reply handler with generic typing
   * @param reply - Reply name
   * @param callback - Reply callback function
   */
  reply(reply: string, callback: (...args: any[]) => any): this;

  /**
   * Register one-time event listener
   * @param event - Event name
   * @param callback - Event callback function
   * @param context - Optional callback context
   */
  once<K extends keyof EditorChannelEvents>(
    event: K,
    callback: EditorChannelEvents[K],
    context?: any
  ): this;

  /**
   * Register one-time event listener with generic typing
   * @param event - Event name
   * @param callback - Event callback function
   * @param context - Optional callback context
   */
  once(event: string, callback: (...args: any[]) => void, context?: any): this;

  /**
   * Stop replying to requests
   * @param reply - Optional specific reply to stop
   * @param callback - Optional specific callback to remove
   */
  stopReplying(reply?: string, callback?: Function): this;
}

// ============================================================================
// Type Guards for Runtime Type Checking
// ============================================================================

/**
 * Check if object is a ChangedModel
 */
export function isChangedModel(obj: any): obj is ChangedModel {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'changed' in obj &&
    'get' in obj &&
    'previous' in obj &&
    typeof obj.get === 'function' &&
    typeof obj.previous === 'function'
  );
}

/**
 * Check if object is an ElementView
 */
export function isElementView(obj: any): obj is ElementView {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'model' in obj &&
    '$el' in obj &&
    obj.$el &&
    typeof obj.$el === 'object'
  );
}

/**
 * Check if object is DeviceChangeDetails
 */
export function isDeviceChangeDetails(obj: any): obj is DeviceChangeDetails {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'previous' in obj &&
    'current' in obj &&
    typeof obj.previous === 'string' &&
    typeof obj.current === 'string'
  );
}

/**
 * Check if object is DocumentChangeDetails
 */
export function isDocumentChangeDetails(obj: any): obj is DocumentChangeDetails {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'documentId' in obj &&
    'changeType' in obj &&
    typeof obj.documentId === 'string' &&
    ['content', 'settings', 'structure'].includes(obj.changeType)
  );
}

/**
 * Check if object is ElementChangeDetails
 */
export function isElementChangeDetails(obj: any): obj is ElementChangeDetails {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'elementId' in obj &&
    'elementType' in obj &&
    'container' in obj &&
    typeof obj.elementId === 'string' &&
    typeof obj.elementType === 'string'
  );
}