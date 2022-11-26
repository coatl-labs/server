import { RequestInstance, Method, OnEvents } from '../types/request'
import { IncomingMessage } from 'node:http'

export class Request implements RequestInstance {
  #req: IncomingMessage
  ctx: object = {}

  constructor (ref: IncomingMessage) {
    this.#req = ref
  }

  get method (): Method {
    return this.#req.method as Method
  }

  get url (): string {
    return this.#req.url as string
  }

  get params (): object {
    return {}
  }

  get path (): string {
    return this.#req.url as string
  }

  get ip (): string {
    return this.#req.socket.remoteAddress as string
  }

  get hostname (): string {
    return this.#req.headers.host as string
  }

  get query (): object {
    const url = this.#req.url
    if (!url) return {}
    const searchParams = new URLSearchParams(url)
    const query: Record<string, any> = {}
    for (const [key, value] of searchParams) {
      query[key] = value
    }
    return query
  }

  get headers () {
    return this.#req.headers
  }

  get rawBody (): Buffer[] {
    return this.rawBody
  }

  set rawBody (buffer: Buffer[]) {
    this.rawBody = buffer
  }

  get body (): object {
    return this.body
  }

  set body (raw: object) {
    this.body = raw
  }

  get cookies (): object {
    const cookieStr = this.#req.headers.cookie
    if (!cookieStr) return {}
    const cookies: Record<string, any> = {}
    const cookieArr = cookieStr.split(';')
    for (const cookie of cookieArr) {
      const [key, value] = cookie.trim().split('=')
      cookies[key] = value
    }
    return cookies
  }

  on (event: OnEvents, listener: (chunk: Buffer | Error) => void) {
    this.#req.on(event, listener)
  }
}
