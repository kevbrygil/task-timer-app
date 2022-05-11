/* eslint-disable camelcase */
import { harperFetch } from './harperFetch'
import type { HarperData } from '../../interfaces/HarperData'

export const harperDeleteTask = async (taskId: string): Promise<HarperData> => {
    const data = {
        operation: 'delete',
        schema: 'productivity',
        table: 'task',
        hash_values: [taskId],
    }

    const responseAndResult = await harperFetch(data)
    return responseAndResult
}
