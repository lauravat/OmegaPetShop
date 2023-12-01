import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

function Logout () {
  const { Logout, User } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    console.log('Cerrando session')
    Logout()
    navigate('/')
  }, [User])

  return (
    <div>Logout</div>
  )
}

export default Logout
