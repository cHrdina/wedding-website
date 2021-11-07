import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Header } from "./components/MainMenu/MainMenu";

import { mainMenuRoutes } from "./routes";
import { Box } from "@mui/system";

function App() {
  return (
    <Router>
      <Header />
      <Box
        sx={{
          height: "90vh",
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <Switch>
          {mainMenuRoutes.map(({ route, component }, key) => (
            <Route key={key} exact path={route} component={component} />
          ))}
        </Switch>
      </Box>
    </Router>
  );
}

export default App;
