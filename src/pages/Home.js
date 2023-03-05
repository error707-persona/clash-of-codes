import React from 'react';
import '../components/CSS/style.css';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="HomePage">
      <h1 className="text">Welcome to MatchMate</h1>
      <p className="text">Find your perfect match with us today!</p>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Link to="/registration" className="cta-button">
          Join Now
        </Link>
        <Link to="/login" className="cta-button">
          Login
        </Link>
      </Stack>
  
    </div>
  );
}

export default Home;