import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { ADD_TO_USERDATA } from './feature/navSlice';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import Registration from './pages/Registration';
import Selection from './pages/Selection'
import Profile from './pages/Profile';
import Chat from './pages/Chat'
import UserDisplay from './pages/UserDisplay';
import UserCard from './components/JS/UserCard';
import Matches from './components/JS/Matches';


function App() {

  const [user, setuser] = useState(null);
  const dispatch = useDispatch();

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, "userInfo", user.email);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            dispatch(ADD_TO_USERDATA(docSnap.data()));
          }
        } else {
          console.log("Null")
        }
      }),
    []
  );

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/selection" element={<UserCard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/matches" element={<Matches />} />
    </Routes>
  );
}

export default App;
