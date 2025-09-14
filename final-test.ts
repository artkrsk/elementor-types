/**
 * Final test to verify Task 9 - main index exports work correctly
 */

// Test namespace imports (this should work)
import type { Editor, Core, Frontend, Utils } from './src/index';

// Test namespace access to new element system (Task 5 structure)
type TestElementModel = Editor.Elements.Models.ElementModel;
type TestWidgetModel = Editor.Elements.Models.WidgetModel;
type TestElementsCollection = Editor.Elements.Collections.ElementsCollection;
type TestSectionView = Editor.Elements.Views.SectionView;

// Test that controls are still accessible
type TestColorControl = Editor.Controls.Color;

// Test global interfaces are accessible
import type {
  ElementorModules,
  ElementorFrontend,
  ElementorEditor
} from './src/index';

// Verify the types compile correctly
const testEditor: ElementorEditor = {} as any;
const testFrontend: ElementorFrontend = {} as any;
const testModules: ElementorModules = {} as any;

console.log('Task 9 - All main index exports working correctly!');