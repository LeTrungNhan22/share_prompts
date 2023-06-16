
/*
 * Author: Le Trung Nhan
 * Created on: Mon Jun 12 2023
 * Birthday:  22/08/2001
 */


import React from 'react'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import '@styles/globals.css'
import { Toaster } from "react-hot-toast"

export const metadata = {
    title: "Prompts",
    description: "A collection of prompts to help you get started with your next project.",


}
const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/assets/images/logo_v1.png" />
            </head>
            <body>
                <Provider>
                    <Toaster />
                    <div className="main">
                        <div className="gradient"></div>
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout   