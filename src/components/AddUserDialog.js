import React, { useState } from 'react';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import { addUserToBoard } from "../actions"

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AddUserDialog = ({open, onCloseDialog, usersCompany, dispatch}) =>{
  const [scroll] = React.useState('paper');
  const [openSnack, setOpenSnack] = useState(false)
  const [msgSnack] = useState('')
  const [severitySnack] = useState('')

  const handleClose = () => {
    onCloseDialog()
  }

  const handleCloseSnack = (e, reason) => {
    if(reason === 'clickaway'){
      return
    }
    setOpenSnack(false)
  }

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  const handleListItemClick = (userID) => {
    console.log(userID);
    dispatch(addUserToBoard(userID))
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
      >
        <DialogTitle id="scroll-dialog-title">Añadir usuarios al tablón </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <List>
              {Object.keys(usersCompany).map((userID) => {
                
                if(userID !== 'isFetching' && userID !== 'error'){
                  let user = usersCompany[userID]
                  return(
                    <ListItem button onClick={() => handleListItemClick(user._id)} key={user._id}>
                      <ListItemAvatar>
                        <Avatar >
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={user.email} secondary={user.name ? user.name : null} />
                    </ListItem>
                  )
                }else{
                  return null
                }
              })}

            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity={severitySnack}>
          { msgSnack }
        </Alert>
      </Snackbar>
    </div>
  );
}

const mapStateToProps = state => ({
  lists: state.lists,
  cards: state.cards,
  boards: state.boards,
  users: state.users,
  usersCompany: state.usersCompany,
  activeBoard: state.activeBoard
});

export default connect(mapStateToProps)(AddUserDialog)