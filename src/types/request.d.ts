import { IncomingHttpHeaders } from 'node:http'

export type OnEvents = 'data' | 'end' | 'error'
export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface RequestInstance {
  params: object
  query: object
  body: object
  headers: IncomingHttpHeaders
  ctx: object
  rawBody: Buffer[]
  method: Method
  url: string
  path: string
  ip: string
  hostname: string
  cookies: object
}
