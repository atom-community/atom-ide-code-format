/** A faster vresion of lodash.debounce */
/* eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeoutId: NodeJS.Timeout | undefined
  // @ts-ignore
  return (...args: Parameters<T>) => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func(...args)
    }, wait)
  }
}
