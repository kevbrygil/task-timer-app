import { DB_URL } from '../../constants/constants'

export const harperCreateNewUser = async (username: string, password: string) => {
    const DB_PW = process.env.HARPERDB_PW
    if (!DB_URL || !DB_PW) {
        console.log('Error: variables .env no definidas')
        throw 'Error interno del servidor'
    }
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Authorization', DB_PW)
    const raw = JSON.stringify({
        operation: 'add_user',
        role: 'standard_user',
        username: username.toLowerCase(),
        password: password,
        active: true,
    })
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    }

    const response = await fetch(DB_URL, requestOptions)
    const result = await response.json()
    return { response, result }
}
