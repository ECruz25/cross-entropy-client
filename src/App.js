import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Main from "./components/Main";
import NavBar from "./components/NavBar";
import InventoryDemand from "./components/InventoryDemand";
import Login from "./components/Login";
import "./App.css";
import "antd/dist/antd.css";
import withAuth from "./components/HOC/withAuth";
import TrainedModels from "./components/TrainedModels";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/entrenamientos" exact component={withAuth(Main)} />
          <Route
            path="/predicciones"
            exact
            component={withAuth(TrainedModels)}
          />
          <Route path="/login" exact component={Login} />
          <Route
            path="/entrenamientos/demanda-de-inventario"
            component={withAuth(InventoryDemand)}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
