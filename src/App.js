import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { io } from 'socket.io-client';
import { LiveProvider, useLive } from './Context';
import Home from "./screens/Home";
import Room from './screens/Room';
import Sobre from './screens/Sobre';
import Topbar from './components/TopBar';

export const App = (props) => {
  const api = useLive()
  const socket = io.connect("http://localhost:3001")

  return (
      <BrowserRouter>
      <Topbar/>
        <LiveProvider>
          <Routes>
              <Route >
              <Route index element={<Home socket={socket}/>} />
              <Route path="/room/:room/" element={<Room socket={socket}/>} />
              <Route path="/sobre" element={<Sobre/>} />
              </Route>
          </Routes>
        </LiveProvider>
      </BrowserRouter>
  );
}

export default App