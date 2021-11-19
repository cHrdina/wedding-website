import "./App.css";
import React, {useEffect, useState, useContext, createContext} from "react"
import { BrowserRouter as Router, Switch, Route, Redirect, useParams, useHistory } from "react-router-dom";

import { Header } from "./components/MainMenu/MainMenu";

import {Login} from "./pages/Login"
import { mainMenuRoutes } from "./routes";
import { Box } from "@mui/system";

import { AuthContext, AuthHandler } from "./handlers/AuthHandler";

const PrivateRoute = ({ component: Component, ...rest }) => {

  const { user } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props => {
        if (!user) {
          console.log("no user exists")
          return <Redirect to={{ pathname: `/login`, state: { from: props.location } }} />
        }
    
        return (
          <>
            <Header />
            <Box
              sx={{
                height: "90vh",
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              <Component {...props} />
            </Box>
          </>
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

          {mainMenuRoutes.map(({route, component}) => (
            <PrivateRoute exact path={route} component={component} />
          ))}
      </ Switch>
  </AuthHandler>
    </Router>
  );
}

export default App;
