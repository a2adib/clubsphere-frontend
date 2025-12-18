import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../components/Aside';

const Dashboard = () => {
    return (
        <div className='flex'>

            <Aside/>
            <Outlet />
        </div>
    );
};

export default Dashboard;