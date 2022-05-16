/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useCallback, useEffect } from 'react'
import type { ChartMonthInterface } from '../interfaces/ChartMonth'
import { harperGetStatsByMonth } from '../utils/harperdb/getStatsByMonth'

export const useChartMonth = (username: string) => {
    const [chartMonth, setChartMonth] = useState<ChartMonthInterface[]>([])

    const getAndSetChartMonth = useCallback(
        async (callbackUsername: string) => {
            try {
                const callbackChartMonth: ChartMonthInterface[] = await harperGetStatsByMonth(callbackUsername)
                setChartMonth(callbackChartMonth)
            } catch (err) {
                console.log(err)
            }
        },
        [setChartMonth]
    )

    useEffect(() => {
        if (!username || chartMonth.length > 0) return
        getAndSetChartMonth(username)
    }, [username, chartMonth.length, getAndSetChartMonth])

    return { chartMonth, setChartMonth, getAndSetChartMonth }
}
