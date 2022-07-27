import { ErrorsTypes } from "~/application/protocols/http"
export class MethodNotAllowedRequestError extends Error {
  constructor(httpResponseError: ErrorsTypes) {
    super("MethodNotAllowedRequest")
    this.name = "MethodNotAllowedRequest"
    this.message =
      httpResponseError?.[0]?.errors?.[0]?.errorMessage || "exceptions.methodNotAllowed"
  }
}
