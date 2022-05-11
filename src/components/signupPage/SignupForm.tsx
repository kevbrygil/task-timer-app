import { useState, useContext } from 'react'
import { LabelAndInput } from '../Form'
import Button from '../Button'
import { postFormData } from '../../utils/postFormData'
import Alert from '../Alert'
import { UserContext } from '../../contexts/UserContext'
import { useRouter } from 'next/router'
import { harperFetchJWTTokens } from '../../utils/harperdb/fetchJWTTokens'

const SignupForm: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [errors, setErrors] = useState<string | string[]>('')
    const user = useContext(UserContext)
    const router = useRouter()

    const authenticateUser = (authUsername: string, accessToken: string): void => {
        user.setUsername(authUsername)
        localStorage.setItem('access_token', accessToken)
    }

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()
        setErrors('')
        const formData = { username, password1, password2 }
        const { response, result } = await postFormData(formData, '/api/signup')
        if (response.status !== 200) {
            setErrors(result.error)
            return
        } else {
            try {
                const fetchData = await harperFetchJWTTokens(username, password1)
                const accessToken = fetchData.result.operation_token
                if (fetchData.response.status === 200 && accessToken) {
                    authenticateUser(username, accessToken)
                } else {
                    router.push('/login')
                }
            } catch (err) {
                console.log(err)
                setErrors('Ocurrio un error al iniciar sesión')
            }
        }
    }

    const displayErrors = (): JSX.Element => {
        if (errors.length === 0) return

        return (
            <>
                {typeof errors === 'string' ? (
                    <Alert type="danger">{errors}</Alert>
                ) : (
                    errors.map((err, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Alert key={i} type="danger">
                            {err}
                        </Alert>
                    ))
                )}
            </>
        )
    }

    return (
        <form className="w-full sm:w-96" onSubmit={handleSubmit}>
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
                inputName="password1"
                handleChange={(e) => setPassword1(e.target.value)}
                value={password1}
            />
            <LabelAndInput
                label="Confirmar contraseña"
                inputType="password"
                inputName="password2"
                handleChange={(e) => setPassword2(e.target.value)}
                value={password2}
            />
            <Button color="success" type="submit" extraClasses="w-full mt-3 py-3 font-semibold">
                Crear usuario
            </Button>
            {displayErrors()}
        </form>
    )
}

export default SignupForm
