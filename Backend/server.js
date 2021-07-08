import express from "express"
import mongoose from "mongoose"
import {} from 'dotenv/config'
import dbmessageRoutes from "./dbmessageRoutes.mjs";
import dbroomsRoutes from "./dbroomsRoutes.mjs";
import Pusher from "pusher"
import cors from "cors"
const app=express();

const port=process.env.PORT || 5000;
app.use(cors());
app.use(express.json())
app.use(dbmessageRoutes)
app.use(dbroomsRoutes)
const pusher = new Pusher({
    appId: "1223411",
    key: "7efb4ec01e91425deb2f",
    secret: "81f7b57bbfac22d56f16",
    cluster: "ap2",
    useTLS: true
  });
const url =`${process.env.mongourl}`;
mongoose.connect(url,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("mongodb connection is successfull");
    const msgCollection=connection.collection("messsagescontents")
    const roomCollection=connection.collection("rooms")
    const changeStream2=roomCollection.watch();

const changeStream=msgCollection.watch();
changeStream.on('change',(change)=>{
if(change.operationType === 'insert'){
    const messageDetails=change.fullDocument;
    pusher.trigger("masseges", "inserted", {
        name:messageDetails.name,
        message:messageDetails.message,
        sendtime:messageDetails.sendtime,
        senddate:messageDetails.senddate,
        roomId:messageDetails.roomId
      });
}
else{
    console.log("error trigering pusher")
}
})
changeStream2.on('change',(change)=>{
    if(change.operationType === 'insert'){
        const roomDetails=change.fullDocument;
        pusher.trigger("rooms", "inserted", {
            roomName:roomDetails.roomName,
            imglink:roomDetails.roomName
          });
    }
    else{
        console.log("error trigering pusher")
    }
    })
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})