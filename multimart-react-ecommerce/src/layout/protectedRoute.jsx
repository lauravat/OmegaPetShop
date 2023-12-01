import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function ProtectedRoute ({ redirectPath = '/' }) {
  const { User } = useContext(UserContext)
  if (!User || User.role !== 'Tienda') {
    return <Navigate to={redirectPath} replace />
  }
  return <Outlet />
}

export default ProtectedRoute
