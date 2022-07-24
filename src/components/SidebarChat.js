import React, {useState, useEffect} from 'react';
import './SidebarChat.css';
import {Avatar, Icon, IconButton} from "@mui/material/";
import database from "../firebase";
import {Link} from "react-router-dom";
function SidebarChat({id, name, addNewChat}) {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState([]);
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
    },[]);

    useEffect(() => {
        if (id) {
            database.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot) => setMessages (snapshot.docs.map((doc) => doc.data())));
        }
    }, [id]);

    const createChat = () => {
        const roomName = prompt("Enter the name for the Chatroom.");
        if (roomName) {
            //create room
            database.collection('rooms').add({
                name: roomName,
            })
        }

    };
  return !addNewChat ? (
        <Link to = {`/rooms/${id}`}>
             <div className="SidebarChat">
        <IconButton>
            <Avatar sx={{color:"lightgray"}} src={`https://www.placemonkeys.com/500?random=${seed}.svg`}/>
        </IconButton>
        <div className="SidebarInfo">   
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
        </div>
    </div>
        </Link>
        
  ) : (
    <div onClick = {createChat} className = "SidebarChat">
        <h2> Add New Chatroom</h2>
    </div>
  )
}

export default SidebarChat