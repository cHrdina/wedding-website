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
import { createTheme, ThemeProvider } from "@mui/material";
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
      CssBaseline: {
        "@global": {
          html: {
            fontFamily: "Montserrat",
            color: "#1E1E1E",
          },
        },
      },
    },
    pallete: {
      primary: {
        color: "#1E1E1E",
      },
      text: {
        primary: {
          color: "#1E1E1E",
        },
      },
    },
    typography: {
      fontFamily: ["Montserrat, sans-serif"],
      h1: {
        fontFamily: ["Bayshore", "GFS Didot", "serif"].join(","),
        fontSize: "5rem",
        letterSpacing: 0.5,
      },
      h4: { fontFamily: ["GFS Didot", "serif"].join(",") },
      body1: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
      },
      subtitle1: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
      },
      logo: {
        fontFamily: ["Bayshore", "sans-serif"].join(","),
        fontSize: "3rem",
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
