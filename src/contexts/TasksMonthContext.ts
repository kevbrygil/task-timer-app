import React, { createContext } from 'react'
import type { Task } from '../interfaces/Task'

interface TasksMonthContext {
    tasksMonth: Task[]
    setTasksMonth: React.Dispatch<React.SetStateAction<Task[]>>
    getAndSetTasksMonth: (username: string) => Promise<void>
}

export const TasksMonthContext = createContext({} as TasksMonthContext)
