import mongoose from "mongoose"
const whatsapp_room_schema=new mongoose.Schema({
    roomName:String,
    imglink:String
});
const dbrooms=new mongoose.model("rooms",whatsapp_room_schema);
export default dbrooms;