import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";


import { app, db } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";
import { lightBlue } from "@mui/material/colors";

const Selection = () => {
  const auth = getAuth();
  const collectionsRef = collection(db, "userInfo");
  const [data, setdata] = useState([]);
  const filter = query(collectionsRef, where("name", "==", "Saurabh Yadav"));

  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };
  console.log("user", auth.currentUser);
  const filterQuery = query(
    collectionsRef,
    where("gender", "==", "male"),
    where("gym", "in", ["hobbies"])
  );

  const getData = async () => {
    const res = await getDocs(filterQuery);
    setdata(res.docs)
  };

  return (
    <div className="selection-body"
      style={{
        
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >  
     
      <div style={{ maxWidth: "500px" }}>
          
       {data?.map((item)=>{
        return (
          <TinderCard
          onSwipe={onSwipe}
          onCardLeftScreen={() => onCardLeftScreen("fooBar")}
          preventSwipe={["right", "left"]}
        >
          <Card sx={{ maxWidth: 345, minHeight: "400px" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="340"
                image="https://thumbs.dreamstime.com/b/handsome-guy-being-bored-talking-stranger-random-staff-yawning-cover-opened-mouth-fist-squinting-tired-standing-fatigue-178777560.jpg" // replace with your desired image URL
                alt="random image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.data().name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </TinderCard>
        )
       }) }
        <button onClick={getData}>submit</button>
      </div>
     
    </div>
  );
};

export default Selection;
