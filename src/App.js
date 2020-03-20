import React, { createContext } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { blueGrey } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Navbar from "./components/Controls/Navbar";
import SignUp from "./components/Controls/SignUp";
import SignIn from "./components/Controls/SignIn";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Box, useMediaQuery } from "@material-ui/core";
import Copyright from "./components/Controls/Copyright";
import Settings from "./components/Settings/Settings";
import withAuth from "./components/HOC/withAuth";
import { UserProvider } from "./components/Context/UserContext";
import Main from "./components/Training/Main";
import Results from "./components/Results";
import "antd/dist/antd.css";
import TrainedModels from "./components/Training/TrainedModels";
import InventoryDemand from "./components/Training/InventoryDemand/InventoryDemand";

const UserContext = createContext();

export default function App() {
  const user = { name: "Tania", loggedIn: true };

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#2196f3"
          }
        }
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar></Navbar>
        <Container component="main" maxWidth="sm" style={{ marginTop: 20 }}>
          <CssBaseline />
          <Switch>
            <UserProvider>
              <Route path="/entrenamientos" exact component={withAuth(Main)} />
              <Route path="/resultados" exact component={withAuth(Results)} />
              <Route
                path="/predicciones"
                exact
                component={withAuth(TrainedModels)}
              />
              <Route path="/sign-up" exact component={SignUp} />
              <Route path="/sign-in" exact component={SignIn} />
              <Route
                path="/configuraciones"
                exact
                component={withAuth(Settings)}
              />
              <Route
                path="/entrenamientos/demanda-de-inventario"
                component={withAuth(InventoryDemand)}
              />
            </UserProvider>
          </Switch>
        </Container>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Router>
    </ThemeProvider>
  );
}
