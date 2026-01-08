# @artemsemkin/elementor-types

TypeScript type definitions for the [Elementor WordPress Page Builder](https://elementor.com/).

## Installation

```bash
npm install --save-dev @artemsemkin/elementor-types
```

## Usage

### Basic Types

```typescript
import type {
  ElementorFrontend,
  ElementorEditor,
} from "@artemsemkin/elementor-types";

// Access Elementor globals
declare global {
  interface Window {
    elementorFrontend: ElementorFrontend;
    elementor: ElementorEditor;
    $e: $e;
  }
}
```

### Control Types

```typescript
import type {
  DimensionsValue,
  ResponsiveValue,
  ColorValue,
} from "@artemsemkin/elementor-types";

interface MyWidgetSettings {
  margin: ResponsiveValue<DimensionsValue>;
  backgroundColor: ColorValue;
  fontSize: number;
}
```

### Container & Elements

```typescript
import type { Container, BackboneModel } from "@artemsemkin/elementor-types";

function processContainer(container: Container) {
  const settings = container.settings.attributes;
  const children = container.children;
  // TypeScript knows the shape of these objects
}
```

### Namespaced Imports

```typescript
import { Editor, Frontend, Core } from "@artemsemkin/elementor-types";

class MyHandler extends Frontend.Handlers.Base {
  // Your implementation
}
```

## What's Included

This package provides comprehensive TypeScript definitions for:

- **Frontend**: Widget handlers, modules, and utilities
- **Editor**: Panel, controls, commands, and $e API
- **Core**: Backbone models, collections, and base classes
- **Admin**: Admin-specific interfaces
- **Utils**: Helper types and utilities

## Coverage

- ✅ Elementor Frontend API
- ✅ Elementor Editor API
- ✅ $e Command System
- ✅ Controls (all types: slider, dimensions, typography, etc.)
- ✅ Responsive values and device modes
- ✅ Container API
- ✅ Hooks system
- ✅ Dynamic Tags
- ✅ Template Library

## Requirements

- TypeScript 5.0+
- Elementor 3.0+

## Dependencies

This package includes type definitions for Elementor's dependencies:

- `@types/backbone` - Backbone.js types
- `@types/jquery` - jQuery types
- `@types/select2` - Select2 types
