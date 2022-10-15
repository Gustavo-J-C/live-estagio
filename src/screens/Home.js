import React from 'react'
import '../App.css'
import { useState } from 'react'
import io from 'socket.io-client'


const socket = io.connect("https://video-room-app-back.herokuapp.com")

export default function Home(props) {

    const [rooms, setRooms] = useState([])
    const [newRoom, setNewRoom] = useState([])
    const [room, setRoom] = useState("")
    const [showChat, setShowChat] = useState(false)
    const [userName, setUserName] = useState("")

    const enterRoom = (selectRoom) => {
        if (userName !== "" && selectRoom !== "") {
          setRoom((prev) => selectRoom)
          setShowChat(true)
          socket.emit("join_room", selectRoom)
        }
      } 
    
      const createRoom = () => {
        if (newRoom !== "") {
          console.log(socket.emit("create_room", newRoom));
          enterRoom(newRoom)
        }
      }
    return (
        <div className="joinChatContainer">
            <h4>selecione a sala que deseja entrar</h4>
            <input type="text"
                placeholder="username"
                onChange={(e) => setUserName(e.target.value)}/>
            <input type="text"
                placeholder="ROOM ID"
                onChange={(e) => setRoom(e.target.value)}/>
            <button onClick={() => {enterRoom(room); setShowChat(true)}}>entrar na sala</button>
            <input type="text"
                value={newRoom}
                placeholder="ROOM ID"
                onChange={(e) => setNewRoom(e.target.value)}/>
            <button onClick={() => {createRoom(newRoom); setShowChat(true)}}>criar uma sala</button>
            <div>
                <h4>salas ativas</h4>
                {rooms?.map((element) => {
                    return <button onClick={() => enterRoom(element)}>Sala: {element}</button>
                })}
            </div>
        </div>
    )
}