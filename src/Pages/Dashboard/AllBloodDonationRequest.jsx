import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const AllBloodDonationRequest = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [filterStatus, setFilterStatus] = useState("");
    const axiosSecure = useAxiosSecure();
    const [userData, setUserData] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRequests, setTotalRequests] = useState(0);

    const fetchRequests = async () => {
        try {
            const res = await axiosSecure.get("/all-requests");
            let filteredRequests = res.data;
            if (filterStatus) {
                filteredRequests = res.data.filter(request => request.donationStatus === filterStatus);
            }
            setTotalRequests(filteredRequests.length);
            const paginatedRequests = filteredRequests.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            setRequests(paginatedRequests);
        } catch (err) {
            console.error("Error fetching requests:", err);
        }
    };
    
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/role/${user.email}`)
                .then(res => {
                    setUserData(res.data);
                })
                .catch(err => console.error("Error fetching user role:", err));
        }
    }, [user, axiosSecure]);

    useEffect(() => {
        fetchRequests();
    }, [filterStatus, currentPage, itemsPerPage]);
    
    const handleStatusChange = async (id, newStatus) => {
        try {
          await axiosSecure.patch(`/requests/${id}`, { donationStatus: newStatus });
          toast.success(`Request status updated to ${newStatus}!`);
          fetchRequests();
        } catch (err) {
          toast.error("Failed to update request status.");
          console.error("Error updating request status:", err);
        }
      };
    
      const handleDeleteRequest = async (id) => {
        if (window.confirm("Are you sure you want to delete this request?")) {
          try {
            await axiosSecure.delete(`/requests/${id}`);
            toast.success("Request deleted successfully!");
            fetchRequests();
          } catch (err) {
            toast.error("Failed to delete request.");
            console.error("Error deleting request:", err);
          }
        }
      };

    const numberOfPages = Math.ceil(totalRequests / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];


    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">All Blood Donation Requests</h1>
            
            <div className="mb-4">
                <label htmlFor="filterStatus" className="mr-2">Filter by Status:</label>
                <select
                    id="filterStatus"
                    className="select select-bordered"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Recipient Name</th>
                            <th>Location</th>
                            <th>Donation Date</th>
                            <th>Donation Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr key={request._id}>
                                <td>{request.recipientName}</td>
                                <td>{request.recipientUpazila}, {request.recipientDistrict}</td>
                                <td>{request.donationDate}</td>
                                <td>{request.donationTime}</td>
                                <td>{request.donationStatus}</td>
                                <td>
                                    {userData?.role === 'admin' ? (
                                        <>
                                            <Link to={`/dashboard/requests/edit/${request._id}`} className="btn btn-xs btn-info mr-2">
                                                Edit
                                            </Link>
                                            <button onClick={() => handleDeleteRequest(request._id)} className="btn btn-xs btn-error mr-2">
                                                Delete
                                            </button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleStatusChange(request._id, 'inprogress')} className="btn btn-xs btn-primary">
                                            Donate
                                        </button>
                                    )}
                                    <Link to={`/request-details/${request._id}`} className="btn btn-xs btn-success">
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
                <button onClick={() => setCurrentPage(currentPage - 1)} className="btn" disabled={currentPage === 0}>
                Prev
                </button>

                {pages.map((page) => (
                <button
                    key={page}
                    className={`btn ${currentPage === page ? "btn-active" : ""}`}
                    onClick={() => setCurrentPage(page)}
                >
                    {page + 1}
                </button>
                ))}

                <button onClick={() => setCurrentPage(currentPage + 1)} className="btn" disabled={currentPage === numberOfPages - 1}>
                Next
                </button>
            </div>
        </div>
    );
};

export default AllBloodDonationRequest;
