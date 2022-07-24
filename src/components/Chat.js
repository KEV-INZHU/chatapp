import './Chat.css'
import {React, useEffect, useState} from 'react'
import { Avatar, Icon, IconButton } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import {useParams} from "react-router-dom";
import database from '../firebase';
import firebase from 'firebase/compat/app';
import {useStateValue} from '../StateProvider';

function Chat() {
    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();
    const sendMessage = (e)=>{
        e.preventDefault();
        console.log('You typed ',  input);
        setInput('');
        database.collection('rooms').doc(roomId).collection('messages').add({
            img: user.photoURL,
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
    };

    useEffect(() => {
        if (roomId) {
           database.collection('rooms').doc(roomId).onSnapshot(snapshot => (setRoomName(snapshot.data().name)
           ))
           database.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data()))
           );
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, []);

  return (
    <div className = 'Chat'>
        <div className = 'ChatHeader'>
            <Avatar sx= {{color: 'lightgray'}}/>
            <div className = 'ChatHeaderInfo'>
                <h3>{roomName}</h3>
                <p>Last active at{" "} {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()} </p>
            </div>
            <div className = 'ChatHeaderInfoRight'>
                <IconButton>
                    <SearchRoundedIcon sx={{color:'lightgray'}}/>
                </IconButton>

                <IconButton>
                    <AttachFileRoundedIcon sx={{color:'lightgray'}}/>
                </IconButton>

                <IconButton>
                    <MoreVertRoundedIcon sx={{color:'lightgray'}}/>
                </IconButton>
            </div>
        </div>

        <div className = 'ChatBody'>
            {messages.map((message) => (
            <div className = 'ChatMessage'>
                <Avatar src = {message.img}/>
                <div className = 'ChatMessageInfo'>
                   <h3>{message.name}</h3>
                   <p> {message.message}</p>
                </div>
                <div className = 'ChatTimestamp'>
                    {new Date(message.timestamp?.toDate()).toUTCString()}
                </div>
            </div>
            ))}
        </div>

        <div className = 'ChatFooter'>
            <IconButton>
            <EmojiEmotionsRoundedIcon sx={{color:'lightgray'}}/>
            </IconButton>
            <form>
                <input value = {input} onChange = {(e) => setInput(e.target.value)}placeholder="Type a message" type = "text"/>
                <button onClick={sendMessage}
                type='submit'>Send Message</button>
            </form>
            <IconButton>
            <MicRoundedIcon sx={{color:'lightgray'}}/>
            </IconButton>
        </div>
    </div>
  )
}

export default Chat