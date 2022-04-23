import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

const handler = nextConnect<NextApiRequest, NextApiResponse>({
    onError: (err, req, res) => {
        res.status(501).json({ error: `Hubo un problema! ${err.message}` })
    },
    onNoMatch: (req, res) => {
        res.status(405).json({ error: `Metodo ${req.method} no permitido` })
    },
})

export default handler
