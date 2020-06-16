import React, { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components";
import { serverUrl } from "../configs/serverUrl"
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom"

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`
const StyledDiv = styled.div`
    text-align: center
`


const ActivateWindow = ({ match }) => {
  const [activado, setActivado] = useState(false)
  const [msg, setMsg] = useState('Wait...')

  useEffect(() => {
    const { id } = match.params

    axios.post(serverUrl + '/users/activate',{id})
    .then(res => {
      if(res.status === 200){
       setMsg('Usuario activado correctamente')
       setActivado(true)
      }
    }).catch (err => {
      console.log(err);
      setMsg('Error al activar su usuario. contacte con el administrador')
    })
  },[])

  
  const Boton = () => {
    return (
      <Button variant="contained" color="secondary"> 
        LogIn
      </Button>
    )
  }

  return (
    <StyledDiv>
      <h1>{msg}</h1>
      {activado && (
        <>
        <p>Pulsa el siguiente boton para dirigirte a la pagina de LogIn</p>
        <StyledLink to='/'>
          <Boton /> 
        </StyledLink>
        </>
      )}
    </StyledDiv>
  )

}

export default ActivateWindow