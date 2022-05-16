import { harperFetch } from './harperFetch'
import type { Task } from '../../interfaces/Task'

export const harperGetTasksMonth = async (username: string): Promise<Task[]> => {
    const data = {
        operation: 'sql',
        sql: `select t.id, t.name, t.seconds, t.createdtime, t.updatedtime, t.status from productivity.task t
        where extract(NOW(), 'year')=extract(t.updatedtime, 'year') and extract(NOW(), 'month')=extract(t.updatedtime, 'month')
        and status='Finalizado'
        and username = '${username}'
        order by t.updatedtime asc`,
    }
    const { result } = await harperFetch(data)
    return result
}
