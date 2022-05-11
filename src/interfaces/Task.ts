export interface Task {
    createdtime: number
    updatedtime: number
    username: string
    seconds: number
    id: string
    name: string
    status: string
}
export interface UseTasksData {
    tasks: Task[]
    setTasks: (tasks: Task[]) => void
    getAndSetTasks: Promise<void>
}
