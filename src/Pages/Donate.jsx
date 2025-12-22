import React, { useContext } from 'react';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../Provider/AuthProvider';

const Donate = () => {
    const { user } = useContext(AuthContext)
    const axiosInstance = useAxios();  

    const handleDonate = (e) => {
        e.preventDefault();
        const donateAmount = e.target.donateAmount.value;
        const donorEmail = user?.email;
        const donorName = user?.displayName;

        const formData = {
            donateAmount,
            donorEmail,
            donorName
        };
        
        
        axiosInstance.post('/create-payment-checkout', formData)
        .then(res=>{
            console.log(res.data); 
            window.location.href = res.data.url;
        })
        .catch(err=>{
            console.error("Error creating payment checkout:", err);
        })
    }
    return (
        <div>
            <form onSubmit={handleDonate} className='flex justify-center items-center mt-20'>
                <input name='donateAmount' type="text" placeholder='Type here'className='input'/>
                <button className='btn btn-primary ml-2'>Donate</button>
            </form>
        </div>
    );
};

export default Donate;