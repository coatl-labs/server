import { Middleware } from '../types'
import { parse } from 'node:querystring'

interface BodyParserFn {
  (body: Buffer[]): object
}

const objectToJSON: BodyParserFn = (body) => {
  try {
    const data = body.toString()
    return JSON.parse(data)
  } catch (error) {
    throw new Error(error as string)
  }
}

const formToJSON:BodyParserFn = (body) => {
  try {
    return parse(body.toString())
  } catch (error) {
    throw new Error(error as string)
  }
}
const urlToJSON: BodyParserFn = (body) => {
  try {
    return parse(body.toString())
  } catch (error) {
    throw new Error(error as string)
  }
}
const rawToJSON: BodyParserFn = (body) => {
  try {
    return { raw: body.toString() }
  } catch (error) {
    throw new Error(error as string)
  }
}

const parserMap: Record<string, BodyParserFn> = {
  'application/json': objectToJSON,
  'application/urlencoded': urlToJSON,
  'multipart/form-data': formToJSON
}

export const bodyParser: Middleware = () => {
  const defaultType = 'application/json'
  return (req, _res, next) => {
    const contentType = req.headers['content-type'] ?? defaultType
    const data = parserMap[contentType](req.rawBody) ?? rawToJSON(req.rawBody)
    if (!data) return
    req.body = data
    next()
  }
}
