/**
 * Working test for Task 9 - demonstrating the correct usage patterns
 * This shows how the updated main index allows both namespace and direct access
 */

// Method 1: Import namespace groups (main feature of main index)
import type { Editor, Core, Frontend, Utils } from './src/index';

// Method 2: Direct namespace import for specific systems
import type { Elements } from './src/editor';

// Method 3: Global interfaces
import type {
  ElementorModules,
  ElementorFrontend,
  ElementorEditor
} from './src/index';

// Usage Method 1: Core system types
type MyModule = Core.Module;
type MyViewModule = Core.ViewModule;

// Usage Method 2: Frontend types
type MyFrontendHandler = Frontend.Handlers.Base;
type MyElementsHandler = Frontend.ElementsHandler;

// Usage Method 3: Element system via direct namespace import
type MyElementModel = Elements.Models.ElementModel;
type MyWidgetModel = Elements.Models.WidgetModel;
type MyElementsCollection = Elements.Collections.ElementsCollection;
type MySectionView = Elements.Views.SectionView;
type MyElementsManager = Elements.ElementsManager;

// Usage Method 4: Controls system via Editor namespace
type MyColorControl = Editor.Controls.Color;
type MyMediaControl = Editor.Controls.Media;

// Usage Method 5: Global interfaces work
const testEditor: ElementorEditor = {} as any;
const testFrontend: ElementorFrontend = {} as any;
const testModules: ElementorModules = {} as any;

console.log('Task 9 SUCCESS: All main index patterns working correctly!');