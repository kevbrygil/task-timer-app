/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useCallback, useEffect } from 'react'
import type { Task } from '../interfaces/Task'
import { harperGetTasksMonth } from '../utils/harperdb/getTasksMonth'

export const useTasksMonth = (username: string) => {
    const [tasksMonth, setTasksMonth] = useState<Task[]>([])

    const getAndSetTasksMonth = useCallback(
        async (callbackUsername: string) => {
            try {
                const callbackTasksMonth: Task[] = await harperGetTasksMonth(callbackUsername)
                setTasksMonth(callbackTasksMonth)
            } catch (err) {
                console.log(err)
            }
        },
        [setTasksMonth]
    )

    useEffect(() => {
        if (!username || tasksMonth.length > 0) return
        getAndSetTasksMonth(username)
    }, [username, tasksMonth.length, getAndSetTasksMonth])

    return { tasksMonth, setTasksMonth, getAndSetTasksMonth }
}
