import mongoose from "mongoose"
const whatsapp_schema=new mongoose.Schema({
    name:String,
    message:String,
    sendtime:String,
    senddate:String,
    roomId:String
});
const dbMessages=new mongoose.model("messsagescontents",whatsapp_schema);
export default dbMessages;