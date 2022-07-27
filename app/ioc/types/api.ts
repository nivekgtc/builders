export const ApiTypes = {
  WEATHER: {
    LOAD_WEATHER: Symbol("LoadLocalWeatherCurrent"),
    LOAD_WEATHER_ONECALL: Symbol("LoadLocalWeatherOneCall"),
    API_KEY: Symbol("API_KEY"),
  },
  IMG: {
    LOAD_IMAGE: Symbol("LoadImage"),
  }
}
