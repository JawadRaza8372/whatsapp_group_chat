import React from 'react'
import Sidebar from '../Sidebar'
import ChatComponents from '../ChatComponents'
import { Redirect, useParams } from 'react-router-dom'

function ChatScreenRender({messages,userData,getUserData,myroomData}) {
    const responseGoogleLogout = () => {
        getUserData(null)
      }
      const {chat_id}=useParams();      
    return (<>
        {(userData)?<>
        <div className="app">
         <div className="app_body">
    <Sidebar userData={userData} myroomData={myroomData} logoutfun={responseGoogleLogout}/>
    {
        (chat_id !== 'null')?<ChatComponents thisroomId={chat_id} data={messages} userData={userData} allroomdata={myroomData}/>:null

    }
    

    </div>    
     </div></>:<Redirect push to="/"/>
    }
    </>)
}

export default ChatScreenRender
