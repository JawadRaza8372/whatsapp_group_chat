import express from "express";
import messageSchema from "./dbMessages.mjs";
const Router=express();

Router.get("/messages/sync",(req,res,next)=>{
    messageSchema.find((err,data)=>{
        if (err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
});

Router.post("/messages/new",(req,res,next)=>{
    const dbmessage=req.body;
    console.log(req.body)
    messageSchema.create(dbmessage,(err,data)=>{
        if (err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
   
})
export default Router;