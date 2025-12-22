import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'; // Import useQuery

const MainDashboard = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [recentRequests, setRecentRequests] = useState([]);
    // const [userData, setUserData] = useState(null); // No need for separate state, useQuery handles this

    // Fetch user data including role using useQuery
    const { data: userData, isLoading: userLoading } = useQuery({
        queryKey: ['userData', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email, // Only run if user email is available
    });

    // Fetch statistics for admin/volunteer dashboard
    const { data: statsData, isLoading: statsLoading } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const usersRes = await axiosSecure.get('/users');
            const paymentsRes = await axiosSecure.get('/payments');
            const requestsRes = await axiosSecure.get('/all-requests');
            return {
                totalUsers: usersRes.data.length,
                totalFunding: paymentsRes.data.reduce((sum, payment) => sum + payment.amount, 0),
                totalRequests: requestsRes.data.length,
            };
        },
        enabled: !!user?.email && (userData?.role === 'admin' || userData?.role === 'volunteer'),
    });


    useEffect(() => {
        if (user?.email && userData?.role === 'donor') { // Only fetch if user is a donor
            // Fetch recent donation requests for donor
            axiosSecure.get(`/my-requests?limit=3&page=0`)
                .then(res => {
                    setRecentRequests(res.data.request);
                })
                .catch(err => console.error("Error fetching recent requests:", err));
        }
    }, [user, userData, axiosSecure]);

    if (userLoading || statsLoading) {
        return <div className="p-4">Loading dashboard...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Welcome, {user?.displayName}!</h1>

            {userData?.role === 'donor' && (
                <>
                    {recentRequests.length > 0 ? (
                        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                            <h2 className="text-2xl font-bold mb-4">Your Recent Donation Requests</h2>
                            <div className="overflow-x-auto">
                                <table className="table w-full">
                                    <thead>
                                        <tr>
                                            <th>Recipient Name</th>
                                            <th>Location</th>
                                            <th>Donation Date</th>
                                            <th>Donation Time</th>
                                            <th>Blood Group</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentRequests.map(request => (
                                            <tr key={request._id}>
                                                <td>{request.recipientName}</td>
                                                <td>{request.recipientUpazila}, {request.recipientDistrict}</td>
                                                <td>{request.donationDate}</td>
                                                <td>{request.donationTime}</td>
                                                <td>{request.bloodGroup}</td>
                                                <td>{request.donationStatus}</td>
                                                <td>
                                                    {/* Add edit/delete/view buttons here */}
                                                    <Link to={`/dashboard/my-requests/edit/${request._id}`} className="btn btn-sm btn-info mr-2">Edit</Link>
                                                    <button className="btn btn-sm btn-error mr-2">Delete</button>
                                                    <Link to={`/dashboard/request-details/${request._id}`} className="btn btn-sm btn-success">View</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-center mt-4">
                                <Link to="/dashboard/my-requests" className="btn btn-primary">View My All Requests</Link>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                            <p>You have not made any donation requests yet.</p>
                        </div>
                    )}
                </>
            )}

            {(userData?.role === 'admin' || userData?.role === 'volunteer') && statsData && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold mb-4">{userData.role === 'admin' ? 'Admin Statistics' : 'Volunteer Overview'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                {/* Icon for users */}
                            </div>
                            <div className="stat-title">Total Users</div>
                            <div className="stat-value">{statsData.totalUsers}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                {/* Icon for funding */}
                            </div>
                            <div className="stat-title">Total Funding</div>
                            <div className="stat-value">${statsData.totalFunding.toFixed(2)}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-figure text-info">
                                {/* Icon for requests */}
                            </div>
                            <div className="stat-title">Total Blood Donation Requests</div>
                            <div className="stat-value">{statsData.totalRequests}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainDashboard;