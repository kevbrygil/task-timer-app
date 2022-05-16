import React, { useContext } from 'react'
import Head from '../components/Head'
import type { NextPage } from 'next'
import { UserContext } from '../contexts/UserContext'
import Header from '../components/PageHeading'
import Link from '../components/Link'
import Alert from '../components/Alert'
import HistoryTasks from '../components/statsPage/HistoryTasks'
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
                        <div className="p-7">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Card type="inner" title="Card title" bordered={true}>
                                        Card content
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    <Card type="inner" title="Card title" bordered={true}>
                                        Card content
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
