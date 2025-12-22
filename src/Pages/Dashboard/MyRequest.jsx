import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyRequest = () => {
  const [totalRequests, setTotalRequests] = useState(0);
  const [myRequests, setMyRequests] = useState([]);
  const [itemsPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/my-requests?page=${currentPage - 1}&limit=${itemsPerPage}`)
      .then((res) => {
        setMyRequests(res.data.request || []);
        setTotalRequests(res.data.totalRequest);
      })
      .catch((err) => {
        console.error("Error fetching my requests:", err);
      });
  }, [axiosSecure, currentPage, itemsPerPage]);

  const numberofPages = Math.ceil(totalRequests / 10);

  const pages = [...Array(numberofPages).keys()].map((e) => e + 1);
  console.log(pages);
  console.log("Rendering with myRequests:", myRequests);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextPage = () => {
    if (currentPage < numberofPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Hospital Name</th>
              <th>blood group</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {myRequests.map((request, index) => (
              <tr key={request._id} >
                <th>{(currentPage*10)+(index+1)-10}</th>
                <td>{request.recipientName}</td>
                <td>{request.hospitalName}</td>
                <td>{request.bloodGroup}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button 
        onClick={handlePrevPage}
        className="btn">Prev</button>

        {pages.map((page) => (
          <button
            key={page}
            className={`btn ${currentPage === page ? "btn-active" : ""}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button
        onClick={handleNextPage} 
        className="btn">Next</button>
      </div>
    </div>
  );
};

export default MyRequest;
