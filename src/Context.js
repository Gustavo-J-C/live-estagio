import { useState, useContext, createContext } from 'react'
import { Navigate } from 'react-router-dom'

const AuthContext = createContext(null)

export const RoomContext = ({children}) => {
    
    return (
        <AuthContext.Provider value={{user, data, login, logout, client, setClient, checkUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}