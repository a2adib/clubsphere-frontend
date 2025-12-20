import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';


const AllUsers = () => {

    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const {user} = useContext(AuthContext); 

    useEffect(() => {
        if(!user)return;           
        axiosSecure.get('/users')
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                console.error('Error fetching users:', err);
            });
    }, [axiosSecure, user]);
    
    console.log(users);
    
    
    return (
        <div>
            All Users Page
        </div>
    );
};

export default AllUsers;