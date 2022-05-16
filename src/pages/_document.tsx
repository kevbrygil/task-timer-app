import React, { ReactElement } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class TASKTIMERDOCUMENT extends Document {
    render(): ReactElement {
        return (
            <Html lang="es">
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="theme-color" content="#000000" />
                    <link rel="shortcut icon" href="/icon.jpg" />
                </Head>
                <body>
                    <div id="page-transition"></div>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default TASKTIMERDOCUMENT
