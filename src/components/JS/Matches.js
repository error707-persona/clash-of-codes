import React from "react";
import profile from '../../assets/profile.jpg'
import { useSelector } from 'react-redux'
import { selectUserdata } from '../../feature/navSlice'
import { doc, updateDoc,getDoc,addDoc,collection,setDoc } from "firebase/firestore";
import {db} from '../../firebase'
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid'


const Matches = () => {
  const navigation = useNavigate()
  const userValue =  useSelector(selectUserdata)
  const [comp,setComp]=React.useState([])

  const swiped = async (email) => {
  
      const ref = doc(db, "userInfo", email);
      const docSnap = await getDoc(ref)
      const data=docSnap.data()
  
      return data
   
    
  }

  const connectUsers = async (email) => {

        let newChannel=nanoid(5)
        const ref = doc(db, "userInfo", email);
        const docSnap = await getDoc(ref)
        const data=docSnap.data()
        await updateDoc(ref, {
            accept: [...data.accept, userValue.email],
            chat:newChannel,
            timestemps:Date.now()
          });

          
        const ref2 = doc(db, "userInfo", userValue.email);
        const docSnap2 = await getDoc(ref2)
        const data2=docSnap2.data()
        await updateDoc(ref2, {
          accept: [...data2.accept, email],
          chat:newChannel,
          timestemps:Date.now()
          });


          setDoc(doc(db, "chat", newChannel), {
            email1:userValue.email,
            email2:email,
            photo1:userValue.photourl,
            photo2:data.photourl,
            name1:userValue.name,
            name2:data.name,
            comment:[]
          });
        // const collectionsRef = collection(db, newChannel);
        // await addDoc(collectionsRef, {
        //   comment: []
        //   })

          navigation("/chat")

          
         
  }

  const swiped2=async()=>{
    if(userValue){
      let resData=[]
      for(let i=0;i<userValue.request.length;i++){
        let tempData=await swiped(userValue.request[i])
      
        
        resData.push(
             
          <div className="row">
            <div className="avatar">
              <img src={tempData.photourl} width={100} height={100} className="img" />
            </div>
            <div className="left">{tempData.name}</div>
            
            <div  className="right">
              <button className="accept" onClick={()=>connectUsers(tempData.email)}>+</button>
              <button className="reject">-</button>
            </div>

          </div>
        
        )
      }
      setComp(resData)
    }
  }

  React.useEffect(()=>{
    swiped2()
  },[0])
 
 




  return (
    
       
      <div className="matches-container">
         <span style={{marginTop:'30px'}}>Your Matches</span>
        <div className="matches-textbox">
       
  
          {comp}
       


        </div>
      </div>
   
  );
};

export default Matches;
