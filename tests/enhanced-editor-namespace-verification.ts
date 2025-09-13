/**
 * ElementorEditor Namespace Enhancement Verification
 *
 * This test demonstrates the enhanced ElementorEditor namespace types
 * that replace previous 'any' types with proper TypeScript interfaces.
 */

import {
  ElementorEditorModules,
  ElementorEditorUtils,
  ElementorEditorElements,
  ElementorEditorViews,
  Container,
  ContainerArgs,
  EditorModule,
  Introduction,
  BaseSettings,
  ControlsStackView,
} from "../src/editor/namespace";

import { ElementorModules } from "../src/globals/elementor-modules";

// Test that ElementorEditor namespace is properly typed
declare const elementorModules: ElementorModules;

function testElementorEditorNamespace() {
  // Test that editor namespace exists and is properly typed
  if (elementorModules.editor) {
    const editor = elementorModules.editor;

    // Test Container class
    const containerArgs: ContainerArgs = {
      type: "widget",
      id: "test-widget-123",
      model: {} as any,
      settings: {} as any,
      view: {} as any,
      parent: false,
      label: "Test Widget",
      controls: {},
    };

    const container = new editor.Container(containerArgs);

    // Test Container methods and properties
    container.type; // string
    container.id; // string
    container.label; // string
    container.render();
    container.renderUI();
    const isEditable: boolean = container.isEditable();
    const isLocked: boolean = container.isLocked();

    // Test editor utils
    const utils = editor.utils;
    const editorModule = new utils.Module();
    editorModule.onInit();
    editorModule.onElementorLoaded();

    const introduction = new utils.Introduction();
    introduction.show();
    introduction.hide();
    const isActive: boolean = introduction.isActive();

    // Test editor elements
    const elements = editor.elements;
    const baseSettings = new elements.models.BaseSettings();
    baseSettings.set("test", "value");
    const value = baseSettings.get("test");
    const hasAttribute: boolean = baseSettings.has("test");

    // Test editor views
    const views = editor.views;
    const controlsStack = new views.ControlsStack();
    const className: string = controlsStack.className();
    const templateHelpers = controlsStack.templateHelpers();
    controlsStack.onReloadButtonClick();
  }
}

// Test type compatibility
function testTypeCompatibility() {
  // Test that the enhanced interfaces are compatible with expected usage
  const container: Container = {} as Container;

  // Container properties
  container.type; // string
  container.id; // string
  container.model; // any (Backbone.Model)
  container.settings; // any (Backbone.Model)
  container.parent; // Container | null
  container.children; // ChildrenArray
  container.controls; // Record<string, any>

  // Container methods
  container.render();
  container.renderUI();
  const editable: boolean = container.isEditable();
  const designable: boolean = container.isDesignable();
  const gridContainer: boolean = container.isGridContainer();
  const locked: boolean = container.isLocked();

  // Editor module functionality
  const editorModule: EditorModule = {} as EditorModule;
  editorModule.onInit();
  editorModule.onElementorLoaded();
  const controlView = editorModule.getEditorControlView("test");
  const controlModel = editorModule.getEditorControlModel("test");

  // Base settings functionality
  const baseSettings: BaseSettings = {} as BaseSettings;
  baseSettings.set("key", "value");
  baseSettings.set({ key1: "value1", key2: "value2" });
  const value = baseSettings.get("key");
  const hasKey: boolean = baseSettings.has("key");
  const json = baseSettings.toJSON();

  // Controls stack view functionality
  const controlsStack: ControlsStackView = {} as ControlsStackView;
  const className: string = controlsStack.className();
  const helpers = controlsStack.templateHelpers();
  const childOptions = controlsStack.childViewOptions();
  const uiSelectors = controlsStack.ui();
  const events = controlsStack.events();
  controlsStack.onReloadButtonClick();
  controlsStack.onModelDestroy();
}

export { testElementorEditorNamespace, testTypeCompatibility };

/*
Enhanced ElementorEditor Types Summary:
=====================================

Before: Many 'any' types in ElementorEditor namespace
After: Comprehensive interfaces for all major components

Key Improvements:
- Container: Full interface with properties and methods
- Utils: Module and Introduction classes with proper typing
- Elements: BaseSettings model with Backbone-style methods
- Views: ControlsStack with Marionette.CompositeView methods

All critical editor functionality now has proper TypeScript support.
*/
