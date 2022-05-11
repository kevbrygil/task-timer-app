import { harperFetch } from './harperFetch'
import type { Task } from '../../interfaces/Task'

export const harperGetTasks = async (username: string): Promise<Task[]> => {
    const data = {
        operation: 'sql',
        sql: `SELECT id, name, seconds, createdtime, updatedtime,status FROM productivity.task
            WHERE username = '${username}' ORDER BY updatedtime DESC`,
    }

    const { result } = await harperFetch(data)
    return result
}
