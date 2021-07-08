import React from 'react'
import './SidebarChat.css'
import {Avatar} from "@material-ui/core"
import { useHistory } from 'react-router-dom'
function SidebarChat({imgurl,roomId,roomName,lastMsg}) {
    const location=useHistory();

    return (
        <div onClick={()=>{
location.push(`/Chat/${roomId}`)
        }} className="sideBarChat">
            <Avatar src={`${imgurl}`}/>
            <div className="sideBarChat_info">
            <h2>{roomName}</h2>
            <p>{lastMsg}</p>
</div>
        </div>
    )
}

export default SidebarChat
