import React, { createContext } from 'react'
import type { ChartMonthInterface } from '../interfaces/ChartMonth'

interface ChartMonthContext {
    chartMonth: ChartMonthInterface[]
    setChartMonth: React.Dispatch<React.SetStateAction<ChartMonthInterface[]>>
    getAndSetChartMonth: (username: string) => Promise<void>
}

export const ChartMonthContext = createContext({} as ChartMonthContext)
