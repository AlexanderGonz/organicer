import React, { useState } from 'react';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { serverUrl } from '../configs/serverUrl';
// import { setLogin } from '../actions'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CreateUserDialog = ({open, profile, onClose, user, dispatch}) => {
  const email = React.createRef()
  const name = React.createRef()
  const lastname = React.createRef()
  const phone = React.createRef()
  const pass = React.createRef()
  // const newPass = React.createRef()

  const [openSnack, setOpenSnack] = useState(false)
  const [msgSnack, setMsgSnack] = useState('')
  const [severitySnack, setSeveritySnack] = useState('')
  
  const handleClose = () =>{
    onClose()
  }
  const handleCloseSnack = (e, reason) => {
    if(reason === 'clickaway'){
      return
    }
    setOpenSnack(false)
  }

  const showMessage = (msg, severity) => {
    setMsgSnack(msg)
    setSeveritySnack(severity)
    setOpenSnack(true)
  }

  const handleSubmit = () => {
 

    if(!profile){
      if(email.current.value !== ''){
        axios.post(serverUrl + '/users/',{
          newUser: {
            email: email.current.value,
            name: name.current.value,
            lastname: lastname.current.value,
            phone: phone.current.value,
          }
        }).then(res => {
          res.status === 200 && showMessage('Usuario agregado', 'success')
        }).catch(err => {
          console.log(err);
        })
        onClose()
      } else {
       
        showMessage('El email es obligatorio','error')
      }
    }else{
      if(email.current.value !== ''){
        axios.put(serverUrl + '/users', {
          user: {
            email: email.current.value,
            name: name.current.value,
            lastname: lastname.current.value,
            phone: phone.current.value,
            password: pass.current.value,
          }
        }).then(res => {
          if(res.status === 200) {
            showMessage('Usuario actualizado', 'success')
              // dispatch(setLogin(res.data.user, res.data.token))
            localStorage.clear()
            window.location = '/login'
          }
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }

  return (
    <>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">{profile ? 'Datos de perfil' : 'Crear Usuario'}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {profile
        ? 'Para modificar tu datos es necesario que introduzcas tu contraseña actual'
        : 'Para crear un nuevo usuario, por favor rellena este formulario. El campo email es obligatorio'}
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="email"
        label="Email"
        type="email"
        required="true"
        fullWidth
        defaultValue={profile ? user.email : ''}
        inputRef={email}
        />
      <TextField
        margin="dense"
        id="name"
        label="Nombre"
        type="text"
        fullWidth
        defaultValue={profile ? user.name : ''}
        inputRef={name}
      />
      <TextField
        margin="dense"
        id="lastname"
        label="Apellidos"
        type="text"
        fullWidth
        defaultValue={profile ? user.lastname : ''}
        inputRef={lastname}
      />
      <TextField
        margin="dense"
        id="phone"
        label="Telefono"
        type="text"
        fullWidth
        defaultValue={profile ? user.phone : ''}
        inputRef={phone}
      />
      {profile && (
        <>
          <TextField
            margin="dense"
            id="newPass"
            label="Contraseña"
            type="password"
            fullWidth
            inputRef={pass}
          />
          {/* <TextField
            margin="dense"
            id="phone"
            label="Contraseña nueva"
            type="password"
            fullWidth
            inputRef={phone}
          /> */}
        </>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancelar
      </Button>
      <Button onClick={handleSubmit} color="primary">
        {profile ? 'Guardar' : 'Crear'}
      </Button>
    </DialogActions>
  </Dialog>
  <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
    <Alert onClose={handleCloseSnack} severity={severitySnack}>
      {msgSnack}
    </Alert>
  </Snackbar>
</>
  );
}

const mapStateToProps = state => ({
  user: state.login.user
})

export default connect(mapStateToProps)(CreateUserDialog)