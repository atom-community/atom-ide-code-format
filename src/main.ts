import type { Disposable } from "atom"
import type { BusySignalService } from "atom-ide-base"
import type {
  CodeFormatProvider,
  RangeCodeFormatProvider,
  FileCodeFormatProvider,
  OnTypeCodeFormatProvider,
  OnSaveCodeFormatProvider,
} from "./types"

import CodeFormatManager from "./CodeFormatManager"

export { default as config } from "./config.json"

let codeFormatManager: CodeFormatManager

export function activate() {
  codeFormatManager = new CodeFormatManager()
}

export function consumeLegacyProvider(provider: CodeFormatProvider): Disposable {
  // Legacy providers used `selector` / `inclusionPriority`.
  // $FlowIgnore legacy API compatability.
  provider.grammarScopes =
    provider.grammarScopes ||
    // $FlowIgnore
    (provider.selector != null ? provider.selector.split(", ") : null)
  provider.priority =
    provider.priority != null
      ? provider.priority
      : // $FlowFixMe(>=0.68.0) Flow suppress (T27187857)
      provider.inclusionPriority != null
      ? provider.inclusionPriority
      : 0
  if (provider.formatCode) {
    return consumeRangeProvider(provider)
  } else if (provider.formatEntireFile) {
    return consumeFileProvider(provider)
  } else if (provider.formatAtPosition) {
    return consumeOnTypeProvider(provider)
  } else if (provider.formatOnSave) {
    return consumeOnSaveProvider(provider)
  }
  throw new Error("Invalid code format provider")
}

export function consumeRangeProvider(provider: RangeCodeFormatProvider): Disposable {
  return codeFormatManager.addRangeProvider(provider)
}

export function consumeFileProvider(provider: FileCodeFormatProvider): Disposable {
  return codeFormatManager.addFileProvider(provider)
}

export function consumeOnTypeProvider(provider: OnTypeCodeFormatProvider): Disposable {
  return codeFormatManager.addOnTypeProvider(provider)
}

export function consumeOnSaveProvider(provider: OnSaveCodeFormatProvider): Disposable {
  return codeFormatManager.addOnSaveProvider(provider)
}

export function consumeBusySignal(busySignalService: BusySignalService): Disposable {
  return codeFormatManager.consumeBusySignal(busySignalService)
}

export function deactivate() {
  codeFormatManager.dispose()
}
