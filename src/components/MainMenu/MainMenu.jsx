import {
  AppBar,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Link,
  Box,
  Grid,
  Container,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { mainMenuRoutes } from "../../routes";
import { MobileMenu } from "../MobileMenu/MobileMenu";

export const Header = () => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "background.paper", color: "text.primary" }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="logo"
            noWrap
            component="div"
            sx={{ pr: 2, display: "flex" }}
          >
            M{" & "}C
          </Typography>
          {isMobile ? (
            <MobileMenu />
          ) : (
            <Box>
              <Grid container spacing={4}>
                {mainMenuRoutes
                  .filter((route) => !route.isPublic)
                  .map(({ name, route }, key) => (
                    <Grid item>
                      <Link
                        sx={{
                          color: "text.primary",
                          textDecoration: "none",
                          fontWeight: pathname === route ? 600 : 400,
                        }}
                        variant="body1"
                        key={key}
                        // className={`${
                        //   pathname === route ? " link-active" : ""
                        // }`}
                        href={route}
                      >
                        {name}
                      </Link>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
