import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, userStatus, loading, roleLoading } =useContext(AuthContext);  
    


    if(loading || roleLoading){
        return <div>Loading...</div>;
    }

    if(!user || !userStatus=='active'){
        return <Navigate to={'/login'}></Navigate>
    }

    return children;
};

export default PrivateRoute;