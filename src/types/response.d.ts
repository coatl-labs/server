interface CookieOptions {
  domain?: string;
  encode?: (val: string) => string;
  expires?: Date;
  httpOnly?: boolean;
  maxAge?: number;
}

export interface ResponseInstance {
  send(body: object | string): void
  html(body: string): void
  json(body: object): void
  file(path: string): void
  status(code: number): void
  headers(obj: Record<string, string>): void
  header(key:string, value:string): void
  cookie(key:string, value:string, opts?:CookieOptions): void
  redirect(url:string, code?:number): void
  onServerError: (message:string) => void
  onNotFound: (message:string) => void
  onBadRequest: (message:string) => void
  onUnauthorized: (message:string) => void
  onForbidden: (message:string) => void
  onSuccess: (message:string) => void
}
