import "./App.css";
import React, {useEffect, useState, useContext, createContext} from "react"
import { BrowserRouter as Router, Switch, Route, Redirect, useParams } from "react-router-dom";

import { Header } from "./components/MainMenu/MainMenu";

import {Login} from "./pages/Login"
import { mainMenuRoutes } from "./routes";
import { Box } from "@mui/system";
import { LoginWithUser } from "./components/LoginWithUser/LoginWithUser";
import { getEntryById } from "./client/client";

const PrivateRoute = ({ loggedInUser, component: Component, ...rest }) => {

  const {userId} = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props => {
        if (!loggedInUser) {
          if (userId) return <Redirect to={{ pathname: `/login/${userId}`, state: { from: props.location } }} /> 
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

export const AuthContext = createContext({
  userId: undefined,
  user: undefined
})

const AuthHandler = ({userId, children}) => {
  const [user, setUser] = useState();

  const getUserInfo = async () => {
    const entry = await getEntryById(userId);
    console.log(entry.fields);
    setUser(entry.fields);
  };

  useEffect(() => {
    if (userId) getUserInfo()
  }, [userId])

  return (
    <AuthContext.Provider value={{userId, user}} >{children}</AuthContext.Provider>
  )

}

function App() {
  
  const [loggedInUser, setLoggedInUser] = useState();

  return (
    <Router>
      <AuthHandler userId={loggedInUser}>
      <Switch>
          <Route exact path={`/login`} component={LoginWithUser} />
          <Route path={`/login/:id`} >
            <Login setLoggedInUser={setLoggedInUser} />
          </Route>

          {mainMenuRoutes.map(({route, component}) => (
            <PrivateRoute exact path={route} component={component} loggedInUser={loggedInUser} />
          ))}
      </ Switch>
  </AuthHandler>
    </Router>
  );
}

export default App;
