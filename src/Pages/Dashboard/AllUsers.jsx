import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);


  const fatchUsers = async () => {
    await axiosSecure.get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
}


  useEffect(() => {
    fatchUsers();
  }, [axiosSecure]);

  console.log(users);

  const handleStatusChange = (email, status) => {
    axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
        .then((res) => {
            console.log(res.data);
            fatchUsers();
        })
        .catch((err) => {
            console.error("Error updating user status:", err);
        });
  }
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Image</th>
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
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={user.imageUrl}
                        alt={`${user.name} avatar`}
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <span
                  className={`badge ${
                    user.status === "active"
                      ? "badge-success"
                      : "badge-warning"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <th className="space-x-2">
                {
                    user.status == 'active' ? <button onClick={()=>handleStatusChange(user?.email, 'blocked')} className="btn btn-warning btn-xs">Block</button> : <button onClick={()=>handleStatusChange(user?.email, 'active')} className="btn btn-success btn-xs">Unblock</button>
                }
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
