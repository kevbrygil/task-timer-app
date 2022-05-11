import { harperFetch } from './harperFetch'
import type { HarperData } from '../../interfaces/HarperData'

export const harperAddNewTask = async (username: string, taskName: string): Promise<HarperData> => {
    const data = {
        operation: 'sql',
        sql: `insert into productivity.task (name, createdtime, updatedtime, username, seconds, status) VALUES ('${taskName}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '${username}', 0, 'Activo')`,
    }

    const responseAndResult = await harperFetch(data)
    return responseAndResult
}
