import React, {useState, useEffect, useRef} from 'react'
import { useParams } from 'react-router-dom';
import '../App.css'
import { useLive } from '../Context';

export default function Room({socket, userName,setShowChat}) {

    const {room} = useParams();
    const socketId = socket.socketId
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [input, setInput] = useState("");
    const [link, setLink] = useState("");
    const messagesEndRef = useRef(null)

    
    const sendMessage = async () => {
        if (message !== "") {
            const messageData = {
                room,
                user: userName,
                text: message,
                socketId,
                time: new Date(Date.now()).getHours() + 
                ":" +
                new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData)
            setMessageList([...messageList, messageData])
            setMessage("")
            scrollToBottom()
        }
    }

    function getEmbedLink() {
        var res = input.split("=");
        var newLink = "https://www.youtube.com/embed/"+res[1];
        const linkObj = {
            room,
            newLink
        }
        socket.emit("set_video", linkObj)
        return newLink
    }

    const leaveRoom = async () => {
       await socket.emit("leave-room", room)  
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    useEffect(() => {
        socket.on('recieve_message', (data) => {
            setMessageList((list) => [...list, data])
            scrollToBottom()
        })
        socket.on('recieve_video', (data) => {
            setLink(data)
        })
        return () => {socket.off('recieve_message');
            socket.off('recieve_video')}
      }, [socket])

    return (
        <>
        <div className="input-area">
            <input 
            className="link-input"
            placeholder="digite o link do video do youtube"
            type="text"
            onChange={(e) => setInput(e.target.value)}/>
            <button className="link-button" onClick={() => setLink(getEmbedLink)}>pesquisar</button>
            <button className="button-exit"
                onClick={() => {setShowChat(false); leaveRoom(room)}}>SAIR DA SALA</button>
        </div>
        <div socketId="chat-room">
            <div className="video-window">
                {link !== "" ? <iframe 
                    allowFullScreen="allowFullScreen"
                    frameBorder="0" height="400px" 
                    width="100%" 
                    title="video Player" 
                    src={link}/> : null }
            </div>
            <div className="chat-window">
                
                <div className="chat-header"> 
                    <p>Live Chat</p>
                </div>
                <div className="chat-body">
                    {messageList.map((element) => {
                        return (
                            <div socketId={element.socketId === socketId ? 'you' : 'other'} className="message">
                                <div className="message-user">
                                    <p>{element.user}</p>
                                </div>
                                <div className="message-content">
                                    <p>{element.text}</p>
                                </div>
                                <div socketId="message-meta">
                                    <p socketId="time">{element.time}</p>
                                </div>
                            </div> 
                        )
                    })}
                    <div style={{height: '20px'}} ref={messagesEndRef}></div>
                </div>
                <div className="chat-footer">
                    <input value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        type="text" placeholder="digite aqui"
                        onKeyPress={(event) => {event.key === "Enter" && sendMessage()}}
                    />
                    <button onClick={sendMessage}>enviar</button>
                </div>
            </div>
        </div>
        </>
    )

}