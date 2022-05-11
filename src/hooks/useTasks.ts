import { useState, useCallback, useEffect } from 'react'
import type { Task } from '../interfaces/Task'
import { harperGetTasks } from '../utils/harperdb/getTasks'

export const useTasks = (username: string) => {
    const [tasks, setTasks] = useState<Task[]>([])

    const getAndSetTasks = useCallback(
        async (callbackUsername: string) => {
            try {
                const callbackTasks: Task[] = await harperGetTasks(callbackUsername)
                setTasks(callbackTasks)
            } catch (err) {
                console.log(err)
            }
        },
        [setTasks]
    )

    useEffect(() => {
        if (!username || tasks.length > 0) return
        getAndSetTasks(username)
    }, [username, tasks.length, getAndSetTasks])

    return { tasks, setTasks, getAndSetTasks }
}
