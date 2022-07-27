import {
  AccessDeniedError,
  MethodNotAllowedRequestError,
  UnauthorizedRequestError,
  UnexpectedError,
} from "~/domain/common/exceptions"
import { Response, ResponseError } from "~/domain/common/types"
import { CombinedPredicated, combinedPredicates, error, success } from "~/domain/common/utils"
import {
  ErrorsTypes,
  HttpResponse,
  HttpResponseBody,
  HttpStatusCode,
} from "~/application/protocols/http"
import { BadRequestError } from "~/domain/common/exceptions/bad-request-error"

export class RequestResponse<R> {
  private constructor(private readonly _response: R | undefined) {
    Object.freeze(this)
  }

  public static handle<R>(httpResponse: HttpResponse<R>): Response<RequestResponse<R>> {
    const { statusCode } = httpResponse

    if (this.isSuccess(statusCode)) {
      return success(new RequestResponse(httpResponse.body))
    }

    const predicates: CombinedPredicated<HttpStatusCode, ResponseError> = [
      [this.isForbidden, new AccessDeniedError()],
      [this.isBadRequest, new BadRequestError(httpResponse.body as HttpResponseBody<ErrorsTypes>)],
      [
        this.isUnauthorized,
        new UnauthorizedRequestError(httpResponse.body as HttpResponseBody<ErrorsTypes>),
      ],
      [
        this.isMethodNotAllowed,
        new MethodNotAllowedRequestError(httpResponse.body as HttpResponseBody<ErrorsTypes>),
      ],
    ]

    const errors = combinedPredicates({
      value: statusCode,
      predicatePairs: predicates,
    })

    if (errors.isError()) {
      return error(errors.value)
    }

    return error(new UnexpectedError())
  }

  private static isSuccess(statusCode: HttpStatusCode): boolean {
    return statusCode >= 200 && statusCode <= 299
  }

  private static isForbidden(statusCode: HttpStatusCode): boolean {
    return statusCode === HttpStatusCode.forbidden
  }

  private static isMethodNotAllowed(statusCode: HttpStatusCode): boolean {
    return statusCode === HttpStatusCode.methodNotAllowed
  }

  private static isUnauthorized(statusCode: HttpStatusCode): boolean {
    return statusCode === HttpStatusCode.unauthorized
  }

  private static isUnprocessableEntity(statusCode: HttpStatusCode): boolean {
    return statusCode === HttpStatusCode.unprocessableEntity
  }

  private static isBadRequest(statusCode: HttpStatusCode): boolean {
    return statusCode === HttpStatusCode.badRequest
  }

  get response(): R | undefined {
    return this._response
  }
}
