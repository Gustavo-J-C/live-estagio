import React, {useState, useEffect, useRef} from 'react'
import { useParams } from 'react-router-dom';
import '../App.css'

export default function Room({socket, userName, room, setShowChat}) {

    const {id} = useParams();
    console.log(id);
    return (
        <div>
            
        </div>
    )

}