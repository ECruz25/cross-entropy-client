import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Select, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function CreateUserForm({ companyUser, history }) {
  const [user, setUser] = useState({
    type: "Admin"
  });
  const classes = useStyles();
  const [showLoginError, setShowLoginError] = useState(false);
  const [isError, setIsError] = useState(false);
  const [signUpError, setSignUpError] = useState("");

  const onChange = (field, value) => {
    const newUser = {
      ...user,
      [field]: value
    };
    setUser(newUser);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/api/v1/create-user", {
      method: "POST",
      body: JSON.stringify({ ...user, company_id: companyUser.id }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    debugger;

    if (response.status === 200) {
    } else if (response.status === 202) {
      setSignUpError("Usuario creado");
      setShowLoginError(true);
      setIsError(false);
    } else {
      setSignUpError(`${response.status}: ${response.statusText}`);
      setShowLoginError(true);
      setIsError(true);
    }
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Crear Usuario
      </Typography>
      <form
        className={classes.form}
        noValidate
        onSubmit={onSubmit}
        autocomplete="off"
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoFocus
          autocomplete="off"
          onChange={({ target: { name, value } }) => {
            onChange(name, value);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={({ target: { name, value } }) => {
            onChange(name, value);
          }}
        />
        <Select
          native
          label="Type"
          variant="outlined"
          fullWidth
          required
          name="type"
          onChange={({ target: { name, value } }) => {
            onChange(name, value);
          }}
        >
          {companyUser && companyUser.type === "Owner" && (
            <option value={"Admin"}>Administrador</option>
          )}
          <option value={"Regular"}>Regular</option>
        </Select>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
      </form>
      <Snackbar
        open={showLoginError}
        autoHideDuration={6000}
        onClose={() => {
          setShowLoginError(false);
        }}
      >
        <Alert
          onClose={() => {
            setShowLoginError(false);
          }}
          severity={isError ? "error" : "success"}
        >
          {signUpError}
        </Alert>
      </Snackbar>
    </div>
  );
}
