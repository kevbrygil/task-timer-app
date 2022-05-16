import { harperFetch } from './harperFetch'
import type { HarperData } from '../../interfaces/HarperData'
export const harperEditTask = async (taskId: string, name: string): Promise<HarperData> => {
    const data = {
        operation: 'sql',
        sql: `UPDATE productivity.task SET name = '${name}', 
            updatedtime=CURRENT_TIMESTAMP WHERE id = '${taskId}'`,
    }
    const responseAndResult = await harperFetch(data)
    return responseAndResult
}
