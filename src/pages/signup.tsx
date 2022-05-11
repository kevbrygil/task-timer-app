import type { NextPage } from 'next'
import SignupForm from '../components/signupPage/SignupForm'
import PageHeading from '../components/PageHeading'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import Alert from '../components/Alert'

const Signup: NextPage = () => {
    const { username } = useContext(UserContext)

    return (
        <div className="mx-auto my-20">
            {username ? (
                <Alert type="success">Tu estás logueado como {username}</Alert>
            ) : (
                <>
                    <PageHeading extraClasses="text-center mb-8">Crea una cuenta</PageHeading>
                    <SignupForm />
                </>
            )}
        </div>
    )
}

export default Signup
