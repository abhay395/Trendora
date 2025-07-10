import React from 'react'
import Navbar from './componente/Navbar'
import Footer from './componente/Footer'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
    return (
        <div>
            <Navbar />
            <div className=''>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}