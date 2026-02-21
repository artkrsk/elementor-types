# @artemsemkin/elementor-types

TypeScript type definitions for [Elementor](https://elementor.com/). Covers the frontend, editor, `$e` command system, controls, containers, hooks, and Backbone/Marionette internals.

## Install

```bash
npm install --save-dev @artemsemkin/elementor-types
```

## Usage

### Global declarations

Augment `Window` so TypeScript knows about Elementor globals:

```typescript
import type { ElementorEditor, ElementorCommon, $e } from '@artemsemkin/elementor-types'

declare global {
  interface Window {
    $e?: $e
    elementor?: ElementorEditor
    elementorCommon?: ElementorCommon
  }
}
```

### Extending a control view

```typescript
import type { ElementorEditor } from '@artemsemkin/elementor-types'

const editor = window.elementor as ElementorEditor

const CustomSlider = editor.modules.controls.Slider.extend({
  onReady() {
    // your logic
  },
})

editor.addControlView('slider', CustomSlider)
```

### Editor hooks

```typescript
import type { HookArgs } from '@artemsemkin/elementor-types'

const $e = window.$e!

class OnRepeaterInsert extends $e.modules.hookUI.After {
  getCommand(): string {
    return 'document/repeater/insert'
  }

  getId(): string {
    return 'my-plugin-on-repeater-insert'
  }

  getConditions(args: HookArgs): boolean {
    return args.name === 'my_repeater'
  }

  apply(args: HookArgs): void {
    const { container, model } = args
    // respond to the repeater insert
  }
}
```

### Namespaces

Everything is organized under namespaces you can import selectively:

```typescript
import type { Frontend, Editor, Core, Utils } from '@artemsemkin/elementor-types'
```

| Namespace | What's there |
|-----------|-------------|
| `Core` | Module system, commands, hooks base classes |
| `Frontend` | Widget handlers, element managers, frontend config |
| `Editor` | Controls, elements, containers, panels, documents |
| `Admin` | Admin panel types |
| `Utils` | AJAX helpers, type guards, common utilities |
| `Globals` | Window augmentations, module registry |
| `ThirdParty` | Backbone, Marionette, Swiper, jQuery types |

## License

MIT
