import { typeOf } from '../utils'

export type QueryParams =
  | string
  | string[][]
  | Record<string, string | number | bigint | boolean>;

export type ParsedQuery = Record<string, string>;

export const parse = (raw: string) => {
  const searchParams = new URLSearchParams(raw)
  const result: ParsedQuery = {}
  searchParams.forEach((value, key) => {
    result[key] = value
  })
}
export function stringify (input: Record<string, string>) {
  let URLParams: URLSearchParams
  if (typeOf(input, 'string') || (Array.isArray(input) && Array.isArray(input[0]))) {
    URLParams = new URLSearchParams(input)
  } else {
    const params: Record<string, string> = {}
    for (const key in input) {
      const value = input[key]
      if (value && typeof value.toString === 'function') {
        params[key] = value.toString()
      } else if (value === null) {
        params[key] = String(value)
      }
    }
    URLParams = new URLSearchParams(params)
  }
  return URLParams.toString()
}
