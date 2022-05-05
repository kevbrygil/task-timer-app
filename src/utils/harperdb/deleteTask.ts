import { harperFetch } from './harperFetch'

export const harperDeleteTask = async (taskId: string) => {
    const data = {
        operation: 'delete',
        schema: 'productivity',
        table: 'task',
        hash_values: [taskId],
    }

    const responseAndResult = await harperFetch(data)
    return responseAndResult
}
