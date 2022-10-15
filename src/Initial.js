import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Chat from './components/Chat';
import Home from "./screens/Home";
import Room from './screens/Room';

export const Initial = (props) => {

    
    console.log(props);
    return (
        <BrowserRouter>
        <Routes>
            <Route >
            <Route index element={<Home />} />
            <Route path="/room/:id/" element={<Room />} />
            </Route>
        </Routes>
        </BrowserRouter>
    );
}

export default Initial