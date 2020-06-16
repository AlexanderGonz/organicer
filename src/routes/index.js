import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Board from "../components/Board";
import Home from "../components/Home";
import Login from "../components/Login"
import Navbar from "../components/Navbar"
import ActivateWindow from "../components/ActivateWindow"
import { connect } from "react-redux";
import styled from "styled-components";

const AppRouter = ({ user }) => {

  
  const Container = styled.div`
    margin-top: 5em;
    margin-left: 1em;
  `

  return (
    <Router>
      <div>
         {user && <Navbar />}
        <Container>
          <Route path="/login" exact render={(props) => (
            !user 
            ? <Login {...props} />
            : <Redirect to="/" />
            )} />
          <Route path="/" exact render={() => (
            <Home/>
            )} />
          <Route path="/board/:boardID" render={(props) => (
            <Board {...props}/>
            )} />
          <Route path="/activate/:id" render={(props) => (
            <ActivateWindow {...props}/>
            )} />
          
        </Container>
      </div>
    </Router>
  );
};

const mapStateToProps = state => ({
  user: state.login.user
})

export default connect(mapStateToProps)(AppRouter);
