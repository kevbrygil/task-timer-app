/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react'
import { TasksContext } from '../../contexts/TasksContext'
import { Table, Tag, Space, Tooltip, Input, InputNumber, Popconfirm, Form, Typography } from 'antd'
import type { Task } from '../../interfaces/Task'
import { displayTimeString, timestampToDayMonthYear } from '../../utils/formatTime'
import { DeleteOutlined, TrophyOutlined, FormOutlined } from '@ant-design/icons'
import { harperDeleteTask } from '../../utils/harperdb/deleteTask'
import { harperFinishTask } from '../../utils/harperdb/finishTask'
import { harperEditTask } from '../../utils/harperdb/editTask'

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean
    dataIndex: string
    title: any
    inputType: 'number' | 'text'
    record: Task
    index: number
    children: React.ReactNode
}

const HistoryTasks: React.FC = () => {
    const { tasks, getAndSetTasks } = useContext(TasksContext)
    const [errorMessage, setErrorMessage] = useState('')

    const handleDeleteRow = async (username: string, taskId: string): Promise<void> => {
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

    const handleFinishRow = async (username: string, taskId: string): Promise<void> => {
        setErrorMessage('')
        const areYouSure = confirm('Seguro que deseas finalizar está tarea?')
        if (!areYouSure) return

        try {
            const { response } = await harperFinishTask(taskId)
            if (response.status === 200) {
                getAndSetTasks(username)
                return
            }
        } catch (err) {
            console.log(err)
        }
        setErrorMessage('Ocurrio un problema al finalizar la tarea')
    }

    const EditableCell: React.FC<EditableCellProps> = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[
                            {
                                required: true,
                                message: `Por favor introduzca ${title}!`,
                            },
                        ]}>
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        )
    }

    const [form] = Form.useForm()
    const [editingKey, setEditingKey] = useState('')

    const isEditing = (record: Task) => record.id === editingKey

    const edit = (record: Task) => {
        form.setFieldsValue({ name: '', ...record })
        setEditingKey(record.id)
    }

    const cancel = () => {
        setEditingKey('')
    }

    const save = async (key: string) => {
        try {
            const row = (await form.validateFields()) as Task

            const newData = [...tasks]
            const index = newData.findIndex((item) => item.id === key)
            if (index > -1) {
                setErrorMessage('')
                const item = newData[index]
                const { response } = await harperEditTask(item.id, row.name)
                if (response.status === 200) getAndSetTasks(item.username)
                else setErrorMessage('Ocurrio un problema al finalizar la tarea')
            }
            setEditingKey('')
        } catch (errInfo) {
            console.log('Ocurrio un problema al editar la tarea:', errInfo)
        }
    }

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: Task, b: Task) => a.name.localeCompare(b.name),
            editable: true,
        },
        {
            title: 'Tiempo total',
            dataIndex: 'seconds',
            key: 'seconds',
            render: (seconds: number) => displayTimeString(seconds),
            sorter: (a: Task, b: Task) => a.seconds - b.seconds,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: <span>Activo</span>,
                    value: 'Activo',
                },
                {
                    text: <span>Finalizado</span>,
                    value: 'Finalizado',
                },
            ],
            sorter: (a: Task, b: Task) => a.status.localeCompare(b.status),
            onFilter: (value: any, record: Task) => record.status.startsWith(value),
            filterSearch: (input: any, record: any) => record.value.indexOf(input) > -1,
            defaultFilteredValue: ['Finalizado'],
            render: (status: string) => (
                <>
                    {status === 'Finalizado' ? (
                        <Tag color="green" key={status}>
                            {status.toUpperCase()}
                        </Tag>
                    ) : (
                        <Tag color="geekblue" key={status}>
                            {status.toUpperCase()}
                        </Tag>
                    )}
                </>
            ),
        },
        {
            title: 'Inicio',
            dataIndex: 'createdtime',
            key: 'createdtime',
            render: (createdtime: number) => timestampToDayMonthYear(createdtime),
            sorter: (a: Task, b: Task) => a.createdtime - b.createdtime,
        },
        {
            title: 'Última actualización',
            dataIndex: 'updatedtime',
            key: 'updatedtime',
            render: (updatedtime: number) => timestampToDayMonthYear(updatedtime),
            sorter: (a: Task, b: Task) => a.updatedtime - b.updatedtime,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: Task) => (
                <Space size="middle">
                    {isEditing(record) ? (
                        <span>
                            <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
                                Guardar
                            </Typography.Link>
                            <Popconfirm title="¿Estás seguro que desea cancelar?" onConfirm={cancel}>
                                <a>Cancelar</a>
                            </Popconfirm>
                        </span>
                    ) : (
                        <>
                            <Tooltip title="Editar">
                                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                                    <FormOutlined />
                                </Typography.Link>
                            </Tooltip>
                            {record.status === 'Activo' && (
                                <Tooltip title="Finalizar Tarea">
                                    <button
                                        onClick={() => handleFinishRow(record.username, record.id)}
                                        className="text-blue-700 hover:text-blue-500">
                                        <TrophyOutlined />
                                    </button>
                                </Tooltip>
                            )}
                            <Tooltip title="Eliminar Tarea">
                                <button
                                    onClick={() => handleDeleteRow(record.username, record.id)}
                                    className="text-red-700 hover:text-red-500">
                                    <DeleteOutlined />
                                </button>
                            </Tooltip>
                        </>
                    )}
                </Space>
            ),
        },
    ]

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col
        }
        return {
            ...col,
            onCell: (record: Task) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        }
    })

    return (
        <div className="overflow-x-auto mt-4">
            {errorMessage && <p className="text-center text-red-500 mb-8">{errorMessage}</p>}
            <Form form={form} component={false}>
                <Table
                    rowKey={(task) => task.id}
                    columns={mergedColumns}
                    dataSource={tasks}
                    className="text-center"
                    bordered
                    title={() => (
                        <>
                            <span className="text-sm font-medium">Histórico</span>
                        </>
                    )}
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </div>
    )
}

export default HistoryTasks
