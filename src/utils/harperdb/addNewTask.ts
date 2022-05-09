import { harperFetch } from './harperFetch'

export const harperAddNewTask = async (username: string, taskName: string) => {
    const data = {
        operation: 'sql',
        sql: `insert into productivity.task (name, createdtime, updatedtime, username, seconds)
            VALUES (${username}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ${username}, 0)`,
    }

    const responseAndResult = await harperFetch(data)
    return responseAndResult
}
