import type { TextEditor, Range, Point } from "atom"
import type { TextEdit } from "atom-ide-base"

/**
 * A brief overview of the different code formatting providers:
 *
 * == Range formatters == These accept a range to format and return a list of edits to apply. These will always be
 * preferred over file formatters when a range is selected.
 *
 * == File formatters == These always return the result of formatting the entire file. To compensate, they can return a
 * custom cursor position to avoid disruption. These will be preferred over range formatters for whole-file formatting.
 *
 * == onType formatters == These are run after every typing event in a selected editor.
 *
 * == onSave formatters == These are run whenever a selected editor is saved. If the global format-on-save option is
 * enabled, then file/range formatters will be triggered on save (even if no save formatters are provided). Obviously,
 * save formatters are preferred in this case.
 */

/**
 * Formats the range specified, and returns a list of text edits to apply. Text edits must be non-overlapping and
 * preferably in reverse-sorted order.
 */
export type RangeCodeFormatProvider = {
  formatCode: (editor: TextEditor, range: Range) => Promise<Array<TextEdit>>
  priority: number
  readonly grammarScopes?: Array<string>
}

/**
 * Formats the range specified, but returns the entire file (along with the new cursor position). Useful for
 * less-flexible providers like clang-format.
 */
export type FileCodeFormatProvider = {
  formatEntireFile: (
    editor: TextEditor,
    range: Range
  ) => Promise<
    | {
        newCursor?: number
        formatted: string
      }
    | undefined
    | null
  >
  priority: number
  readonly grammarScopes?: Array<string>
}

/**
 * Formats around the given position, and returns a list of text edits to apply, similar to `formatCode`. The provider
 * determines the exact range to format based on what's at that position.
 *
 * This will automatically triggered after every typing event.
 */
export type OnTypeCodeFormatProvider = {
  formatAtPosition: (editor: TextEditor, position: Point, triggerCharacter: string) => Promise<Array<TextEdit>>
  priority: number
  readonly grammarScopes?: Array<string>
  keepCursorPosition: boolean
}

/** Formats files after save events. */
export type OnSaveCodeFormatProvider = {
  formatOnSave: (editor: TextEditor) => Promise<Array<TextEdit>>
  priority: number
  readonly grammarScopes?: Array<string>
}

export type CodeFormatProvider =
  | RangeCodeFormatProvider
  | FileCodeFormatProvider
  | OnTypeCodeFormatProvider
  | OnSaveCodeFormatProvider
