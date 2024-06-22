import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const navigate = useNavigate();
    const {currentAdmin} = useSelector((state) => {
        return state.admin
    })
    useEffect(() => {
        if (currentAdmin == null) {
            navigate("/login")
        }
    })
  return (
    <div>Dashboard</div>
  )
}
