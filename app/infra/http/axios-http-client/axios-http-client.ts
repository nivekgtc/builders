import axios, { AxiosResponse } from "axios"
import { injectable } from "inversify"

import { HttpResponse, HttpClient, HttpRequest } from "~/application/protocols/http"

@injectable()
export class AxiosHttpClient implements HttpClient {
  async request({ method, url, body = undefined, headers }: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse

    const extraHeaders = {
      ...headers,
    }

    try {
      axiosResponse = await axios.request({
        url,
        data: body,
        headers: extraHeaders,
        method,
      })
    } catch (error) {
      axiosResponse = error.response
    }

    return {
      statusCode: axiosResponse?.status,
      body: axiosResponse?.data,
    }
  }
}
