import  { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { PropagateLoader } from 'react-spinners';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
  const {user, loading } = useContext(AuthContext);
  const location = useLocation();
  if(loading){
    return <PropagateLoader color="#36d7b7" />
  }
  if(user){
return children;
  }
  return  <Navigate to ='/login' state={{from:location}} replace  ></Navigate>
};

export default PrivateRoutes;