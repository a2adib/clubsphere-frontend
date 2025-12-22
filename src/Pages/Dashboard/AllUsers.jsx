import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);


  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get("/users");
      let filteredUsers = res.data;
      if (filterStatus) {
        filteredUsers = res.data.filter(user => user.status === filterStatus);
      }
      setTotalUsers(filteredUsers.length);
      const paginatedUsers = filteredUsers.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
      setUsers(paginatedUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [axiosSecure, filterStatus, currentPage, itemsPerPage]);

  const handleStatusChange = (email, status) => {
    axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
      .then(() => {
        toast.success(`User status updated to ${status}`);
        fetchUsers();
      })
      .catch((err) => {
        console.error("Error updating user status:", err);
        toast.error("Failed to update user status.");
      });
  };

  const handleRoleChange = (email, role) => {
    axiosSecure.patch(`/users/role?email=${email}&role=${role}`)
      .then(() => {
        toast.success(`User role updated to ${role}`);
        fetchUsers();
      })
      .catch((err) => {
        console.error("Error updating user role:", err);
        toast.error("Failed to update user role.");
      });
  };
  
  const numberOfPages = Math.ceil(totalUsers / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];


  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>
      <div className="mb-4">
        <label htmlFor="filterStatus" className="mr-2">Filter by Status:</label>
        <select
          id="filterStatus"
          className="select select-bordered"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={user.imageUrl} alt={`${user.name} avatar`} />
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className={`badge ${user.status === "active" ? "badge-success" : "badge-warning"}`}>
                    {user.status}
                  </span>
                </td>
                <td className="space-x-2">
                  {user.status === 'active' ? (
                    <button onClick={() => handleStatusChange(user.email, 'blocked')} className="btn btn-warning btn-xs">
                      Block
                    </button>
                  ) : (
                    <button onClick={() => handleStatusChange(user.email, 'active')} className="btn btn-success btn-xs">
                      Unblock
                    </button>
                  )}
                  <button
                    onClick={() => handleRoleChange(user.email, 'volunteer')}
                    className="btn btn-info btn-xs"
                    disabled={user.role === 'volunteer'}
                  >
                    Make Volunteer
                  </button>
                  <button
                    onClick={() => handleRoleChange(user.email, 'admin')}
                    className="btn btn-primary btn-xs"
                    disabled={user.role === 'admin'}
                  >
                    Make Admin
                  </button>
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

export default AllUsers;

