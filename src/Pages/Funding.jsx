import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Funding = () => {
    const [payments, setPayments] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/payments')
            .then(res => setPayments(res.data))
            .catch(err => console.error("Error fetching payments:", err));
    }, [axiosSecure]);

    return (
        <div className="container mx-auto my-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Funding</h1>
                <Link to="/donate" className="btn btn-primary">Give Fund</Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Donor Name</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment._id}>
                                <td>{payment.donorName}</td>
                                <td>${payment.amount.toFixed(2)}</td>
                                <td>{new Date(payment.paidAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Funding;
