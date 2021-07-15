# Code Format

## Usage

- By default the currently open file is formatted on save.

- Format a selection of code using the `code-format:format-code` (`CTRL+SHIFT+C`) command.
  (Also accessible via context menu, or "Edit > Text > Format Code"). When no selection is provided, the entire file is formatted.

- For the languages that support on type formatting, the package is able to format as you type in the editor. You should enable this from the settings of this package (disabled by default).

![Code Format](https://raw.githubusercontent.com/facebookarchive/atom-ide-ui/master/docs/images/code-format.gif)

## Developer Service API

Code Format also provides APIs to:

- format code on save (after you press save but before writing to disk).
- format code as you type

You can enable format-on-save using plain range/file providers from the atom-ide-code-format's settings

Provide code format [Atom services](http://flight-manual.atom.io/behind-atom/sections/interacting-with-other-packages-via-services/) by adding one or more of these to your `package.json`:
(Only the ones that you want to use; you don't need all of them!)

```json
"providedServices": {
  "code-format.range": {
    "versions": {
      "0.1.0": "provideRangeCodeFormat"
    }
  },
  "code-format.file": {
    "versions": {
      "0.1.0": "provideFileCodeFormat"
    }
  },
  "code-format.onType": {
    "versions": {
      "0.1.0": "provideOnTypeCodeFormat"
    }
  },
  "code-format.onSave": {
    "versions": {
      "0.1.0": "provideOnSaveCodeFormat"
    }
  }
}
```

Then, in your package entry point:

```ts
export function provideRangeCodeFormat(): RangeCodeFormatProvider {}
export function provideFileCodeFormat(): FileCodeFormatProvider {}
export function provideOnTypeCodeFormat(): OnTypeCodeFormatProvider {}
export function provideOnSaveCodeFormat(): OnSaveCodeFormatProvider {}
```

The various provider types are described in
[`atom-ide-code-format/lib/types.js`](./src/types.ts).
