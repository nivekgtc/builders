import { ErrorsTypes } from "~/application/protocols/http"
import { useTranslate } from "../../../../app/presentation/hooks"


export class UnauthorizedRequestError extends Error {
  constructor(httpResponseError: ErrorsTypes) {
    super("UnauthorizedRequest")
    this.name = "UnauthorizedRequest"
    this.message =
      httpResponseError?.[0]?.errors?.[0]?.errorMessage || useTranslate().format("errors.expiredSession")
  }
}
