import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Login } from "./pages/Login";
import { mainMenuRoutes } from "./routes";

import { AuthHandler } from "./handlers/AuthHandler";
import { BaseLayout } from "./components/Layout/BaseLayout";
import { createTheme, ThemeProvider } from "@material-ui/core";
import CssBaseline from "@mui/material/CssBaseline";

const PrivateRoute = ({ component: Component, name, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem("userId")) {
          console.log("no user exists in storage");
          return (
            <Redirect
              to={{ pathname: `/login`, state: { from: props.location } }}
            />
          );
        }

        return (
          <BaseLayout title={name}>
            <Component {...props} />
          </BaseLayout>
        );
      }}
    />
  );
};

function App() {
  const theme = createTheme({
    overrides: {
      MuiCssBaseline: {
        "@global": {
          html: {
            fontFamily: ["Montserrat", "sans-serif"].join(","),
            color: "#1E1E1E",
          },
        },
      },
    },
    pallete: {
      text: {
        primary: "#1E1E1E",
      },
    },
    typography: {
      h1: {
        fontFamily: "Bayshore",
      },
      body1: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
      },
    },
  });

  return (
    <Router>
      <AuthHandler>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            <Route exact path={`/login`}>
              <Login />
            </Route>
            <Route path={`/login/:id`}>
              <Login />
            </Route>
            {mainMenuRoutes.map(({ route, name, component }) => (
              <PrivateRoute
                exact
                path={route}
                name={name}
                component={component}
              />
            ))}
          </Switch>
        </ThemeProvider>
      </AuthHandler>
    </Router>
  );
}

export default App;
