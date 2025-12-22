import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyRequest = () => {
  const { user } = useContext(AuthContext);
  const [totalRequests, setTotalRequests] = useState(0);
  const [myRequests, setMyRequests] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0); // 0-based for API
  const [filterStatus, setFilterStatus] = useState(""); // New state for filtering

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        status: filterStatus, // Include filter status in API call
      };
      axiosSecure
        .get(`/my-requests`, { params })
        .then((res) => {
          setMyRequests(res.data.request || []);
          setTotalRequests(res.data.totalRequest);
        })
        .catch((err) => {
          console.error("Error fetching my requests:", err);
        });
    }
  }, [axiosSecure, currentPage, itemsPerPage, filterStatus, user]); // Add filterStatus to dependencies

  const numberOfPages = Math.ceil(totalRequests / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()]; // 0-based pages

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numberOfPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(0); // Reset to first page on filter change
  };

  const handleDeleteRequest = async (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        await axiosSecure.delete(`/requests/${id}`);
        toast.success("Request deleted successfully!");
        // Refetch requests after deletion
        const params = {
          page: currentPage,
          limit: itemsPerPage,
          status: filterStatus,
        };
        const res = await axiosSecure.get(`/my-requests`, { params });
        setMyRequests(res.data.request || []);
        setTotalRequests(res.data.totalRequest);
      } catch (err) {
        toast.error("Failed to delete request.");
        console.error("Error deleting request:", err);
      }
    }
  };

  // Function to determine if status change buttons should be visible
  const showStatusChangeButtons = (status) => status === 'inprogress';
  
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/requests/${id}`, { donationStatus: newStatus });
      toast.success(`Request status updated to ${newStatus}!`);
      // Refetch requests after status update
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        status: filterStatus,
      };
      const res = await axiosSecure.get(`/my-requests`, { params });
      setMyRequests(res.data.request || []);
      setTotalRequests(res.data.totalRequest);
    } catch (err) {
      toast.error("Failed to update request status.");
      console.error("Error updating request status:", err);
    }
  };


  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">My Donation Requests</h1>

      <div className="mb-4">
        <label htmlFor="filterStatus" className="mr-2">Filter by Status:</label>
        <select
          id="filterStatus"
          className="select select-bordered"
          value={filterStatus}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        {myRequests.length > 0 ? (
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Recipient Name</th>
                <th>Location</th>
                <th>Donation Date</th>
                <th>Donation Time</th>
                <th>Blood Group</th>
                <th>Status</th>
                <th>Donor Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myRequests.map((request, index) => (
                <tr key={request._id}>
                  <th>{currentPage * itemsPerPage + index + 1}</th>
                  <td>{request.recipientName}</td>
                  <td>{request.recipientUpazila}, {request.recipientDistrict}</td>
                  <td>{request.donationDate}</td>
                  <td>{request.donationTime}</td>
                  <td>{request.bloodGroup}</td>
                  <td>{request.donationStatus}</td>
                  <td>
                    {request.donationStatus === 'inprogress' && request.donorName && request.donorEmail ? (
                      <div>
                        <p>Name: {request.donorName}</p>
                        <p>Email: {request.donorEmail}</p>
                      </div>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>
                    <Link to={`/dashboard/requests/edit/${request._id}`} className="btn btn-xs btn-info mr-2">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteRequest(request._id)}
                      className="btn btn-xs btn-error mr-2"
                    >
                      Delete
                    </button>
                    <Link to={`/dashboard/request-details/${request._id}`} className="btn btn-xs btn-success">
                      View
                    </Link>
                    {showStatusChangeButtons(request.donationStatus) && (
                      <>
                        <button
                          onClick={() => handleStatusChange(request._id, 'done')}
                          className="btn btn-xs btn-outline btn-success ml-2"
                        >
                          Done
                        </button>
                        <button
                          onClick={() => handleStatusChange(request._id, 'canceled')}
                          className="btn btn-xs btn-outline btn-warning ml-2"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No donation requests found.</p>
        )}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        <button onClick={handlePrevPage} className="btn" disabled={currentPage === 0}>
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

        <button onClick={handleNextPage} className="btn" disabled={currentPage === numberOfPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MyRequest;
