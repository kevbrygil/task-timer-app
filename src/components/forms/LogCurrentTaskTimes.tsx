import type { CurrentTaskTime } from '../../interfaces/CurrentTaskTime'

interface Props {
    currentTaskTimes: CurrentTaskTime[]
}

const LogCurrentTaskTimes = ({ currentTaskTimes }: Props) => {
    return (
        <div className="mt-8 max-h-56 overflow-y-auto px-8">
            {currentTaskTimes.map((t, i) => (
                <div key={i} className="flex shadow rounded px-8 py-4 mt-2">
                    <p>
                        <span className="text-green-600">{t.seconds}</span> segundo
                        {t.seconds > 1 ? 's' : null} agregado{t.seconds > 1 ? 's' : null} a{' '}
                        <span className="text-green-600">{t.name}</span>
                    </p>
                </div>
            ))}
        </div>
    )
}

export default LogCurrentTaskTimes
