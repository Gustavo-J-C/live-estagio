import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { io } from 'socket.io-client';
import Chat from './components/Chat';
import { LiveProvider, useLive } from './Context';
import Home from "./screens/Home";
import Room from './screens/Room';

export const Initial = (props) => {
  const api = useLive()
  const socket = io.connect("http://localhost:3001")

  return (
      <BrowserRouter>
        <LiveProvider>
          <Routes>
              <Route >
              <Route index element={<Home socket={socket}/>} />
              <Route path="/room/:room/" element={<Room socket={socket}/>} />
              </Route>
          </Routes>
        </LiveProvider>
      </BrowserRouter>
  );
}

export default Initial