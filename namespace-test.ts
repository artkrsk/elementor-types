// Simple namespace test
import type { Editor } from './src/index';

// Check if we can access the Elements namespace
type Test1 = Editor.Elements;

// Check if we can access the Models namespace within Elements
type Test2 = Editor.Elements.Models;

console.log('Namespace test');