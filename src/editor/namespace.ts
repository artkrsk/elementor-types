/**
 * ElementorEditor Namespace Interfaces
 *
 * Comprehensive type definitions for ElementorEditor components
 * including Container, utils, elements, and views
 */

import type { ModuleElements } from "../core";
import type { BackboneModel } from "../third-party";
import type { ControlsStackView } from './views/window-views';

/**
 * Arguments object for container creation
 */
export interface ContainerArgs {
  type: string;
  id: string;
  model: BackboneModel;
  settings: BackboneModel;
  view: any; // View instance
  parent: Container | false;
  label: string;
  controls: Record<string, any>;
}

/**
 * Container children array utility
 */
export interface ChildrenArray extends Array<Container> {
  // Array methods with container-specific functionality
}

/**
 * Container panel interface
 */
export interface ContainerPanel {
  container: Container;
}

/**
 * Main Container class interface
 */
export interface Container {
  // Static constants
  TYPE_REPEATER: string;
  TYPE_REPEATER_ITEM: string;

  // Properties
  type: string;
  id: string;
  document: any;
  model: BackboneModel;
  settings: BackboneModel;
  view: any; // View instance
  parent: Container | null;
  children: ChildrenArray;
  dynamic: BackboneModel;
  globals: BackboneModel;
  label: string;
  controls: Record<string, any>;
  repeaters: Record<string, any>;
  renderer: Container;
  panel: ContainerPanel;
  placeholders: Record<string, any>;

  // Methods
  constructor(args: ContainerArgs): void;
  initialize(): void;
  validateArgs(args: ContainerArgs): void;
  render(): void;
  renderUI(): void;
  isEditable(): boolean;
  isDesignable(): boolean;
  isGridContainer(): boolean;
  isLocked(): boolean;
  isViewElement(): boolean;
  addToParent(): void;
  removeFromParent(): void;
  handleChildrenRecursive(): void;
  handleRepeaterChildren(): void;
}

/**
 * Editor Module base class
 */
export interface EditorModule {
  onInit(): void;
  getEditorControlView(name: string): any;
  getEditorControlModel(name: string): any;
  onElementorInitComponents(): void;
  onElementorLoaded(): void;
  onDocumentLoaded(): void;
  onElementorReady(): void;
}

/**
 * Introduction utility
 */
export interface Introduction {
  // Introduction tooltip and help functionality
  show(): void;
  hide(): void;
  isActive(): boolean;
}

/**
 * Editor utils namespace
 */
export interface ElementorEditorUtils {
  /** Editor module base class constructor */
  Module: new () => EditorModule;

  /** Introduction utility constructor */
  Introduction: new () => Introduction;
}

/**
 * Base settings model for editor elements
 */
export interface BaseSettings {
  // Backbone model for element settings
  get(attribute: string): any;
  set(attributes: Record<string, any> | string, value?: any): this;
  has(attribute: string): boolean;
  unset(attribute: string): this;
  clear(): this;
  toJSON(): Record<string, any>;
}

/**
 * Editor element models namespace
 */
export interface ElementorEditorElementModels {
  /** Base settings model constructor */
  BaseSettings: new () => BaseSettings;
}

/**
 * Editor elements namespace
 */
export interface ElementorEditorElements {
  /** Element models */
  models: ElementorEditorElementModels;
}


/**
 * Editor views namespace
 */
export interface ElementorEditorViews {
  /** Controls stack view constructor */
  ControlsStack: new () => ControlsStackView;
}

/**
 * Complete ElementorEditor modules namespace
 */
export interface ElementorEditorModules {
  /** Editor elements */
  elements: ElementorEditorElements;

  /** Editor utilities */
  utils: ElementorEditorUtils;

  /** Editor views */
  views: ElementorEditorViews;

  /** Container class constructor */
  Container: new (args: ContainerArgs) => Container;
}
