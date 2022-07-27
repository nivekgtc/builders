import { inject, injectable } from "inversify"
import { Response } from "~/domain/common/types"
import { error, success } from "~/domain/common/utils"
import { ApiTypes, InfraTypes } from "~/ioc/types"
import { RequestResponse } from "~/application/common/helpers"
import type { HttpClient } from "~/application/protocols/http"
import { LoadWeather } from "~/domain/usecases/weather/load-weather"
import { WeatherModel } from "~/domain/models"
import { Weather } from "~/domain/modules"
import { Tron } from "~/services/reactotron/tron"


@injectable()
export class RemoteLoadWeatherOneCall implements LoadWeather {
  @inject(ApiTypes.WEATHER.LOAD_WEATHER_ONECALL) private readonly url: string
  @inject(InfraTypes.HTTP_CLIENT) private readonly httpClient: HttpClient<WeatherModel>
  @inject(ApiTypes.WEATHER.API_KEY) private readonly apiKey: string

  async load(params: Weather.LoadParams): Promise<Response<WeatherModel>> {

    __DEV__ && console.log({
      url: this.url, httpClient: this.httpClient, apiKey: this.apiKey
    })

    __DEV__ && Tron.log({ url: this.url, httpClient: this.httpClient, apiKey: this.apiKey })
    const httpResponse = await this.httpClient.request({
      method: "get",
      url: `${this.url}?lon=${params.lon}&lat=${params.lat}&apiKey=${this.apiKey}&units=metric&lang=pt_br`
    })

    __DEV__ && Tron.log(httpResponse)

    const responseOrError = RequestResponse.handle<WeatherModel>(httpResponse)

    if (responseOrError.isError()) {
      return error(responseOrError.value)
    }
    __DEV__ && Tron.log('httpResponse')
    return success(responseOrError.value.response as WeatherModel)
  }
}
