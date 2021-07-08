import React from 'react'
import './ChatHeader.css'
import {Avatar} from "@material-ui/core"
function ChatHeader() {
    return (
        <div className="Chatheader">
            <Avatar src=""/>
            <div className="Chatheader_info">
            <h2>room name</h2>
            <p>last message</p>
</div>
        </div>
    )
}

export default ChatHeader
