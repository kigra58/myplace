import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../rtk/store';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../constant';

interface Props {
    component: React.ComponentType;
}
const ProtectedRoutes:React.FC<Props> = ({component:RouteComponent}) => {
  const authData=useSelector((state:RootState)=>state.auth.authData);
  
if (authData.token) return <RouteComponent />;
return <Navigate to={ROUTES.HOME} />;
}

export default ProtectedRoutes