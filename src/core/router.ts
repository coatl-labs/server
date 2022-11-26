import { Method, RouteMap, RouterHandler, RouterInstance } from '../types'
import { pathToRegex } from '../utils'

export class Router implements RouterInstance {
  routes: RouteMap = {}

  #register (path:string, method:Method, handler:RouterHandler) {
    if (!this.routes[method]) this.routes[method] = {}
    const regex = pathToRegex(path)
    this.routes[method]![regex] = handler
  }

  get (path: string, handler: RouterHandler): void | Promise<void> {
    this.#register(path, 'GET', handler)
  }

  put (path: string, handler: RouterHandler): void | Promise<void> {
    this.#register(path, 'PUT', handler)
  }

  post (path: string, handler: RouterHandler): void | Promise<void> {
    this.#register(path, 'POST', handler)
  }

  patch (path: string, handler: RouterHandler): void | Promise<void> {
    this.#register(path, 'PATCH', handler)
  }

  delete (path: string, handler: RouterHandler): void | Promise<void> {
    this.#register(path, 'DELETE', handler)
  }
}
