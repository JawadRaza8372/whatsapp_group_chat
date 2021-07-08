import React from 'react'
import {Route,Switch} from "react-router-dom";
import LoginPage from '../Components/Screens/LoginPage';
import ChatScreenRender from '../Components/Screens/ChatScreenRender';

function Routes({messages,userData,getUserData,myroomData}) {
    return (
        <Switch>
        <Route exact={true} path="/"  render={() => (<LoginPage getUserData={getUserData} userData={userData}/> )} />
        <Route exact={true} path="/Chat/:chat_id" render={() => ( <ChatScreenRender messages={messages} userData={userData} getUserData={getUserData} myroomData={myroomData}/> )}/>
        <Route component={""}/>
                 </Switch>
    )
}

export default Routes
