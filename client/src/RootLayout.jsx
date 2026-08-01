import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
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