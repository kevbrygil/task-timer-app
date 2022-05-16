import '../styles/globals.css'
import 'antd/dist/antd.less'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import { UserContext } from '../contexts/UserContext'
import { useUser } from '../hooks/useUser'
import { TasksContext } from '../contexts/TasksContext'
import { useTasks } from '../hooks/useTasks'
import { TasksMonthContext } from '../contexts/TasksMonthContext'
import { useTasksMonth } from '../hooks/useTasksMonth'
import { ChartMonthContext } from '../contexts/ChartMonthContext'
import { useChartMonth } from '../hooks/useChartMonth'
import { ConfigProvider } from 'antd'
import esES from 'antd/lib/locale/es_ES'

const TaskTimerApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    const { username, setUsername } = useUser()
    const { tasks, setTasks, getAndSetTasks } = useTasks(username)
    const { tasksMonth, setTasksMonth, getAndSetTasksMonth } = useTasksMonth(username)
    const { chartMonth, setChartMonth, getAndSetChartMonth } = useChartMonth(username)
    return (
        <UserContext.Provider value={{ username, setUsername }}>
            <TasksContext.Provider value={{ tasks, setTasks, getAndSetTasks }}>
                <TasksMonthContext.Provider value={{ tasksMonth, setTasksMonth, getAndSetTasksMonth }}>
                    <ChartMonthContext.Provider value={{ chartMonth, setChartMonth, getAndSetChartMonth }}>
                        <ConfigProvider locale={esES}>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </ConfigProvider>
                    </ChartMonthContext.Provider>
                </TasksMonthContext.Provider>
            </TasksContext.Provider>
        </UserContext.Provider>
    )
}

export default TaskTimerApp
