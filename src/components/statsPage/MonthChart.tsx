import { useContext } from 'react'
import { ChartMonthContext } from '../../contexts/ChartMonthContext'
import type { ChartMonthInterface } from '../../interfaces/ChartMonth'
import { MonthNumbertoMonthName } from '../../utils/formatTime'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

const MonthChart: React.FC = () => {
    const { chartMonth } = useContext(ChartMonthContext)
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
            },
        },
        tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>",
        multiTooltipTemplate: "<%= value + ' %' %>",
    }

    const labels = chartMonth.map((item: ChartMonthInterface) => MonthNumbertoMonthName(item.month))
    const data = {
        labels,
        datasets: [
            {
                label: 'Tiempo en horas',
                data: chartMonth.map((item: ChartMonthInterface) => Math.trunc(item.seconds / 3600)),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    }
    return <Line options={options} data={data} />
}

export default MonthChart
