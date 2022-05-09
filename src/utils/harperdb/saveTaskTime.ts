import { harperFetch } from './harperFetch'
export const harperSaveTaskTime = async (taskId: string, newSeconds: number) => {
    const data = {
        operation: 'sql',
        sql: `UPDATE productivity.task SET seconds = '${newSeconds}', 
            updatedtime=CURRENT_TIMESTAMP WHERE id = '${taskId}'`,
    }
    const responseAndResult = await harperFetch(data)
    return responseAndResult
}
