import { useContext } from 'react'
import { TasksContext } from '../../contexts/TasksContext'
import { UserContext } from '../../contexts/UserContext'
import { formatTime } from '../../utils/formatTime'
import { harperSaveTaskTime } from '../../utils/harperdb/saveTaskTime'
import Button from '../Button'
import type { CurrentTaskTime } from '../../interfaces/CurrentTaskTime'
interface TimerProps {
    seconds: number
    setSeconds: React.Dispatch<React.SetStateAction<number>>
    isTimerOn: boolean
    startTimer: () => void
    pauseTimer: () => void
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
    selectedTaskId: string
    selectedTaskName: string
    setCurrentTaskTimes: React.Dispatch<React.SetStateAction<CurrentTaskTime[]>>
}
export const Timer: React.FC<TimerProps> = ({
    seconds,
    setSeconds,
    isTimerOn,
    startTimer,
    pauseTimer,
    setErrorMessage,
    selectedTaskId,
    selectedTaskName,
    setCurrentTaskTimes,
}) => {
    const { tasks, getAndSetTasks } = useContext(TasksContext)
    const { username } = useContext(UserContext)
    const { formattedHours, formattedMins, formattedSecs } = formatTime(seconds)
    const handleStartTimer = () => {
        setErrorMessage('')
        if (selectedTaskId == '') {
            setErrorMessage('Por favor seleccione una tarea')
        } else {
            startTimer()
        }
    }
    const handleLogTime = async () => {
        pauseTimer()
        const prevTaskSeconds = getTaskTimeFromId(selectedTaskId)
        const newTaskSeconds = prevTaskSeconds + seconds
        const { response, result } = await harperSaveTaskTime(selectedTaskId, newTaskSeconds)
        if (response.status === 200) {
            getAndSetTasks(username)
            setSeconds(0)
            setCurrentTaskTimes((prev) => [{ name: selectedTaskName, seconds: seconds }, ...prev])
        } else setErrorMessage('Ocurrio un problema al guardar el tiempo')
        console.log({ response, result })
    }
    const getTaskTimeFromId = (id: string) => {
        const task = tasks.find((task) => task.id === id)
        if (!task) return 0
        return task.time_in_seconds
    }
    const handleResetTimer = () => {
        pauseTimer()
        setSeconds(0)
    }
    return (
        <div>
            <div className="mt-8 border-2 border-gray-500 rounded p-14 text-5xl">
                {formattedHours} : {formattedMins} : {formattedSecs}
            </div>
            <div className="flex justify-center mt-10">
                {isTimerOn ? (
                    <>
                        <Button color="warning" handleClick={pauseTimer}>
                            Pausar
                        </Button>
                    </>
                ) : (
                    <Button color="success" handleClick={handleStartTimer}>
                        Iniciar
                    </Button>
                )}
                {(seconds > 0 || isTimerOn) && (
                    <Button color="danger" handleClick={handleLogTime} extraClasses="ml-4">
                        Registrar tiempo
                    </Button>
                )}
            </div>
            {(seconds > 0 || isTimerOn) && (
                <button
                    onClick={handleResetTimer}
                    className="underline underline-offset-2 mt-8 cursor-pointer text-gray-500 mx-auto block"
                >
                    Reiniciar
                </button>
            )}
        </div>
    )
}
interface TimerBtnProps {
    handleClick: () => void
    text: string
    extraClasses?: string
}
export const TimerBtn: React.FC<TimerBtnProps> = ({ handleClick, text, extraClasses }) => {
    return (
        <button
            className={`${
                text === 'Start' ? 'bg-blue-500' : 'bg-red-500'
            } rounded px-4 py-2 text-white mt-8 ${extraClasses}`}
            onClick={handleClick}
        >
            {text}
        </button>
    )
}
