import { inject, injectable } from "inversify"
import { Response } from "~/domain/common/types"
import { error, success } from "~/domain/common/utils"
import { ApiTypes, InfraTypes } from "~/ioc/types"
import { QueryHelper, RequestResponse } from "~/application/common/helpers"
import type { HttpClient } from "~/application/protocols/http"
import { LoadWeather } from "~/domain/usecases/weather/load-weather"
import { WeatherModel } from "~/domain/models"
import { Weather } from "~/domain/modules"


@injectable()
export class RemoteLoadWeather implements LoadWeather {
  @inject(ApiTypes.WEATHER.LOAD_WEATHER) private readonly url: string
  @inject(InfraTypes.HTTP_CLIENT) private readonly httpClient: HttpClient<WeatherModel>
  @inject(ApiTypes.WEATHER.API_KEY) private readonly apiKey: string

  async load(params: Weather.LoadParams): Promise<Response<WeatherModel>> {
    const httpResponse = await this.httpClient.request({
      method: "get",
      url: QueryHelper.ParamsToQuery(this.url, { ...params, apiKey: this.apiKey }),
    })

    const responseOrError = RequestResponse.handle<WeatherModel>(httpResponse)
    if (responseOrError.isError()) {
      return error(responseOrError.value)
    }

    return success(responseOrError.value.response as WeatherModel)
  }
}
