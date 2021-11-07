import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  useTheme,
  useMediaQuery,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { mainMenuRoutes } from "../../routes";
import { MobileMenu } from "../MobileMenu/MobileMenu";

const useStyles = makeStyles((theme) => ({
  navbar: {
    whiteSpace: "nowrap",
    // paddingLeft: theme.spacing(20),
    // paddingRight: theme.spacing(20),
    backgroundColor: "white",
    color: "black",
    border: "none",
    boxShadow: "none",
  },
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    fontSize: "20px",
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
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          M{" & "}C
        </Typography>
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
