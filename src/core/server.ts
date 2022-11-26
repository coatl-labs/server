import { Server as NodeServer } from 'node:http'
import { Response } from '../http/response'

export class Server {
  #server: NodeServer = new NodeServer()
  #port: number
  #host: string

  constructor (port: number = 5000, host: string = 'localhost') {
    this.#server = new NodeServer()
    this.#port = port
    this.#host = host
  }

  start () {
    this.#server.on('request', async (_req, _res) => {
      const res = new Response(_res)
      res.send('Hello World')
    })
  }

  listen () {
    this.#server.listen(this.#port, this.#host, () => {
      console.log(`Server is running on ${this.#host}:${this.#port}`)
    })
  }
}
