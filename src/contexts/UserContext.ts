/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react'

export const UserContext = createContext({
    username: '',
    setUsername: (username: string) => {},
})
