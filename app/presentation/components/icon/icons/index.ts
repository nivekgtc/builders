import humidity from './humidity.svg'
import uvi from './uvi.svg'
import windSpeed from './wind-speed.svg'

export const icons = {
  back: require("./arrow-left.png"),
  bullet: require("./bullet.png"),
  bug: require("./ladybug.png"),
  humidity,
  uvi,
  windSpeed,
}

export type IconTypes = keyof typeof icons
