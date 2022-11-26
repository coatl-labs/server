export function pathToRegex (customPath: string): string {
  const matcher = customPath.replace(/\//g, '\\/').replace(/:([^/]+)/g, '([^/]+?)')
  const regex = new RegExp('^' + matcher + '$')
  return `${regex}`
}

type PrimitiveStr = 'string' | 'number' | 'boolean' | 'object'
export function typeOf (payload: any, value: PrimitiveStr) {
  return typeof payload === value
}
