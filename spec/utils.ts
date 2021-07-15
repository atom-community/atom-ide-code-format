import * as waitit from "waitit"

/** Wait until a function returns true */
export function waitFor(fn: (...args: any[]) => boolean, timeout = 2500) {
  const interval = 100 // check very 100 ms
  return waitit.start({
    interval,
    maxTicks: timeout / interval,
    check: fn,
  })
}

/** Sleep for ms */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
