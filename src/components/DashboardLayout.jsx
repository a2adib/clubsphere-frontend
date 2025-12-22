import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-4 text-2xl font-bold">Dashboard</div>
                <nav className="flex-1 px-2 py-4">
                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                            isActive ? "block px-4 py-2 rounded bg-gray-700 text-white" : "block px-4 py-2 rounded hover:bg-gray-700"
                        }
                    >
                        Dashboard Home
                    </NavLink>
                    <NavLink
                        to="/dashboard/profile"
                        className={({ isActive }) =>
                            isActive ? "block px-4 py-2 rounded bg-gray-700 text-white" : "block px-4 py-2 rounded hover:bg-gray-700"
                        }
                    >
                        Profile
                    </NavLink>
                    {/* Add more dashboard links here based on user roles */}
                    <NavLink
                        to="/dashboard/my-donation-requests"
                        className={({ isActive }) =>
                            isActive ? "block px-4 py-2 rounded bg-gray-700 text-white" : "block px-4 py-2 rounded hover:bg-gray-700"
                        }
                    >
                        My Donation Requests
                    </NavLink>
                    <NavLink
                        to="/dashboard/create-donation-request"
                        className={({ isActive }) =>
                            isActive ? "block px-4 py-2 rounded bg-gray-700 text-white" : "block px-4 py-2 rounded hover:bg-gray-700"
                        }
                    >
                        Create Donation Request
                    </NavLink>
                    <NavLink
                        to="/dashboard/all-users"
                        className={({ isActive }) =>
                            isActive ? "block px-4 py-2 rounded bg-gray-700 text-white" : "block px-4 py-2 rounded hover:bg-gray-700"
                        }
                    >
                        All Users
                    </NavLink>
                    <NavLink
                        to="/dashboard/all-blood-donation-request"
                        className={({ isActive }) =>
                            isActive ? "block px-4 py-2 rounded bg-gray-700 text-white" : "block px-4 py-2 rounded hover:bg-gray-700"
                        }
                    >
                        All Blood Donation Requests
                    </NavLink>
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center p-4 bg-white border-b-2 border-gray-200">
                    <div className="text-xl font-semibold">Welcome to Dashboard</div>
                    {/* User profile/logout can go here */}
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
