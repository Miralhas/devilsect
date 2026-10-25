import { useEffect, DependencyList } from 'react'

 // eslint-disable-next-line
export function useDebounceEffect(fn: (...args: any[]) => void, deps: DependencyList, waitTime: number) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn(...(deps || []))
    }, waitTime)
    return () => {
      clearTimeout(t)
    }
    // eslint-disable-next-line
  }, deps)
}
