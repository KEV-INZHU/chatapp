import React, { useEffect, useState } from 'react'
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import {Avatar} from "@mui/material/";
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Icon, IconButton } from '@mui/material';
import database from  '../firebase';
import {useStateValue} from '../StateProvider';
function Sidebar() 
{
  const [rooms, setRooms] = useState([]);
  const [{user}, dispatch] = useStateValue();
  useEffect(() => {
    const unsub = database.collection("rooms").onSnapshot((snapshot) => setRooms(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
    )
  );
  return () =>
  unsub();
}, [])
  return (
    <div className='sidebar'>
      <div className='sidebarHeader'>
        <IconButton>
        <Avatar src ={user?.photoURL}/>
        </IconButton>

        <div className='sidebarRight'>
          <IconButton>
          <ChatBubbleRoundedIcon sx={{ color: 'lightgray'}}/>
          </IconButton>

          <IconButton>
            <AddCircleIcon sx={{color:'lightgray'}}/>
          </IconButton>

          <IconButton>
            <MoreVertRoundedIcon sx={{ color: 'lightgray'}}/>
          </IconButton>

          {/* <IconButton>
            <SettingsRoundedIcon/>
          </IconButton> */}

        </div>
      </div>
      <div className='sidebarSearch'>
        <div className='sidebarSearchContainer'>
          <IconButton>
        <SearchRoundedIcon sx={{color:'lightgray'}}/>
        </IconButton>
        <input placeholder="Search or create a new chat" type="text"/>
        </div>
      </div>
      <div className='sidebarChat'>
         <SidebarChat addNewChat/>
         {rooms.map(room => (
          <SidebarChat key ={room.id} id = {room.id}
          name = {room.data.name} />
         ))}
      </div>
        </div>
  )
}

export default Sidebar