import React, { useState } from 'react';
import '../User/Dashboard.css'
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {

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


export default AdminDashboard;