import { useContext } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { TasksMonthContext } from '../../contexts/TasksMonthContext'
import type { Task } from '../../interfaces/Task'

const TaskMonthChart: React.FC = () => {
    const { tasksMonth } = useContext(TasksMonthContext)
    ChartJS.register(ArcElement, Tooltip, Legend)

    const data = {
        labels: tasksMonth.map((item: Task) => item.name),
        datasets: [
            {
                data: tasksMonth.map((item: Task) => Math.trunc(item.seconds / 60)),
                backgroundColor: [
                    '#7cb5ec',
                    '#434348',
                    '#90ed7d',
                    '#f7a35c',
                    '#8085e9',
                    '#f15c80',
                    '#e4d354',
                    '#2b908f',
                    '#f45b5b',
                    '#91e8e1',
                ],
                borderColor: ['#fff'],
                borderWidth: 1,
            },
        ],
    }
    return (
        <div className="sm:flex sm:justify-center">
            <div className="sm:relative sm:h-96 sm:w-96">
                <Pie data={data} />
            </div>
        </div>
    )
}

export default TaskMonthChart
