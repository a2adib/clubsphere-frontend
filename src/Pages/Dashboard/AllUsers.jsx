import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';


const AllUsers = () => {

    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosSecure.get('/users')
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                console.error('Error fetching users:', err);
            });
    }, [axiosSecure]);
    
    console.log(users);
    
    
    return (
        <div>
            All Users Page
        </div>
    );
};

export default AllUsers;