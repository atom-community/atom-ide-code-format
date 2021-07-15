import type { TextEditor } from "atom"

export function getFormatOnSave(editor: TextEditor): boolean {
  return atom.config.get("atom-ide-code-format.formatOnSave", {
    scope: editor.getRootScopeDescriptor(),
  }) as boolean
}

export function getFormatOnType(): boolean {
  return atom.config.get("atom-ide-code-format.formatOnType") as boolean
}
