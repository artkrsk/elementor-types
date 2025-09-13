# Elementor Types Library Refactoring

## Current Issues
1. **Single monolithic file** - All types in one 3000+ line file makes it hard to navigate and maintain
2. **Mixed concerns** - Frontend, editor, and admin types are all together
3. **Unclear exports** - Not immediately clear what developers should import for their use cases
4. **Missing documentation** - No clear guidance on how to use the types

## Proposed Structure

```
src/
├── index.ts                 # Main entry point with organized exports
├── core/                    # Core module system
│   ├── modules.ts          # Base Module classes
│   ├── views.ts            # ViewModule and related
│   └── index.ts
├── frontend/               # Frontend-specific types
│   ├── config.ts          # ElementorFrontendConfig
│   ├── handlers/          # All handler classes
│   │   ├── base.ts
│   │   ├── widgets.ts
│   │   └── index.ts
│   ├── utils.ts
│   └── index.ts
├── editor/                 # Editor-specific types
│   ├── components/        # Editor components
│   │   ├── documents.ts
│   │   ├── preview.ts
│   │   └── index.ts
│   ├── controls/          # Control system
│   │   ├── base.ts
│   │   ├── data.ts
│   │   └── index.ts
│   ├── elements/          # Elements system
│   ├── commands/          # Command system
│   └── index.ts
├── admin/                  # Admin types
│   └── index.ts
├── utils/                  # Shared utilities
│   ├── hooks.ts
│   ├── events.ts
│   └── index.ts
├── globals/               # Global declarations
│   ├── window.ts
│   ├── jquery.ts
│   └── index.ts
└── third-party/           # Third-party integrations
    ├── swiper.ts
    └── index.ts
```

## Refactoring Steps

### Phase 1: File Separation (Priority: High)
1. **Split by domain**: Separate frontend, editor, and admin types
2. **Extract interfaces**: Move all interfaces to their respective domains
3. **Isolate globals**: Move global declarations to dedicated files

### Phase 2: Module Organization (Priority: High)
1. **Group related types**: Create logical groupings (handlers, controls, etc.)
2. **Create barrel exports**: Add index.ts files for each directory
3. **Establish clear hierarchy**: Core → Domain → Feature

### Phase 3: Export Strategy (Priority: High)
1. **Named exports for everything**: Allow selective imports
2. **Namespace exports for grouping**: Keep logical groupings
3. **Type-only exports**: Use `export type` where appropriate

### Phase 4: Documentation (Priority: Medium)
1. **JSDoc comments**: Add descriptions to key interfaces
2. **Usage examples**: Create example files
3. **Migration guide**: Document how to upgrade from current structure

## Example Usage After Refactoring

### For Frontend Development
```typescript
import { 
  ElementorFrontend, 
  FrontendConfig,
  BaseHandler,
  SwiperHandler 
} from '@arts/elementor-types/frontend';
```

### For Editor Plugin Development
```typescript
import { 
  ElementorEditor,
  EditorCommand,
  ControlBase,
  Container 
} from '@arts/elementor-types/editor';
```

### For Widget Development
```typescript
import { 
  WidgetBase,
  WidgetHandler,
  ElementSettings 
} from '@arts/elementor-types';
```

### For Complete Types
```typescript
import type * as Elementor from '@arts/elementor-types';
```

## Benefits

1. **Better IntelliSense**: IDEs can provide more targeted suggestions
2. **Smaller bundles**: Import only what you need
3. **Easier maintenance**: Find and update types quickly
4. **Clear documentation**: Each module has clear purpose
5. **Version stability**: Can version different parts independently

## Implementation Priority

1. **Immediate** (Week 1):
   - Separate frontend and editor types
   - Create basic export structure
   - Add essential JSDoc comments

2. **Short-term** (Week 2-3):
   - Complete module organization
   - Add comprehensive exports
   - Create usage examples

3. **Long-term** (Month 2):
   - Add detailed documentation
   - Create migration tools
   - Add type tests

## Breaking Changes Mitigation

To avoid breaking existing usage:

1. **Keep legacy exports**: Maintain current export structure in index.ts
2. **Add deprecation notices**: Mark old patterns as deprecated
3. **Provide codemod**: Create automated migration script
4. **Version appropriately**: Release as 2.0.0 for breaking changes

## Testing Strategy

1. **Type tests**: Use `tsd` or `expect-type` to test type correctness
2. **Import tests**: Verify all export paths work
3. **Compatibility tests**: Ensure types match actual Elementor API
4. **Example projects**: Create sample projects using the types

## Additional Improvements

1. **Add generic types**: For common patterns (handlers, controls)
2. **Utility types**: Create helpers like `ElementSettings<T>`
3. **Type guards**: Add runtime type checking functions
4. **Strict mode compatibility**: Ensure all types work with strict TypeScript
5. **Version tracking**: Map types to Elementor versions
