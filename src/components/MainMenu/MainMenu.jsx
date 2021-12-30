import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { mainMenuRoutes } from "../../routes";
import { MobileMenu } from "../MobileMenu/MobileMenu";

const useStyles = makeStyles((theme) => ({
  navbar: {
    whiteSpace: "nowrap",
    backgroundColor: "white",
    color: "black",
    border: "none",
    boxShadow: "none",
    marginBottom: theme.spacing(4),
    cursor: "arrow",
  },
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    flexGrow: "1",
    cursor: "pointer",
    fontFamily: "Bayshore",
    fontSize: "3rem",
  },
  link: {
    textDecoration: "none",
    fontSize: "1.5rem",
    marginLeft: theme.spacing(10),
    color: "black",
    "&:hover": {
      borderBottom: "1px solid black",
    },
  },
}));

export const Header = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        <Typography className={classes.logo}>M{" & "}C</Typography>
        {isMobile ? (
          <MobileMenu />
        ) : (
          <div className={classes.navlinks}>
            {mainMenuRoutes
              .filter((route) => !route.isPublic)
              .map(({ name, route }, key) => (
                <Link
                  key={key}
                  className={`${classes.link}${
                    pathname === route ? " link-active" : ""
                  }`}
                  to={route}
                >
                  {name}
                </Link>
              ))}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};
