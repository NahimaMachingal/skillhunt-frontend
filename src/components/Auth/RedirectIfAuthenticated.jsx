import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const RedirectIfAuthenticated = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const usertype = useSelector((state)=> state.auth.usertype);
    
    if (isAuthenticated) {
        if (usertype === 'admin') {
            return <Navigate to="/admin/home" />
        }
        else if (usertype === 'jobseeker') {
            return <Navigate to="/home" />
        }
        else if (usertype === 'employee') {
            return <Navigate to="/ehome" />
        }
    }
  return children
}

export default RedirectIfAuthenticated;