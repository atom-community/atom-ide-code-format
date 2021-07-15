// TODO Remove

import type { Disposable } from "atom"
import { consumeRangeProvider, consumeFileProvider, consumeOnSaveProvider, consumeOnTypeProvider } from "./main"
import type { CodeFormatProvider } from "./types"

export function consumeLegacyProvider(provider: CodeFormatProvider): Disposable {
  // Legacy providers used `selector` / `inclusionPriority`.
  // @ts-ignore legacy API compatability.
  provider.grammarScopes =
    provider.grammarScopes ||
    // @ts-ignore
    (provider.selector != null ? provider.selector.split(", ") : null)
  provider.priority =
    provider.priority != null
      ? provider.priority
      :     // @ts-ignore
      provider.inclusionPriority != null
      // @ts-ignore
      ? provider.inclusionPriority
      : 0
  if ("formatCode" in provider) {
    return consumeRangeProvider(provider)
  } else if ("formatEntireFile" in provider) {
    return consumeFileProvider(provider)
  } else if ("formatAtPosition" in provider) {
    return consumeOnTypeProvider(provider)
  } else if ("formatOnSave" in provider) {
    return consumeOnSaveProvider(provider)
  }
  throw new Error("Invalid code format provider")
}
