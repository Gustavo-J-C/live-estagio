import { useState, useContext, createContext } from 'react'
import { Navigate } from 'react-router-dom'
import { io } from 'socket.io-client'

const LiveContext = createContext(null)

export const LiveProvider = ({children}) => {
    
    const [socket, setSocket] = useState(null)
    // const socket = io.connect("http://localhost:3001")

    return (
        <LiveContext.Provider value={{socket, setSocket}}>
            {children}
        </LiveContext.Provider>
    )
}

export const useLive = () => {
    return useContext(LiveProvider)
}