import React, { useState } from "react";
import "./Chat.css";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { IconButton, Avatar } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonOutlinedIcon from "@material-ui/icons/InsertEmoticonOutlined";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import MicOutlinedIcon from "@material-ui/icons/MicOutlined";
import axios from "axios";
import { postmessage } from "../Apis/Api";
import ScrollToBottom from "react-scroll-to-bottom";
function ChatComponents({ thisroomId, data, userData, allroomdata }) {
  const [inputval, setinputv] = useState("");
  const submitfun = async (e) => {
    e.preventDefault();
    await axios.post(`${postmessage}`, {
      sendtime: new Date().toLocaleTimeString(),
      message: inputval,
      name: `${userData.email}`,
      senddate: new Date().toDateString(),
      roomId: thisroomId,
    });
    setinputv("");
  };
  return (
    <div className="chat">
      <div className="chat_header">
        {allroomdata &&
          allroomdata.map((dat) => {
            if (dat._id === `${thisroomId}`) {
              return (
                <>
                  <Avatar src={dat.imglink} />
                  <div className="chat_headerinfo">
                    <h3>{dat.roomName}</h3>
                    <p>{new Date().toDateString()}</p>
                  </div>
                </>
              );
            }
          })}

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileOutlinedIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <ScrollToBottom className="chat_body">
        <br />
        {data.map((dat) => {
          if (dat.roomId === `${thisroomId}`) {
            if (dat.name === `${userData.email}`) {
              return (
                <p className="chat_message  chat_reciver">
                  <span className="chat_name">{dat.name}</span>
                  {dat.message}
                  <span className="chat_time">{dat.sendtime}</span>
                </p>
              );
            } else {
              return (
                <p className="chat_message">
                  <span className="chat_name">{dat.name}</span>
                  {dat.message}
                  <span className="chat_time">{dat.sendtime}</span>
                </p>
              );
            }
          } else {
            return null;
          }
        })}
      </ScrollToBottom>
      <div className="chat_footer">
        <InsertEmoticonOutlinedIcon />
        <form onSubmit={submitfun}>
          <input
            value={inputval}
            onChange={(e) => setinputv(e.target.value)}
            type="text"
            placeholder="Your Message"
          />
          <button type="submit">send</button>
        </form>
        <MicOutlinedIcon />
      </div>
    </div>
  );
}

export default ChatComponents;
