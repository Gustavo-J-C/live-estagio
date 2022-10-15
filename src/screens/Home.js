import React, { useEffect } from 'react'
import '../App.css'
import { useState } from 'react'
import io from 'socket.io-client'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useLive } from '../Context'


export default function Home({socket}) {

    const api = useLive()
    const navigate = useNavigate()

    const [rooms, setRooms] = useState([])
    const [newRoom, setNewRoom] = useState([])
    const [room, setRoom] = useState("")
    const [userName, setUserName] = useState("")

    useEffect(() => {
        socket.on('request_rooms', (data) => {
          setRooms(data)
        })
    }, [socket])
    

    const enterRoom = (selectRoom) => {
        if (userName !== "" && selectRoom !== "") {
            setRoom((prev) => selectRoom)
            socket.emit("join_room", selectRoom)
            alert('deu certo')
            navigate(`room/${selectRoom}`)
        }
      } 
    
    const createRoom = () => {
        if (newRoom !== "") {
          console.log(socket.emit("create_room", newRoom));
          enterRoom(newRoom)
        }
    }

    return (
        <div className="container">
            <h4>selecione a sala que deseja entrar</h4>
            <input type="text"
                placeholder="username"
                onChange={(e) => setUserName(e.target.value)}/>
            <input type="text"
                placeholder="ROOM ID"
                onChange={(e) => setRoom(e.target.value)}/>
            <button onClick={() => enterRoom(room)}>entrar na sala</button>
            <input type="text"
                value={newRoom}
                placeholder="ROOM ID"
                onChange={(e) => setNewRoom(e.target.value)}/>
            <button onClick={() => createRoom(newRoom)}>criar uma sala</button>
            <div>
                <h4>salas ativas</h4>
                {rooms?.map((element) => {
                    return <button key={element} onClick={() => enterRoom(element)}>Sala: {element}</button>
                })}
            </div>
        </div>
    )
}