import { useState, useContext } from 'react'
import { harperAddNewTask } from '../../utils/harperdb/addNewTask'
import { UserContext } from '../../contexts/UserContext'
import { TasksContext } from '../../contexts/TasksContext'
import Button from '../Button'

interface Props {
    selectedTaskId: string
    setSelectedTaskId: React.Dispatch<React.SetStateAction<string>>
    setSelectedTaskName: React.Dispatch<React.SetStateAction<string>>
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
    setSeconds: React.Dispatch<React.SetStateAction<number>>
    pauseTimer: () => void
}

const TaskBar: React.FC<Props> = ({
    selectedTaskId,
    setSelectedTaskId,
    setSelectedTaskName,
    setErrorMessage,
    setSeconds,
    pauseTimer,
}) => {
    const { username } = useContext(UserContext)
    const { tasks, getAndSetTasks } = useContext(TasksContext)

    const [isUserAddingNewTask, setIsUserAddingNewTask] = useState(false)
    const [taskInputValue, setTaskInputValue] = useState('')

    const handleChangeTaskInput = (e: { target: HTMLInputElement }): void => {
        setTaskInputValue(e.target.value)
    }

    const handleSelectTask = (e: { target: HTMLSelectElement }): void => {
        const { options, selectedIndex, value } = e.target
        const text = options[selectedIndex].text

        setErrorMessage('')
        setSelectedTaskId(value)
        setSelectedTaskName(text)
        setSeconds(0)
        pauseTimer()
    }

    const addNewTask = async (): Promise<void> => {
        try {
            const { response } = await harperAddNewTask(username, taskInputValue)
            if (response.status === 200) {
                getAndSetTasks(username)
            } else setErrorMessage('Ocurrio un problema, contacte con soporte')
        } catch (err) {
            console.log(err)
            setErrorMessage('Ocurrio un problema, contacte con soporte')
        }
    }

    const resetAddingNewTask = (): void => {
        setTaskInputValue('')
        setIsUserAddingNewTask(false)
    }

    const handleClickAddNewTask = (): void => {
        if (taskInputValue.trim() === '') {
            setErrorMessage('Escriba una tarea')
            return
        }
        addNewTask()
        resetAddingNewTask()
    }

    return (
        <>
            <div>
                {isUserAddingNewTask ? (
                    <>
                        <input
                            type="text"
                            placeholder="Ingrese la tarea aquí..."
                            value={taskInputValue}
                            onChange={handleChangeTaskInput}
                            className="border p-2 mr-2"
                        />
                        <Button color="primary" handleClick={handleClickAddNewTask}>
                            Agregar tarea
                        </Button>
                        <Button color="secondary" handleClick={() => setIsUserAddingNewTask(false)} extraClasses="ml-1">
                            Cancelar
                        </Button>
                    </>
                ) : (
                    <>
                        <select
                            className="mr-4 p-2 border"
                            name="task"
                            id="task"
                            onChange={handleSelectTask}
                            value={selectedTaskId ? selectedTaskId : ''}>
                            {selectedTaskId === '' && (
                                <option disabled value="" hidden>
                                    -- Seleccione una tarea --
                                </option>
                            )}
                            {tasks.length &&
                                tasks.map(
                                    (task) =>
                                        task.status === 'Activo' && (
                                            <option key={task.id} value={task.id}>
                                                {task.name}
                                            </option>
                                        )
                                )}
                        </select>
                        <Button handleClick={() => setIsUserAddingNewTask(true)} color="primary">
                            Nueva tarea
                        </Button>
                    </>
                )}
            </div>
        </>
    )
}

export default TaskBar
