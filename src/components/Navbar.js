import React, { useState } from 'react';
import styled from "styled-components";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import logo from "../marca_organicer_nombre1.png"
import { logOutAction } from "../actions/loginActions"
import CreateUserDialog from "./CreateUserDialog"

const DivStyled = styled.div`
  background-color: #85D6AE;
  width: 100%;
  min-height: 50px;
  margin: 0;
  display: flex;
  position: fixed;
  z-index: 100;
  top: 0;

`
const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`
const FloatRight = styled.div`
    float: right;
    flex:1;
    text-align: right;
    margin-right: 10px
`
const FloatLeft = styled.div`
    float: left
    flex:1;
    text-align: left;
    margin:auto;
    margin-left: 2em
`
const FloatCenter = styled.div`
    float: left;
    flex:1;
    text-align: center;
    margin auto
`

const MenuAppBar = ({ isAuth, user, dispatch}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [profile, setProfile] = useState(true)
  const open = Boolean(anchorEl);



  const handleCloseDialog = (e) => {
    setProfile(e.currentTarget.id === 'profile' ? true : false)
    setOpenDialog(!openDialog)
  }

  const closeDialog = () => {
    setOpenDialog(!openDialog)
  }

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    dispatch(logOutAction())
    setAnchorEl(null);
    return <Redirect to="/login" />
  }

  return (
    
    <DivStyled id="hertrudis">
        
          <FloatLeft>
            <Typography variant="h6" >
            <StyledLink to="/">Home</StyledLink>
            </Typography>
          </FloatLeft>
          <FloatCenter>
            <img src={logo} width="50px" alt="logo"/>
          </FloatCenter>
          
          {isAuth && (
            //este div encierra al icono de perfil y el submenu
            <FloatRight>
              <IconButton
                onClick={handleMenu}
                color="inherit"
              >
                <Chip
                  avatar={<Avatar>{user.name ? user.name.substring(0,1) : ''}</Avatar>}
                  label={user.name}
                 />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleCloseDialog} id="profile">Perfil</MenuItem>
                {user.rol === 'admin' && <MenuItem id="create"onClick={handleCloseDialog}>Crear Usuario</MenuItem>}
                <MenuItem onClick={logOut}>Cerrar Sesión</MenuItem>
              </Menu>
            </FloatRight>
          )}
          {!isAuth && (
            <FloatRight>
              <Typography><p>LogIn</p></Typography>
            </FloatRight>
          )}
          <CreateUserDialog open={openDialog} profile={profile} onClose={closeDialog}/>
        
    </DivStyled>
  );
}
const mapStateToProps = state => ({
  isAuth: state.login.isAuth,
  user: state.login.user
});

export default connect(mapStateToProps)(MenuAppBar)