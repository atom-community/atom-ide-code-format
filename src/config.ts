import type { TextEditor } from "atom"
import featureConfig from "@atom-ide-community/nuclide-commons-atom/feature-config"

export function getFormatOnSave(editor: TextEditor): boolean {
  const formatOnSave = featureConfig.get("atom-ide-code-format.formatOnSave", {
    scope: editor.getRootScopeDescriptor(),
  }) as any
  return formatOnSave == null ? false : formatOnSave
}

export function getFormatOnType(): boolean {
  return featureConfig.getWithDefaults("atom-ide-code-format.formatOnType", false)
}
