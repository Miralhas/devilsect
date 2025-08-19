import { useEffect, DependencyList } from 'react'

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList,
) {
  useEffect(() => {
    const t = setTimeout(() => {
      // eslint-disable-next-line
      fn.apply(undefined, deps)
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
    // eslint-disable-next-line
  }, deps)
}
