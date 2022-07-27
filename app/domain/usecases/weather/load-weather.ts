import { LoadFunction } from "~/domain/common/types";
import { WeatherModel } from "~/domain/models";
import { Weather } from "~/domain/modules";


export interface LoadWeather
  extends LoadFunction<WeatherModel, Weather.LoadParams> { }
