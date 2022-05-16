import type { HoursMinsSecs } from '../interfaces/HoursMinsSecs'
import type { FormatTime } from '../interfaces/FormatTime'

const SECONDS_PER_HOUR = 3600
const SECONDS_PER_MINUTE = 60

const setZeroIfLessThanTen = (time: number): string => {
    const formattedTime: string = time < 10 ? `0${time}` : `${time}`
    return formattedTime
}

const calculateHours = (seconds: number): number => {
    const hours = Math.floor(seconds / SECONDS_PER_HOUR)
    return hours
}

const calculateMins = (seconds: number): number => {
    const mins = Math.floor((seconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE)
    return mins
}

const calculateSecs = (seconds: number): number => {
    const secs = Math.floor((seconds % SECONDS_PER_HOUR) % SECONDS_PER_MINUTE)
    return secs
}

const calculateHoursMinsSecs = (seconds: number): HoursMinsSecs => {
    const hours = calculateHours(seconds)
    const mins = calculateMins(seconds)
    const secs = calculateSecs(seconds)
    return {
        hours,
        mins,
        secs,
    }
}

export const formatTime = (seconds: number): FormatTime => {
    const { hours, mins, secs } = calculateHoursMinsSecs(seconds)
    const formattedHours = setZeroIfLessThanTen(hours)
    const formattedMins = setZeroIfLessThanTen(mins)
    const formattedSecs = setZeroIfLessThanTen(secs)
    return {
        formattedHours,
        formattedMins,
        formattedSecs,
    }
}

export const displayTimeString = (seconds: number): string => {
    const { formattedHours, formattedMins, formattedSecs } = formatTime(seconds)
    return `${formattedHours}h ${formattedMins}m ${formattedSecs}s`
}

export const timestampToDayMonthYear = (timestamp: number): string => {
    const date = new Date(timestamp)
    const formattedDate = date.toLocaleDateString()
    return formattedDate
}

export const MonthNumbertoMonthName = (monthNumber: number): string => {
    const date = new Date()
    date.setMonth(monthNumber - 1)
    const monthName = date.toLocaleString([], { month: 'long' })
    return monthName.charAt(0).toUpperCase() + monthName.slice(1)
}
