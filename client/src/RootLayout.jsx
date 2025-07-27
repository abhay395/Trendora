import React from 'react'
import Navbar from './componente/Navbar'
import Footer from './componente/Footer'
import { Outlet } from 'react-router-dom'
import ScrollToTop from './componente/ScrollToTop'
import { Toaster } from 'react-hot-toast';

export default function RootLayout() {
    return (
        <div>
            <ScrollToTop />
            <Navbar />
            <div className=''>
                <Outlet />
            </div>
            <Footer />
             <Toaster />
        </div>
    )
}