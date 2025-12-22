import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const BloodDonationRequests = () => {
    const [requests, setRequests] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        // Fetch all blood donation requests that are in 'pending' status
        axiosSecure.get('/all-requests') // Assuming you have an API endpoint to get all requests
            .then(res => {
                const pendingRequests = res.data.filter(request => request.donationStatus === 'pending');
                setRequests(pendingRequests);
            })
            .catch(err => console.error("Error fetching blood donation requests:", err));
    }, [axiosSecure]);

    return (
        <div className="container mx-auto my-8">
            <h1 className="text-3xl font-bold text-center mb-8">Pending Blood Donation Requests</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {requests.map(request => (
                    <div key={request._id} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Recipient: {request.recipientName}</h2>
                            <p>Location: {request.recipientUpazila}, {request.recipientDistrict}</p>
                            <p>Blood Group: {request.bloodGroup}</p>
                            <p>Date: {request.donationDate}</p>
                            <p>Time: {request.donationTime}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/request/${request._id}`} className="btn btn-primary">View Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BloodDonationRequests;
