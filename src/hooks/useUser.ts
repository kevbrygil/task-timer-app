import { useState, useEffect } from 'react'
import { harperGetUsername } from '../utils/harperdb/getUsername'
import type { UseUserData } from '../interfaces/UseUserData'

export const useUser = (): UseUserData => {
    const [username, setUsername] = useState('')

    useEffect(() => {
        if (username) return
        const accessToken = localStorage.getItem('access_token')
        const tryLogUserIn = async (logAccessToken: string): Promise<void> => {
            const logUsername = await harperGetUsername(logAccessToken)
            if (logUsername) {
                setUsername(logUsername)
            }
        }
        if (accessToken) {
            tryLogUserIn(accessToken)
        }
    })

    return { username, setUsername }
}
