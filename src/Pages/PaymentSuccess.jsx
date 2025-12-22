import { useSearchParams } from 'react-router';
import useAxios from '../hooks/useAxios';
import { useEffect } from 'react';

const PaymentSuccess = () => {
    
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');

    const axiosInstance = useAxios();

    useEffect(()=>{
        axiosInstance.post(`/success-payment?session_id=${sessionId}`)
        .then(res=>{
            console.log(res.data)
        })
    },[axiosInstance, sessionId]
    )
   
    return (
        <div>
            PaymentSuccess
        </div>
    );
};

export default PaymentSuccess;