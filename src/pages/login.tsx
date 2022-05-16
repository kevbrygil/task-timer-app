import { useContext } from 'react'
import Head from '../components/Head'
import type { NextPage } from 'next'
import { UserContext } from '../contexts/UserContext'
import PageHeading from '../components/PageHeading'
import LoginForm from '../components/loginPage/LoginForm'

const Login: NextPage = () => {
    const { username } = useContext(UserContext)

    return (
        <>
            <Head>
                <title>Iniciar sesión</title>
            </Head>
            <div className="grow flex flex-col items-center my-20">
                {username ? (
                    <>
                        <p>
                            Tu estas logueado como
                            <span className="text-green-600 font-semibold ml-1">{username}</span> 👋
                        </p>
                        <p>
                            <a href="/">Ir al temporizador</a>
                        </p>
                    </>
                ) : (
                    <>
                        <PageHeading extraClasses="text-center mb-8">Iniciar sesión</PageHeading>
                        <LoginForm />
                    </>
                )}
            </div>
        </>
    )
}

export default Login
