import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp({ history }) {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({});

  const onSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/api/v1/sign-up", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(formValues)
    });
    if (response.status === 202) {
      window.alert("Company associated");
      history.push("/sign-in");
    }
  };

  const onChange = (field, value) => {
    const newFormValues = {
      ...formValues,
      [field]: value
    };
    setFormValues(newFormValues);
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="company-name"
              label="Company Name"
              name="companyName"
              autoComplete="company_name"
              onChange={({ target: { name, value } }) => {
                onChange(name, value);
              }}
              value={formValues.companyName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={({ target: { name, value } }) => {
                onChange(name, value);
              }}
              value={formValues.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
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
              value={formValues.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="countryId"
              label="Id"
              id="id"
              autoComplete="company-id"
              onChange={({ target: { name, value } }) => {
                onChange(name, value);
              }}
              value={formValues.countryId}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              native
              label="Country"
              variant="outlined"
              fullWidth
              required
              name="country"
              onChange={({ target: { name, value } }) => {
                onChange(name, value);
              }}
              value={formValues.country}
            >
              <option aria-label="None" value="" />
              <option value={"Honduras"}>Honduras</option>
            </Select>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/sign-in" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
