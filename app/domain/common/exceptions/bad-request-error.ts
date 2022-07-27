import { ErrorsTypes } from "~/application/protocols/http"
export class BadRequestError extends Error {
  constructor(httpResponseError: ErrorsTypes) {
    super("BadRequest")
    this.name = "BadRequest"
    this.message = httpResponseError?.[0]?.errors?.[0]?.errorMessage || "exceptions.badRequest"
  }
}
