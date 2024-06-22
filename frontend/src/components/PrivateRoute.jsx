import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { Outlet } from "react-router-dom"

export default function PrivateRoute() {
    const {currentAdmin} = useSelector((state) => {
        return state.admin
    })
    
    return (
        currentAdmin? (<Outlet></Outlet>) : <Navigate to={"/login"} />
  )
}

