/**
 * Test file to verify main index exports work correctly
 * This file tests both namespace and direct imports
 */

// Test namespace imports
import type { Editor, Core, Frontend, Utils } from './src/index';

// Test direct imports of element system (Task 5)
import type {
  ElementModel,
  WidgetModel,
  BaseElementView,
  ElementsCollection,
  SectionModel,
  ColumnModel,
  ContainerModel,
  SectionView,
  ColumnView,
  WidgetView,
  ContainerView,
  ElementorFrontend,
  ElementorEditor
} from './src/index';

// Test namespace access to new element system
type TestElementModel = Editor.Elements.ElementModel;
type TestWidgetModel = Editor.Elements.WidgetModel;
type TestElementsCollection = Editor.Elements.ElementsCollection;

// Test that controls are still accessible
type TestControl = Editor.Controls.Base;

// Verify the types compile correctly
const testElementModel: ElementModel = {} as any;
const testWidgetView: WidgetView = {} as any;
const testCollection: ElementsCollection = {} as any;

console.log('All exports working correctly!');