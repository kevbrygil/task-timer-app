import React from 'react'
import Head from 'next/head'

interface HeadAppProps {
    children: React.ReactNode
}

const HeadApp: React.FC<HeadAppProps> = ({ children }) => {
    return <Head>{children}</Head>
}

export default HeadApp
