import { harperFetch } from './harperFetch'
import type { ChartMonthInterface } from '../../interfaces/ChartMonth'

export const harperGetStatsByMonth = async (username: string): Promise<ChartMonthInterface[]> => {
    const data = {
        operation: 'sql',
        sql: `select extract(t.updatedtime, 'month') month, extract(t.updatedtime, 'year') year, sum(t.seconds) seconds from productivity.task t
        where extract(NOW(), 'year')=extract(t.updatedtime, 'year') and status='Finalizado' and username = '${username}'
        group by extract(t.updatedtime, 'month'), extract(t.updatedtime, 'year')
        order by month asc`,
    }
    const { result } = await harperFetch(data)
    return result
}
