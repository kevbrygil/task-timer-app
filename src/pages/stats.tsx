import React, { useState, useContext, ReactNode } from 'react'
import type { NextPage } from 'next'
import { UserContext } from '../contexts/UserContext'
import { TasksContext } from '../contexts/TasksContext'
import Header from '../components/PageHeading'
import Link from '../components/Link'
import Alert from '../components/Alert'
import { displayTimeString, timestampToDayMonthYear } from '../utils/formatTime'
import { harperDeleteTask } from '../utils/harperdb/deleteTask'

const TH: React.FC<{ children: string }> = ({ children }) => {
    const classes = 'border border-slate-300 rounded-top p-4'
    return <th className={classes}>{children}</th>
}

interface TDProps {
    children: ReactNode
}
const TD: React.FC<TDProps> = ({ children }) => {
    const classes = 'border border-slate-300 p-4'
    return <td className={classes}>{children}</td>
}

const Stats: NextPage = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const { username } = useContext(UserContext)
    const { tasks, getAndSetTasks } = useContext(TasksContext)
    const handleDeleteRow = async (taskId: string): Promise<void> => {
        setErrorMessage('')
        const areYouSure = confirm('Seguro que deseas eliminar está tarea?')
        if (!areYouSure) return

        try {
            const { response } = await harperDeleteTask(taskId)
            if (response.status === 200) {
                getAndSetTasks(username)
                return
            }
        } catch (err) {
            console.log(err)
        }
        setErrorMessage('Ocurrio un problema al eliminar la tarea')
    }

    return (
        <div>
            {!username ? (
                <Alert type="warning" extraClasses="mb-12">
                    Por favor <Link href="/login">Inicie sesión</Link> ó <Link href="/signup">Crea una cuenta</Link>
                </Alert>
            ) : (
                <>
                    <Header extraClasses="mb-6 text-center mt-8">Estadísticas</Header>
                    {errorMessage && <p className="text-center text-red-500 mb-8">{errorMessage}</p>}
                    <div className="overflow-x-auto ">
                        <table className="table-auto border-collapse border border-slate-400 w-full sm:w-3/4 mx-auto mb-10">
                            <thead className="bg-slate-100 text-left">
                                <tr>
                                    <TH>Tarea</TH>
                                    <TH>Tiempo total</TH>
                                    <TH>Estatus</TH>
                                    <TH>Inicio</TH>
                                    <TH>Última actualización</TH>
                                    <TH>Eliminar</TH>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.length > 0 &&
                                    tasks.map((task) => (
                                        <tr key={task.id}>
                                            <TD>{task.name}</TD>
                                            <TD>{displayTimeString(task.seconds)}</TD>
                                            <TD>{task.status}</TD>
                                            <TD>{timestampToDayMonthYear(task.createdtime)}</TD>
                                            <TD>{timestampToDayMonthYear(task.updatedtime)}</TD>
                                            <TD>
                                                <button
                                                    onClick={() => handleDeleteRow(task.id)}
                                                    className="bg-red-500 text-white rounded px-3 py-1">
                                                    x
                                                </button>
                                            </TD>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    )
}
export default Stats
