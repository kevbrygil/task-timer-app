import { harperFetch } from './harperFetch'

export const harperGetTasks = async (username: string) => {
    const data = {
        operation: 'sql',
        sql: `SELECT id, name, seconds, createdtime, updatedtime FROM productivity.task
            WHERE username = '${username}' ORDER BY updatedtime DESC`,
    }

    const { result } = await harperFetch(data)
    return result
}
