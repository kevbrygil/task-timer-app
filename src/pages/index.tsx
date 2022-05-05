import { useState, useContext } from 'react'
import type { NextPage } from 'next'
import type { CurrentTaskTime } from '../interfaces/CurrentTaskTime'
import { UserContext } from '../contexts/UserContext'
import useTimer from '../hooks/useTimer'
import Taskbar from '../components/forms/Taskbar'
import { Timer } from '../components/forms/Timer'
import Alert from '../components/Alert'
import Link from '../components/Link'
import LogCurrentTaskTimes from '../components/forms/LogCurrentTaskTimes'

const Home: NextPage = () => {
    const [selectedTaskId, setSelectedTaskId] = useState('')
    const [selectedTaskName, setSelectedTaskName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const { isTimerOn, seconds, setSeconds, startTimer, pauseTimer } = useTimer()
    const { username } = useContext(UserContext)
    const [currentTaskTimes, setCurrentTaskTimes] = useState<CurrentTaskTime[]>([])
    return (
        <div className="flex flex-col items-center justify-center pt-4 grow">
            {!username && (
                <Alert type="warning" extraClasses="mb-12">
                    Por favor <Link href="/login">Inicie sesión</Link> ó{' '}
                    <Link href="/signup">Crea una nueva cuenta</Link>
                </Alert>
            )}
            <Taskbar
                selectedTaskId={selectedTaskId}
                setSelectedTaskId={setSelectedTaskId}
                setSelectedTaskName={setSelectedTaskName}
                setErrorMessage={setErrorMessage}
                setSeconds={setSeconds}
                pauseTimer={pauseTimer}
            />
            <Timer
                seconds={seconds}
                setSeconds={setSeconds}
                setCurrentTaskTimes={setCurrentTaskTimes}
                selectedTaskName={selectedTaskName}
                isTimerOn={isTimerOn}
                startTimer={startTimer}
                pauseTimer={pauseTimer}
                setErrorMessage={setErrorMessage}
                selectedTaskId={selectedTaskId}
            />
            {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
            {currentTaskTimes.length > 0 && (
                <LogCurrentTaskTimes currentTaskTimes={currentTaskTimes} />
            )}
        </div>
    )
}
export default Home
