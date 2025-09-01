import Footer from '@/components/Footer.jsx'
import Sidebar from '../components/Sidebar.jsx'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex-1'>
                <Outlet />
                <Footer/>
            </div>
        </div>
    )
}

export default Dashboard
