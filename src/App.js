import "./App.css";
import React, {useEffect, useState, useContext, createContext} from "react"
import { BrowserRouter as Router, Switch, Route, Redirect, useParams, useHistory } from "react-router-dom";

import { Header } from "./components/MainMenu/MainMenu";

import {Login} from "./pages/Login"
import { mainMenuRoutes } from "./routes";
import { Box } from "@mui/system";

import { AuthContext, AuthHandler } from "./handlers/AuthHandler";
import { BaseLayout } from "./components/Layout/BaseLayout";

const PrivateRoute = ({ component: Component, name, ...rest }) => {

  return (
    <Route
      {...rest}
      render={props => {
        if (!localStorage.getItem("userId")) {
          console.log("no user exists in storage")
          return <Redirect to={{ pathname: `/login`, state: { from: props.location } }} />
        }
    
        return (
          <BaseLayout title={name}>
            <Component {...props} />
          </BaseLayout>
        
        )

      
      }
    } />
  )
}


function App() {
  

  return (
    <Router>
      <AuthHandler>
      <Switch>
          <Route exact path={`/login`} >
            <Login />
          </Route>
          <Route path={`/login/:id`} >
            <Login />
          </Route>

          {mainMenuRoutes.map(({route, name, component}) => (
            <PrivateRoute exact path={route} name={name} component={component} />
          ))}
      </ Switch>
  </AuthHandler>
    </Router>
  );
}

export default App;
