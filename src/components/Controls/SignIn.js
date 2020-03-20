import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Cookie from "js-cookie";
import UserContext from "../Context/UserContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
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

export default function SignIn({ history }) {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({});
  const [showLoginError, setShowLoginError] = useState(false);
  const [signInError, setSignInError] = useState("");
  const { setUser } = useContext(UserContext);

  const onChange = (field, value) => {
    const newFormValues = {
      ...formValues,
      [field]: value
    };
    setFormValues(newFormValues);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/auth", {
      method: "POST",
      body: JSON.stringify({
        email: formValues["email"],
        password: formValues["password"]
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const token = await response.json();
    if (response.status === 200) {
      history.push("/");
      const userResponse = await fetch("/api/v1/get-user", {
        method: "POST",
        body: JSON.stringify({
          email: formValues["email"]
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const user = await userResponse.json();
      setUser(user);
      Cookie.set("token", token.access_token);
      Cookie.set("user", formValues.email);
      history.push("/entrenamientos");
    } else {
      setSignInError(token.description);
      setShowLoginError(true);
    }
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email1"
          autoFocus
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
          autoComplete="current-password"
          onChange={({ target: { name, value } }) => {
            onChange(name, value);
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container justify="flex-end">
          <Link href="sign-up" variant="body2">
            {"No tienes cuenta? Crea una."}
          </Link>
        </Grid>
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
          severity="error"
        >
          {signInError}
        </Alert>
      </Snackbar>
    </div>
  );
}
