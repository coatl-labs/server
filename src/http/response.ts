import { ServerResponse } from 'node:http'
import { createReadStream } from 'node:fs'
import { resolve } from 'node:path'
import { mimeMap } from '../utils/mime-types'
import { CookieOptions, ResponseInstance } from '../types/response'

export class Response implements ResponseInstance {
  #res: ServerResponse
  constructor (res: ServerResponse) {
    this.#res = res
  }

  #response (body: object | string) {
    if (typeof body === 'object') {
      this.#res.setHeader('Content-Type', 'application/json')
      body = JSON.stringify(body)
    } else {
      this.#res.setHeader('Content-Type', 'text/plain')
    }
    this.#res.end(body)
  }

  send (body: object | string) {
    this.#response(body)
  }

  html (body: string) {
    this.#res.setHeader('Content-Type', 'text/html')
    this.#res.end(body)
  }

  json (body: object) {
    this.#res.setHeader('Content-Type', 'application/json')
    this.#res.end(JSON.stringify(body))
  }

  file (path: string) {
    const cwd = process.cwd()
    const filePath = resolve(cwd, path)
    const fileExt = filePath.split('.').pop() || 'txt'
    const contentType = mimeMap[fileExt] || 'text/plain'
    this.#res.setHeader('Content-Type', contentType)
    createReadStream(filePath).pipe(this.#res)
  }

  status (code: number): void {
    this.#res.statusCode = code
  }

  headers (obj: Record<string, string>): void {
    for (const key in obj) {
      this.#res.setHeader(key, obj[key])
    }
  }

  header (key: string, value: string): void {
    this.#res.setHeader(key, value)
  }

  cookie (key: string, value: string, opts?: CookieOptions | undefined): void {
    const cookie = `${key}=${value}`
    const options = opts || {}
    const { domain, encode, expires, httpOnly, maxAge } = options
    let cookieStr = cookie
    if (domain) cookieStr += `; Domain=${domain}`
    if (encode) cookieStr += `; Encode=${encode}`
    if (expires) cookieStr += `; Expires=${expires.toUTCString()}`
    if (httpOnly) cookieStr += `; HttpOnly=${httpOnly}`
    if (maxAge) cookieStr += `; Max-Age=${maxAge}`
    this.#res.setHeader('Set-Cookie', cookieStr)
  }

  redirect (url: string, code: number = 302) {
    this.#res.statusCode = code
    this.#res.setHeader('Location', url)
    this.#res.end()
  }

  // suggar methods
  onServerError (message: string) {
    this.#res.statusCode = 500
    this.#response(message)
  }

  onNotFound (message: string) {
    this.#res.statusCode = 404
    this.#response(message)
  }

  onBadRequest (message: string) {
    this.#res.statusCode = 400
    this.#response(message)
  }

  onUnauthorized (message: string) {
    this.#res.statusCode = 401
    this.#response(message)
  }

  onForbidden (message: string) {
    this.#res.statusCode = 403
    this.#response(message)
  }

  onSuccess (message: string) {
    this.#res.statusCode = 200
    this.#response(message)
  }
}
