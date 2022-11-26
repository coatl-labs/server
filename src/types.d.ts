import type { Request } from './types/request'
import type { Response } from './types/response'

export interface NextFunction {
  (err?: any): void
}

export interface RouterHandler {
  (req: Request, res: Response, next: NextFunction): void | Promise<void>
}

export interface Body {
  json<T>(): T;
  text():string
}

export interface RouterInstance {
  get(path: string, handler: RouterHandler): void | Promise<void>
  put(path: string, handler: RouterHandler): void | Promise<void>
  post(path: string, handler: RouterHandler): void | Promise<void>
  patch(path: string, handler: RouterHandler): void | Promise<void>
  delete(path: string, handler: RouterHandler): void | Promise<void>
}

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export type RouteMap = {
  // eslint-disable-next-line no-unused-vars
  [k in Method]?: {
    [k: string]: RouterHandler
  }
}

export interface Middleware<T = any>{
  (config:T): RouterHandler
}
