import React, { useContext } from 'react'
import Head from '../components/Head'
import type { NextPage } from 'next'
import { UserContext } from '../contexts/UserContext'
import Header from '../components/PageHeading'
import Link from '../components/Link'
import Alert from '../components/Alert'
import HistoryTasks from '../components/statsPage/HistoryTasks'
import MonthChart from '../components/statsPage/MonthChart'
import TasksMonthChart from '../components/statsPage/TasksMonthChart'
import { Card, Row, Col } from 'antd'

const Stats: NextPage = () => {
    const { username } = useContext(UserContext)

    return (
        <>
            <Head>
                <title>Estadísticas</title>
            </Head>
            <div>
                {!username ? (
                    <Alert type="warning" extraClasses="mb-12">
                        Por favor <Link href="/login">Inicie sesión</Link> ó <Link href="/signup">Crea una cuenta</Link>
                    </Alert>
                ) : (
                    <>
                        <Header extraClasses="mb-6 text-center mt-2">Estadísticas</Header>
                        <div className="p-1 sm:p-7">
                            <Row gutter={16}>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                                    <Card
                                        className="h-full"
                                        type="inner"
                                        title="Acumulado de tareas finalizadas del año"
                                        bordered={true}>
                                        <MonthChart />
                                    </Card>
                                </Col>
                                <Col
                                    className="mt-4 md:mt-0"
                                    xs={{ span: 24 }}
                                    sm={{ span: 24 }}
                                    md={{ span: 12 }}
                                    lg={{ span: 12 }}>
                                    <Card
                                        type="inner"
                                        title="Tareas finalizadas del mes actual (Minutos)"
                                        bordered={true}>
                                        <TasksMonthChart />
                                    </Card>
                                </Col>
                            </Row>

                            <HistoryTasks />
                        </div>
                        <hr />
                    </>
                )}
            </div>
        </>
    )
}
export default Stats
