import type { NextApiRequest, NextApiResponse } from 'next'
import handler from '../../middleware/_defaultHandler'
import { harperCreateNewUser } from '../../utils/harperdb/createNewUser'

const getFormErrors = (username: string, password1: string, password2: string) => {
    const errors: string[] = []
    if (!username || !password1 || !password2) {
        errors.push('Todos los campos son requeridos')
    }
    if (password1.length < 6) {
        errors.push('La contraseña debe ser más de 6 caracteres')
    }
    if (password1 !== password2) {
        errors.push('Las contraseñas no coinciden')
    }
    return errors
}

export default handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, password1, password2 } = req.body
    const errors: string[] = getFormErrors(username, password1, password2)
    if (errors.length > 0) {
        return res.status(400).json({ error: errors })
    }
    try {
        const { response, result } = await harperCreateNewUser(username, password1)
        return res.status(response.status).json(result)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})
