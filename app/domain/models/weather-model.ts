export type WeatherModel = {
  "lat": 33.44
  "lon": -94
  "timezone": "America/Chicago"
  "timezone_offset": -18000
  "current": {
    "dt": number
    "sunrise": number
    "sunset": number
    "temp": number
    "feels_like": number
    "pressure": number
    "humidity": number
    "dew_point": number
    "uvi": number
    "clouds": number
    "visibility": number
    "wind_speed": number
    "wind_deg": number
    "weather": Array<{
      "id": number
      "main": string
      "description": string
      "icon": string
    }>
  }
}
