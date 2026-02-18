import React, { useContext } from 'react'
import { AuthKontext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'


const PrivateRouter = () => {

  const {currentUser} = useContext(AuthKontext)

  return (
    <div>
      {currentUser ? <Outlet/> : <Navigate to={"/login"}/>}
    </div>
  )
}

export default PrivateRouter