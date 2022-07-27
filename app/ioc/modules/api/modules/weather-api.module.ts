import { ContainerModule } from "inversify"
import { makeApiImageUrl, makeApiUrl } from "~/ioc/helpers"
import { ApiTypes } from "~/ioc/types"

export const WeatherApiModule = new ContainerModule((bind) => {
  bind<string>(ApiTypes.WEATHER.LOAD_WEATHER).toDynamicValue(() => makeApiUrl("weather"))
  bind<string>(ApiTypes.WEATHER.LOAD_WEATHER_ONECALL).toDynamicValue(() => makeApiUrl("onecall"))
  bind<string>(ApiTypes.WEATHER.API_KEY).toConstantValue('a9bb4be40cdf9c09b1aaeb4a45cd1c66')
  bind<string>(ApiTypes.IMG.LOAD_IMAGE).toConstantValue('https://api.openweathermap.org/img/wn/')
})
