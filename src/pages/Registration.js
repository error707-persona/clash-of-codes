import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, formatMs } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import '../components/CSS/style.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { app, storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { ADD_TO_USERDATA } from '../feature/navSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { height } from '@mui/system';
import { nanoid } from 'nanoid'
import MapCode from './MapCode';


const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
  },
  textField: {
    margin: theme.spacing(2),
    width: '100%',
    maxWidth: '400px',
  },
  formControl: {
    margin: theme.spacing(2),
    width: '100%',
    maxWidth: '400px',
  },
  button: {
    margin: theme.spacing(2),
    width: '100%',
    height: '56px',
    maxWidth: '400px',
  },
  }));






function Registration() {
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData)
  };
  const [toggler, settoggler] = useState(false);
  const[xcode,setxcode]= useState(0);
  const[ycode,setycode]= useState(0);
  const navigation = useNavigate()
  const dispatch = useDispatch()

  React.useEffect(()=>{
    setFormData((prev)=>{
      let tempData={...prev,xcode:xcode,ycode:ycode}
      return tempData
    }
  
    )
  },[xcode,ycode])

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    gender: '',
    preference: '',
    hobbies: '',
    xcode: xcode,
    ycode: ycode,
    photourl:"",
  })
  const [imageData, setImageData] = React.useState({})
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }


const getxyCodes =()=>{

if(!navigator.geolocation){
console.log("Browser doesnt support geolocation")

}else{
  navigator.geolocation.getCurrentPosition((position)=>{
    console.log(position.coords.latitude);
    setxcode(position.coords.latitude);
    console.log(position.coords.longitude);
    setycode(position.coords.longitude);
  },()=>{
console.log("Unable to get coordinates");
  });
}

}


const [codes, setCodes] = useState({});

const childToParent = (childData) => {
   setCodes(childData);
   setxcode(codes.lat);
   setycode(codes.lng);
}


const registerWithEmailId = async () => {
    // console.log(formData)
    const docRef = doc(db, "userInfo", formData.email);
    const docSnap = await getDoc(docRef);
    var words = formData.hobbies.split(",");
    if (!docSnap.exists()) {
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then(async (userCredential) => {
          var user = userCredential.user;
          console.log(user);
          user.displayName = formData.name;
          // setuser(user);
          const storageRef = ref(storage, `images/${nanoid(5)}`);
          const uploadTask = uploadBytesResumable(storageRef, imageData);

          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            },
            (error) => {
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL)


                setDoc(doc(db, "userInfo", `${formData.email}`), {
                  name: formData.name,
                  email: formData.email,
                  address: formData.address,
                  phone: formData.phone,
                  gender: formData.gender,
                  preference: formData.preference,
                  hobbies: words,
                  timestemps: serverTimestamp(),
                  xcode: formData.xcode,
                  ycode: formData.ycode,
                  photourl: downloadURL,
                  request:[],
                  accept:[],
                  chat:""
                });

                dispatch(ADD_TO_USERDATA({
                  name: formData.name,
                  email: formData.email,
                  address: formData.address,
                  phone: formData.phone,
                  gender: formData.gender,
                  preference: formData.preference,
                  hobbies: words,
                  timestemps: serverTimestamp(),
                  xcode: formData.xcode,
                  ycode: formData.ycode,
                  photourl: downloadURL,
                  request:[],
                  accept:[],
                  chat:""
                }))

              });
            }
          );
          navigation("/login")
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    } else {
      settoggler(true);
    }
  };

  return (
    <div className='reg-body' style={{ display: 'flex', justifyContent: 'center' }}>

      <Paper elevation={6} sx={{ borderRadius: "20px", margin: "20px", width: "600px" }}>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Registration
          </Typography>
          {toggler ?
            (
              <>
                <Alert variant="outlined" severity="error">
                  This is an error alert — check it out!
                </Alert>
              </>
            )
            :
            ""}
          <hr />
          <TextField onChange={handleChange} value={formData.name} className={classes.textField} required id="name" name="name" label="Name" type="text" />
          <TextField onChange={handleChange} value={formData.email} className={classes.textField} required id="email" name="email" label="Email" type="email" />
          <TextField onChange={handleChange} value={formData.password} className={classes.textField} required id="password" name="password" label="Password" type="password" />
          <FormControl className={classes.formControl} required>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select onChange={handleChange} labelId="gender-label" id="gender" name="gender">
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl} required>
            <InputLabel id="preference-label">Preference</InputLabel>
            <Select onChange={handleChange} labelId="preference-label" id="preference" name="preference">
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
              <MenuItem value="ambiguous">Ambiguous</MenuItem>
            </Select>
          </FormControl>
          <TextField onChange={handleChange} className={classes.textField} value={formData.hobbies} id="hobbies" name="hobbies" label="Hobbies (Separate them with spaces)" multiline rows={4} />
          <TextField onChange={handleChange} className={classes.textField} value={formData.address} id="address" name="address" label="Address" />
          <TextField onChange={handleChange} className={classes.textField} value={formData.xcode} id="xcode" name="xcode" label="Latitude" />
          <TextField onChange={handleChange} className={classes.textField} value={formData.ycode} id="ycode" name="ycode" label="Longitude" />
          <Button className={classes.button} onClick={()=> getxyCodes()} color="secondary" variant="contained">
            Get current coordinates
          </Button>
          <MapCode childToParent={childToParent} />
          <TextField onChange={handleChange} className={classes.textField} value={formData.phone} id="phone" name="phone" label="Phone" type="tel" />
          <input type="file" onChange={(event) => { setImageData(event.target.files[0]) }} />
          <Button className={classes.button} onClick={() => registerWithEmailId()} variant="contained" color="primary" type="submit">
            Register
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default Registration;