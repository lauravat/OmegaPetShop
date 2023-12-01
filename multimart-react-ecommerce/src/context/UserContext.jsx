import React, { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [User, setUser] = useState(JSON.parse(localStorage.getItem('User')) || {})

  console.log(User)

  const addUser = (data) => {
    setUser(data)
    console.log(data)
    localStorage.setItem('User', JSON.stringify(data))
  }
  const Logout = () => {
    setUser(null)
    localStorage.removeItem('User')
  }

  return (
    <UserContext.Provider value={{ User, addUser, Logout }}>
      {children}
    </UserContext.Provider>
  )
}
