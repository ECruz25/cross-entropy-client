import React, { useContext, useState } from "react";
import { Grid, Drawer } from "@material-ui/core";
import UserContext from "../Context/UserContext";
import CreateUserForm from "./CreateUserForm";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { PersonAdd, AccountBox, Payment } from "@material-ui/icons";
import Users from "./Users";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

export default function Settings() {
  const { user } = useContext(UserContext);
  const [currentOption, setCurrentOption] = useState("");
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Drawer className={classes.drawer} variant="permanent" classes={{}}>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {[
            { text: "Crear Usuario", icon: <PersonAdd /> },
            { text: "Administracion de usuarios", icon: <AccountBox /> },
            { text: "Suscripcion", icon: <Payment /> }
          ].map((setting, index) => (
            <ListItem
              button
              key={setting.text}
              onClick={() => setCurrentOption(setting.text)}
            >
              <ListItemIcon>{setting.icon}</ListItemIcon>
              <ListItemText primary={setting.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {currentOption && currentOption === "Crear Usuario" && (
        <CreateUserForm companyUser={user}></CreateUserForm>
      )}
      {currentOption && currentOption === "Administracion de usuarios" && (
        <Users companyUser={user}></Users>
      )}
    </Grid>
  );
}
