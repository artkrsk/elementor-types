/**
 * Test the ACTUAL working structure after Task 9 updates
 */

// This should work - importing Elements namespace directly
import * as Elements from './src/editor/elements';

// Test accessing the Models namespace within Elements
type MyElementModel = Elements.Models.ElementModel;
type MyWidgetModel = Elements.Models.WidgetModel;
type MySectionModel = Elements.Models.SectionModel;

// Test accessing the Views namespace within Elements
type MySectionView = Elements.Views.SectionView;
type MyColumnView = Elements.Views.ColumnView;
type MyWidgetView = Elements.Views.WidgetView;

// Test accessing the Collections namespace within Elements
type MyElementsCollection = Elements.Collections.ElementsCollection;

// Test accessing manager types
type MyElementsManager = Elements.ElementsManager;

console.log('Correct element namespace structure working!');