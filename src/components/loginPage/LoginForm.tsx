import { useState, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { LabelAndInput } from '../Form'
import Button from '../Button'
import Alert from '../Alert'
import { harperFetchJWTTokens } from '../../utils/harperdb/fetchJWTTokens'

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const user = useContext(UserContext)

    const authenticateUser = (authUsername: string, accessToken: string): void => {
        user.setUsername(authUsername)
        localStorage.setItem('access_token', accessToken)
    }

    const handleSubmit = async (e: React.FormEvent): Promise<void | undefined> => {
        e.preventDefault()
        setError('')
        if (!username || !password) {
            setError('Nombre de usuario y contraseña son requeridos')
            return
        }

        try {
            const { response, result } = await harperFetchJWTTokens(username, password)
            const { status } = response
            const accessToken = result.operation_token
            if (status === 200 && accessToken) {
                authenticateUser(username, accessToken)
            } else if (status === 401) {
                setError('Verifique que su nombre y contraseña sean válidos')
            } else {
                setError('Se presentó un problema externo, verifique su conexión')
            }
        } catch (err) {
            console.log(err)
            setError('Se presentó un problema externo, verifique su conexión')
        }
    }

    return (
        <form className="w-full sm:w-96 px-4 sm:px-0" onSubmit={handleSubmit}>
            <LabelAndInput
                label="Nombre de usuario"
                inputType="text"
                inputName="username"
                handleChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <LabelAndInput
                label="Contraseña"
                inputType="password"
                inputName="password"
                handleChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <Button color="success" extraClasses="w-full mt-3 py-3 px-4 sm:px-0 font-semibold">
                Iniciar sesión
            </Button>

            {error && <Alert type="danger">{error}</Alert>}
        </form>
    )
}

export default LoginForm
