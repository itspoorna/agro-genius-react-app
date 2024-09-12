import React, { useState } from 'react';
import './Dashboard.css'
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }

    return (
        <div className="grid-container ">
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <div className="container">
                <Outlet/>
            </div>
        </div>
    );
}


export default Dashboard;