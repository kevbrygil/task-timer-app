import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import { UserContext } from '../contexts/UserContext'
import { useUser } from '../hooks/useUser'
import { TasksContext } from '../contexts/TasksContext'
import { useTasks } from '../hooks/useTasks'

const TaskTimerApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    const { username, setUsername } = useUser()
    const { tasks, setTasks, getAndSetTasks } = useTasks(username)
    return (
        <UserContext.Provider value={{ username, setUsername }}>
            <TasksContext.Provider value={{ tasks, setTasks, getAndSetTasks }}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </TasksContext.Provider>
        </UserContext.Provider>
    )
}

export default TaskTimerApp
