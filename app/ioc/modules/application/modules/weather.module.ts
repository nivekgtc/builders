import { ContainerModule } from "inversify"
import {
  RemoteLoadWeather,
  RemoteLoadWeatherOneCall
} from "~/application/services"
import {
  LoadWeather
} from "~/domain/usecases"
import { ServicesTypes } from "~/ioc/types"

export const WeatherModule = new ContainerModule((bind) => {
  bind<LoadWeather>(ServicesTypes.WEATHER.LOAD_WEATHER).to(
    RemoteLoadWeather,
  )
  bind<LoadWeather>(ServicesTypes.WEATHER.LOAD_WEATHER_ONECALL).to(
    RemoteLoadWeatherOneCall,
  )
})
