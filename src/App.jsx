import "./App.css";
import React from "react";
import {
  HashRouter as Router,
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
import { Page404 } from "./pages/404";

const themeColors = {
  darkGrey: "#1e1e1e",
  midGrey: "#999999",
  peach: "#ffefe6",
  midPeach: "#ffe1d0",
  darkPeach: "#ffdac6",
};

const PrivateRoute = ({
  component: Component,
  name,
  displayPageTitle,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem("userId")) {
          return (
            <Redirect
              to={{ pathname: `/not-found`, state: { from: props.location } }}
            />
          );
        }

        return (
          <BaseLayout title={name} displayPageTitle={displayPageTitle}>
            <Component {...props} />
          </BaseLayout>
        );
      }}
    />
  );
};

function App() {
  const defaultTheme = createTheme();
  const theme = createTheme({
    overrides: {
      CssBaseline: {
        "@global": {
          html: {
            fontFamily: "Spartan",
            fontWeight: 400,
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
            fontSize: "1rem",
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
            borderRadius: 0,
            borderColor: themeColors.midGrey,
            fontWeight: 400,
            textTransform: "none",
            color: themeColors.darkGrey,

            "&.Mui-selected": {
              "&:hover": {
                borderColor: themeColors.midGrey,
                backgroundColor: themeColors.midPeach,
              },
              backgroundColor: themeColors.darkPeach,
              fontWeight: 500,
            },
            "&.MuiToggleButtonGroup-grouped:not(:first-of-type)": {
              border: "1px solid",
              borderColor: themeColors.midGrey,
            },
            "&:hover": {
              borderColor: themeColors.midGrey,
              backgroundColor: themeColors.midPeach,
            },
          },
          sizeLarge: {
            padding: "0.8rem 2rem",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            color: themeColors.darkGrey,
            whiteSpace: "nowrap",
            minWidth: "max-content",
            backgroundColor: "none",
            borderRadius: 0,
            "&:hover": {
              borderColor: themeColors.midGrey,
              backgroundColor: themeColors.midPeach,
            },
          },
          outlinedPrimary: {
            borderColor: themeColors.midGrey,
          },
          sizeLarge: {
            padding: "0.8rem 2rem",
          },
        },
      },
    },
    palette: {
      default: {
        color: themeColors.darkGrey,
      },
      primary: {
        color: themeColors.darkGrey,
        main: themeColors.darkGrey,
      },
      text: {
        primary: themeColors.darkGrey,
        secondary: themeColors.midGrey,
      },
      action: {
        hover: themeColors.peach,
      },
      background: {
        default: themeColors.peach,
      },
    },

    typography: {
      fontFamily: ["Spartan, sans-serif"],
      h1: {
        fontFamily: ["Bacalisties", "serif"].join(","),
        fontSize: "4rem",
        [defaultTheme.breakpoints.down("md")]: {
          fontSize: "3rem",
        },
      },
      h4: { fontFamily: ["Spartan", "serif"].join(",") },
      body1: {
        fontFamily: ["Spartan", "sans-serif"].join(","),
      },
      subtitle1: {
        fontFamily: ["Spartan", "sans-serif"].join(","),
      },
      logo: {
        color: themeColors.darkGrey,
        fontFamily: ["Bacalisties", "sans-serif"].join(","),
        fontWeight: "bold",
        fontSize: "3rem",
      },
    },
  });

  return (
    <Router basename="/">
      <AuthHandler>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            <Route path={`/login/:id`}>
              <PublicLayout>
                <Login />
              </PublicLayout>
            </Route>
            {mainMenuRoutes.map(
              ({ route, name, displayPageTitle, component }) => (
                <PrivateRoute
                  key={name}
                  exact
                  path={route}
                  name={name}
                  component={component}
                  displayPageTitle={displayPageTitle}
                />
              )
            )}
            <Route
              component={() => (
                <PublicLayout>
                  <Page404 />
                </PublicLayout>
              )}
            />
          </Switch>
        </ThemeProvider>
      </AuthHandler>
    </Router>
  );
}

export default App;
