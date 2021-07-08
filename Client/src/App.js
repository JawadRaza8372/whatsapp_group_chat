import './App.css';
import {useEffect,useState} from "react"
import Pusher from "pusher-js"
import axios from "axios"
import {fetchmessage,fetchroom} from "./Apis/Api"
import Routes from './Navigation/Routes';
function App() {
const [messages, setmessages] = useState([])
const [myroomData, setmyroomData] = useState([])
const [userData, setuserData] = useState(null)
const [fetchroomd, setfetchroomd] = useState(false)


const getUserData=(data)=>{
  setuserData(data);
}

  useEffect(() => {
    var pusher = new Pusher('7efb4ec01e91425deb2f', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('masseges');
    channel.bind('inserted', function(data) {
      setmessages([...messages,data])
    });
    var channel1 = pusher.subscribe('rooms');
    channel1.bind('inserted', function(da) {
      setmyroomData([...myroomData,da])
      setfetchroomd(true)
    });
    return()=>{
channel.unbind_all();
channel.unsubscribe();
channel1.unbind_all();
channel1.unsubscribe();
    }
  }, [messages])
  const fetchdata=async()=>{
    await axios.get(`${fetchmessage}`).then((resp)=>setmessages(resp.data)).catch(e=>console.log('error'))
  }
  const fetchroomData=async()=>{
    await axios.get(`${fetchroom}`).then((resp)=>setmyroomData(resp.data)).catch(e=>console.log('error'))
  }
  useEffect(() => {
    fetchroomData()
fetchdata()
  }, []);
  useEffect(() => {
    fetchroomData()
  }, [fetchroomd]);
  return (<>
  <Routes messages={messages} userData={userData} getUserData={getUserData} myroomData={myroomData}/>
    
    
  </>);
}

export default App;
