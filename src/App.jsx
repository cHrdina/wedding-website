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
import { PublicLayout } from "./components/Layout/PublicLayout";

const themeColors = {
  darkGrey: "#1e1e1e",
  midGrey: "#999999",
  // peach: "#f4d7cb",
  peach: "#ffefe6",
  peachDark: "#f3d7c8",
};

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
            fontWeight: 400,
            // letterSpacing: 1,
            color: themeColors.darkGrey,
          },
        },
      },
    },
    components: {
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: themeColors.darkGrey,
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            fontSize: "1.5rem",
          },
          underline: {
            "&::after": {
              borderColor: themeColors.darkGrey,
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            "& .Mui-checked": {
              backgroundColor: "#fff",
            },
            "& .MuiSvgIcon-root": {
              color: themeColors.darkGrey,
            },
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            border: "1px solid",
            borderColor: themeColors.midGrey,
            fontWeight: 400,
            // borderColor: themeColors.darkGrey,
            textTransform: "none",
            color: themeColors.darkGrey,

            "&.Mui-selected": {
              "&:hover": {
                borderColor: themeColors.midGrey,
                // borderColor: themeColors.darkGrey,
                backgroundColor: themeColors.peach,
              },
              backgroundColor: themeColors.peach,
              fontWeight: 500,
            },
            "&.MuiToggleButtonGroup-grouped:not(:first-of-type)": {
              border: "1px solid",
              // borderColor: themeColors.darkGrey,
              borderColor: themeColors.midGrey,
            },
            "&:hover": {
              borderColor: themeColors.midGrey,
              backgroundColor: themeColors.peach,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            // letterSpacing: 1,
            // fontWeight: 400,
            color: themeColors.darkGrey,
            whiteSpace: "nowrap",
            minWidth: "max-content",
            backgroundColor: themeColors.peach,
            "&:hover": {
              borderColor: themeColors.darkGrey,
              backgroundColor: "#f3d7c8",
            },
          },
          outlined: {
            borderColor: themeColors.darkGrey,
          },
          outlinedPrimary: {
            borderColor: themeColors.darkGrey,
            // border: "0.5px solid",
          },
        },
      },
    },
    pallete: {
      default: {
        color: themeColors.peach,
      },
      primary: {
        color: themeColors.darkGrey,
        main: themeColors.peach,
      },
      text: {
        primary: {
          color: themeColors.darkGrey,
        },
      },
      action: {
        hover: themeColors.peach,
      },
    },
    background: {
      default: "#fff",
    },
    typography: {
      fontFamily: ["Montserrat, sans-serif"],
      h1: {
        fontFamily: ["Montserrat", "serif"].join(","),
        fontSize: "3rem",
        // letterSpacing: 0.5,
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
              <PublicLayout>
                <Login />
              </PublicLayout>
            </Route>
            <Route path={`/login/:id`}>
              <PublicLayout>
                <Login />
              </PublicLayout>
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
