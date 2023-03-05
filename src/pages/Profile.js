import { doc, getDoc } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserdata } from '../feature/navSlice'
import { db } from '../firebase'
import '../components/CSS/Profile.css';
import Tilt from "react-vanilla-tilt";
import MaleIcon from '@mui/icons-material/Male';
import { Button, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router'
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Matches from '../components/JS/Matches'


function Profile() {

    const [userData, setuserData] = useState()
    const userValue = useSelector(selectUserdata)
    const [formDate, setformDate] = useState()
    const navigation = useNavigate()
    console.log(userValue)

    const navigateFunction=()=>{
        if(userValue.chat!==""){
            navigation("/chat")
        }else{
            navigation("/selection")
        }
    }

    return (
        <div className="productitem">
            <Tilt
                style={{ margin: "100px auto", padding: "0px", width: "70%", height: "90%", }}
                options={{ scale: 8, glare: true, "max-glare": 1, max: 55, }}
            >
                <div className="profile-container">
                    <div className="profile-body">
                        <img src={userValue.photourl} />
                    </div>
                    <div className="profile-header">
                        <div className='profile_name'>
                            <h1 style={{ marginRight: "20px" }}>{userValue.name}</h1>
                            <IconButton style={{ color: "crimson", size: "40px" }}>
                                {
                                    userValue.gender === "male" ?
                                        <MaleIcon /> : userData.userValue.gender === "other" ? <TransgenderIcon /> : <FemaleIcon />
                                }
                            </IconButton>
                        </div>
                        <h3 style={{ margin: "5px" }}>{userValue.email}</h3>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", margin: "5px" }}>
                            <h5>Hobbies :</h5>
                            <p>{userValue.hobbies}</p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", margin: "5px" }}>
                            <h5>Address :</h5>
                            <p>{userValue.address}</p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", margin: "5px" }}>
                            <h5>Phone :</h5>
                            <p>{userValue.phone}</p>
                        </div>
                    </div>
                </div>
            </Tilt>
            <Matches />
            <Button sx={{marginTop:'30px'}} onClick={() => navigateFunction()} variant="contained" endIcon={<SendIcon />}>
                Find a Match
            </Button>
                                
        </div>
    )
}

export default Profile

