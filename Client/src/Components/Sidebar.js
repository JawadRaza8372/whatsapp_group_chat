import React,{useState,useEffect} from 'react'
import './Sidebar.css'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import {IconButton,Avatar} from "@material-ui/core"
import SidebarChat from './SidebarChat';
import {newroom} from "../Apis/Api"
import axios from "axios"
import { GoogleLogout } from 'react-google-login';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
function Sidebar({userData,myroomData,logoutfun}) {
    const [creatroom, setcreatroom] = useState('')
    let createroom=async ()=>{
       const myroomname=prompt("please enter room name");
       if(myroomname){
        let seed=Math.floor(Math.random()*5000)
        await axios.post(`${newroom}`,{
            roomName:myroomname,
            imglink:`http://avatars.dicebear.com/api/human/${seed}.svg`
        })
    }
       else{
           console.log("nothing")
       }
    }

    return (
        <div className="sidebar">
        <div className="sidebar_header">
<Avatar src={`${userData.imageUrl}`}/>
        <div className="sidebar_headerRight">
        <IconButton onClick={createroom}>
        <ChatIcon/>
        </IconButton>
        <IconButton>
        <DonutLargeIcon/>
        </IconButton>
        <GoogleLogout
      clientId="1043279253086-book5qsi8qpq7pg61iegifordtnjkiee.apps.googleusercontent.com"
      render={renderProps => (
        <IconButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
        <ExitToAppIcon/>
        </IconButton>
    )}
      buttonText="Logout"
      onLogoutSuccess={()=>{logoutfun()}}
    />
        </div>
       

        </div>
        <div className="sidebar_search">
            <div className="sidebar_searchcontainer">
<SearchOutlinedIcon/>
<input type="text" placeholder="Search or Start a new chat"/>
            </div>
        </div>
        <div className="sidebar_chat">
        {myroomData && myroomData.map((data)=>(<SidebarChat key={data._id} imgurl={data.imglink} roomId={data._id} roomName={data.roomName} lastMsg="naa maloom"/>))
        }
            
        </div>
        </div>
    )
}

export default Sidebar
