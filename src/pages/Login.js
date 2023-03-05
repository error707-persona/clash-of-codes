import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { app, db } from "../firebase";
import Alert from "@mui/material/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { ADD_TO_USERDATA } from "../feature/navSlice";
import { useDispatch } from "react-redux";
import '../components/CSS/style.css';



const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(8),
  },
  textField: {
    margin: theme.spacing(2),
    width: "100%",
    maxWidth: "400px",
  },
  button: {
    margin: theme.spacing(2),
    width: "100%",
    maxWidth: "400px",
  },
}));

function Login() {
  const dispatch = useDispatch()
  let navigate = useNavigate();
  const classes = useStyles();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [toggler, setToggler] = React.useState(false);
  const auth = getAuth();
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(async (userCredential) => {
        var userinfo = userCredential.user;
        const docRef = doc(db, "userInfo", userinfo.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(ADD_TO_USERDATA(docSnap.data()));
        }
        // console.log("This login time data", userinfo.displayName);
        // setuser(userinfo);
        navigate("/profile");
      })
      .catch((error) => {
        const errorCode = error.code;
        // console.log(errorCode);
        const errorMessage = error.message;
        // console.log(errorMessage);
      });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
      } else {
      }
    });
  };

  return (
    <div className="login-body"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg')",
        // backgroundRepeat:"no-repeat",
        // width:"100%"
      }}
    >
      <Paper
        elevation={7}
        sx={{
          height: "450px",
          borderRadius: "25px",
          margin: "20px",
          width: "600px",
        }}
      >
        <form className={classes.form} onSubmit={handleSubmit}>
          <Box mt={1}>
            <Typography sx={{ marginTop: "20px" }} variant="h4" gutterBottom>
              Login
            </Typography>
          </Box>
          {toggler && (
            <Collapse in={toggler}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setToggler(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                Invalid Email or Password
              </Alert>
            </Collapse>
          )}
          <TextField
            value={formData.email}
            onChange={handleChange}
            className={classes.textField}
            required
            id="email"
            name="email"
            label="Email"
            type="email"
          />
          <TextField
            value={formData.password}
            onChange={handleChange}
            className={classes.textField}
            required
            id="password"
            name="password"
            label="Password"
            type="password"
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default Login;
