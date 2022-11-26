import type { RouteMap, RouterHandler } from '../types'
import { Router } from './router'
import { Server } from './server'

export class App extends Router {
  #middlewres: RouterHandler[] = []
  #routes: RouteMap = {}
  #server: Server

  constructor (port: number = 5000, host: string = 'localhost') {
    super()
    this.#server = new Server(port, host)
  }

  use (fn: RouterHandler | Router) {
    if (fn instanceof Router) {
      this.#routes = { ...this.#routes, ...fn.routes, ...super.routes }
    } else {
      this.#middlewres.push(fn)
    }
  }

  run (): void {
    this.#server.listen()
    this.#server.start()
  }
}
