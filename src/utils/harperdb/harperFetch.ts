/* eslint-disable @typescript-eslint/no-explicit-any */
import { DB_URL } from '../../constants/constants'
import type { HarperData } from '../../interfaces/HarperData'

export const harperFetch = async (data: { [key: string]: any }): Promise<HarperData> => {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) throw { error: 'Necesitas estar logueado' }

    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Authorization', 'Bearer ' + accessToken)

    const raw = JSON.stringify(data)

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
