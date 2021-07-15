import type { Disposable } from "atom"
import type { BusySignalService } from "atom-ide-base"
import type {
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

// TODO remove
export { consumeLegacyProvider } from "./legacy-provider"
