import { harperFetch } from './harperFetch'
import type { HarperData } from '../../interfaces/HarperData'
export const harperSaveTaskTime = async (taskId: string, newSeconds: number): Promise<HarperData> => {
    const data = {
        operation: 'sql',
        sql: `UPDATE productivity.task SET seconds = '${newSeconds}', 
            updatedtime=CURRENT_TIMESTAMP WHERE id = '${taskId}'`,
    }
    const responseAndResult = await harperFetch(data)
    return responseAndResult
}
