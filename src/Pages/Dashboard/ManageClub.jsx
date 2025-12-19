import React, { useContext, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../Provider/AuthProvider";

const ManageClub = () => {

    const [clubs, setClubs] = React.useState([]);
    const axiosInstance = useAxios();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        axiosInstance.get(`/manager/clubs/${user?.email}`)
        .then(res => {        
            setClubs(res.data);            
        })
        .catch(err => {
            console.error("Error fetching clubs:", err);
        });
    }, [user, axiosInstance]);

    

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Club Info</th>
            <th>Category</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clubs.map((club) => (
            <tr key={club._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={club.bannerImage}
                        alt={`${club.clubName} banner`}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{club.clubName}</div>
                  </div>
                </div>
              </td>
              <td>{club.category}</td>
              <td>{club.location}</td>
              <td>
                <span className={`badge ${
                  club.status === 'approved' ? 'badge-success' :
                  club.status === 'denied' ? 'badge-error' :
                  'badge-warning'
                }`}>
                  {club.status}
                </span>
              </td>
              <th className="space-x-2">
                <button className="btn btn-info btn-xs">Edit</button>
                <button className="btn btn-error btn-xs">Delete</button>
              </th>
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
  );
};

export default ManageClub;
