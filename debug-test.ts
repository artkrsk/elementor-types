// Debug test - check if the basic file import works
import * as ModelsNamespace from './src/editor/elements/models';
import * as ViewsNamespace from './src/editor/elements/views';

// Test direct access to model types
type MyElementModel = ModelsNamespace.ElementModel;
type MyWidgetModel = ModelsNamespace.WidgetModel;

// Test direct access to view types
type MySectionView = ViewsNamespace.SectionView;
type MyColumnView = ViewsNamespace.ColumnView;

console.log('Direct namespace import test');