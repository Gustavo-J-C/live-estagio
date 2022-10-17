import React, { useEffect } from "react";
import "../App.css";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import Topbar from "../components/TopBar";

export default function Home({ socket }) {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    socket.on("request_rooms", (data) => {
      setRooms(data);
    });
  }, [socket]);

  const enterRoom = (selectRoom) => {
    if (userName !== "" && selectRoom !== "") {
      setRoom((prev) => selectRoom);
      socket.emit("join_room", selectRoom);
      navigate(`room/${selectRoom}`);
    }
  };

  const createRoom = () => {
    if (room !== "" && userName !== "") {
      socket.emit("create_room", room);
      enterRoom(room);
    }
    if (userName === "") {
      alert("favor inserir um nome de usuário")
    }
    if (room === "") {
      alert("Nome de sala não encontrado. Favor inserir nome válido")
    }
  };

  return (
    <>
      <Topbar />
      <div className="container">
        <h4 >
          Selecione a sala que deseja entrar, ou crie uma nova sala
        </h4>
        <div className="container-inputs">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>

        <div className="container-buttons">
          <button onClick={() => enterRoom(room)}>Entrar em uma sala</button>
          <button onClick={() => createRoom(room)}>Criar uma sala</button>
        </div>

        <div>

          {!rooms === []? (<h4>Salas ativas</h4>):null}
          {rooms?.map((element) => {
            return (
              <button key={element} onClick={() => enterRoom(element)}>
                Sala: {element}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
