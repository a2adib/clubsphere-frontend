import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';

const RequestDetails = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axiosSecure.get(`/all-requests`) // This should be a specific request endpoint ideally
            .then(res => {
                const specificRequest = res.data.find(req => req._id === id);
                setRequest(specificRequest);
            })
            .catch(err => console.error("Error fetching request details:", err));
    }, [id, axiosSecure]);

    const handleDonateConfirm = async () => {
        try {
            const donationData = {
                donorName: user.displayName,
                donorEmail: user.email,
                donationStatus: 'inprogress',
            };
            await axiosSecure.patch(`/requests/${id}`, donationData);
            toast.success('Donation confirmed! The status is now in-progress.');
            setIsModalOpen(false);
            // Refetch request to update UI
            const res = await axiosSecure.get(`/all-requests`);
            const specificRequest = res.data.find(req => req._id === id);
            setRequest(specificRequest);
        } catch (err) {
            toast.error('Failed to confirm donation.');
            console.error(err);
        }
    };
    

    if (!request) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto my-8 p-4">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-3xl mb-4">Donation Request Details</h2>
                    <p><strong>Recipient Name:</strong> {request.recipientName}</p>
                    <p><strong>Location:</strong> {request.recipientUpazila}, {request.recipientDistrict}</p>
                    <p><strong>Hospital:</strong> {request.hospitalName}</p>
                    <p><strong>Full Address:</strong> {request.fullAddress}</p>
                    <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
                    <p><strong>Date:</strong> {request.donationDate}</p>
                    <p><strong>Time:</strong> {request.donationTime}</p>
                    <p><strong>Status:</strong> {request.donationStatus}</p>
                    <p><strong>Request Message:</strong> {request.requestMessage}</p>
                    <div className="card-actions justify-end mt-4">
                        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Donate</button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirm Donation</h3>
                        <p className="py-4">You are about to confirm your donation for this request. Your name and email will be shared with the requester.</p>
                        <div className="form-control">
                            <label className="label">Donor Name (Read-only)</label>
                            <input type="text" value={user.displayName} readOnly className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">Donor Email (Read-only)</label>
                            <input type="text" value={user.email} readOnly className="input input-bordered" />
                        </div>
                        <div className="modal-action">
                            <button onClick={handleDonateConfirm} className="btn btn-success">Confirm</button>
                            <button onClick={() => setIsModalOpen(false)} className="btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestDetails;
