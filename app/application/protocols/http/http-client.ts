export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: any
  headers?: any
}

export type HttpResponse<R = any> = {
  statusCode: HttpStatusCode
  body?: HttpResponseBody<R>
}

export type ErrorsTypes = Array<{
  errors?: Array<{
    propertyName: string
    errorMessage: string
    attemptedValue: string
    customState: string
    severity: number
    errorCode: string
    formattedMessagePlaceholderValues: {
      PropertyName: string
      PropertyValue: string
    }
  }>
}>

export type HttpResponseBody<R> =
  | (R & {
      errors?: any
    })
  | (R & ErrorsTypes)

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}

export type HttpMethod = "post" | "get" | "put" | "delete" | "patch"

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  methodNotAllowed = 405,
  unprocessableEntity = 422,
  serverError = 500,
}

export enum HttpTypes {
  POST = "post",
  GET = "get",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
}
