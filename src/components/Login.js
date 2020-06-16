import React, { useState }from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import { setLogin } from "../actions"
import axios from "axios"


const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const LogIn = ({ history, isAuth, dispatch }) => {
  const classes = useStyles();
  const [email, setEmail ] = useState('')
  const [pass, setPass ] = useState('')
  const [openSnack, setOpenSnack] = useState(false)
  const [msgSnack, setMsgSnack] = useState('')
  const [severitySnack, setSeveritySnack] = useState('')
  
  
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleChangePass = (e) => {
    setPass(e.target.value)
  }

  const handleCloseSnack = (e, reason) => {
    if(reason === 'clickaway'){
      return
    }
    setOpenSnack(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()  

    axios.post('http://localhost:4000/auth', {
      login: {
        mail: email,
        pass: pass
      }
    }).then(res => {
      if (res.data.success ){ 
        dispatch(setLogin(res.data.user, res.data.token))
        history.push('/')
      }else{
        setMsgSnack(res.data.message)
        setSeveritySnack('info')
        setOpenSnack(true)
      }
    }).catch (err => {
      console.log(err);
      
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div id='test' className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChangeEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChangePass}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Log In
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            
          </Grid> */}
        </form>
      </div>

      <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity={severitySnack}>
          {msgSnack}
        </Alert>
      </Snackbar>
      
    </Container>
  );
}

const mapStateToProps = state => ({
  isAuth: state.login.isAuth
});

export default connect(mapStateToProps)(LogIn);