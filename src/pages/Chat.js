import React from 'react'
import {auth} from '../firebase'
import ChatBubble from 'react-chat-bubble';
import TextField from '@mui/material/TextField';
import '../components/CSS/style.css';

import { useSelector } from 'react-redux'
import { selectUserdata } from '../feature/navSlice'
import { doc, getDoc,updateDoc } from "firebase/firestore";
import {db} from '../firebase'

const Chat = () => {
  const userValue = useSelector(selectUserdata)
  const [newMsg, setNewMsg] = React.useState('')
  const [time, setTime] = React.useState(Date.now());
  const [msgArray,setMsgArray]=React.useState(
    []
  )


  const dataGatherer=async ()=>{
    const docRef = doc(db, "userInfo", userValue.email);
    const docSnap = await getDoc(docRef);
    let data=docSnap.data()


    const docRef2=doc(db,"chat",data.chat);
    const docSnap2=await getDoc(docRef2);
    let data2=docSnap2.data()

    let filteredData=[]
    for(let i=0;i<data2.comment.length;i++){
      filteredData.push({
        "type" : data2.comment[i].email===userValue.email?1:0,
        "image": data2.comment[i].email===data2.email1?data2.photo2:data2.photo1,
        "text": data2.comment[i].text,
      })
    }
    setMsgArray(filteredData)

  }
  
  React.useEffect(() => {
    const interval = setInterval(() =>dataGatherer() , 1000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    dataGatherer()
  }, [0]);

 
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {

      const docRef = doc(db, "userInfo", userValue.email);
      const docSnap = await getDoc(docRef);
      let data1=docSnap.data()
  
  
      const docRef2=doc(db,"chat",data1.chat);
      const docSnap2=await getDoc(docRef2);
      let data2=docSnap2.data()

      
      let tempData={
        "type" : 1,
        "image": data2.email1===userValue.email?data2.photo2:data2.photo1,
        "text": newMsg,
      }
   
      await updateDoc(docRef2, {
        comment: [...data2.comment, {email:userValue.email,text:newMsg}]
      });

           

     

      let data=[...msgArray,tempData]
      setMsgArray(data)
      setNewMsg("")
      
    }
  }

  return (
    <div className='chat-body' style={{height:'100vh'}}>
      {<ChatBubble style={{width:'500px'}}  messages = {msgArray} />}
      <input value={newMsg} placeholder="Message Here" style={ { position: 'fixed',fontSize:'2em',
      height: '50px', bottom: 0, left: 0, right: 0, zIndex: 9999} } onChange={(event)=>setNewMsg(event.target.value) } onKeyDown={handleKeyDown}  />
    </div>
     
 
   
  )
}

export default Chat