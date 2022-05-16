import { harperFetch } from './harperFetch'
import type { HarperData } from '../../interfaces/HarperData'
export const harperFinishTask = async (taskId: string): Promise<HarperData> => {
    const data = {
        operation: 'sql',
        sql: `UPDATE productivity.task SET status = 'Finalizado', 
            updatedtime=CURRENT_TIMESTAMP WHERE id = '${taskId}'`,
    }
    const responseAndResult = await harperFetch(data)
    return responseAndResult
}
