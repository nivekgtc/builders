import {
  isBefore as isBeforeDF,
  format as formatDF,
  isToday as isTodayDF,
  isSameMonth,
  isSameYear,
} from "date-fns"
import { utcToZonedTime as utcToZonedTimeDFT } from "date-fns-tz"
import { getLocalizationAsync } from "expo-localization"


type IsBeforeProps = {
  date: number | Date
  dateToCompare: number | Date
}

type FormatDateProps = {
  date: number | Date
  format: string
}

export const isBefore = ({ date, dateToCompare }: IsBeforeProps): boolean =>
  isBeforeDF(date, dateToCompare)

export const formatDate = ({ date, format }: FormatDateProps): string => formatDF(date, format)

export const isToday = isTodayDF

export const inSameMonthAndYear = (dateLeft: number | Date, dateRight: number | Date) =>
  isSameMonth(dateLeft, dateRight) && isSameYear(dateLeft, dateRight)

/**
 * Transform utc date to local timezone
 * @param date
 * @returns date in the local timezone
 */
export const utcToLocalTimezone = async (date: string | number | Date): Promise<Date> => {
  const { timezone: currentTimezone } = await getLocalizationAsync()
  return utcToZonedTimeDFT(date, currentTimezone)
}

/**
 * Get local timezone
 * @example `America/Los_Angeles`
 */
export const getLocalTimezone = async (): Promise<string> => (await getLocalizationAsync()).timezone

export const getTimezoneOffset = () => {
  const offset = new Date().getTimezoneOffset()
  const o = Math.abs(offset)
  return (
    (offset < 0 ? "+" : "-") +
    ("00" + Math.floor(o / 60)).slice(-2) +
    ":" +
    ("00" + (o % 60)).slice(-2)
  )
}


const addUTCNotation = (date: string) => `${date}+00:00`

/**
 * Transform utc date to timezone
 * @param date
 * @returns date in the timezone
 */
export const utcToTimezone = (date: string | number | Date, timezone: string): Date => {
  return utcToZonedTimeDFT(addUTCNotation(date as string), timezone)
}
