import React, { Component } from "react";
import { signup } from "../services/auth-service";
import { googleSignup } from "../services/auth-service";
import { facebookSignup } from "../services/auth-service";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";
//style
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const divStyle = {
  marginTop: "30%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  handleSubmit = event => {
    const { username, password } = this.state;

    event.preventDefault();

    signup(username, password)
      .then(response => {
        localStorage.setItem("username", username);
        // console.log(response.data)
        if (response.data.errorMessage) {
          this.setState({ error: response.data.errorMessage });
        } else {
          this.props.setUser(response.data);
          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ err: err });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  responseFacebook = response => {
    const { userId } = response;
    facebookSignup(userId).then(response => {
      this.props.setUser(response.data);
      this.props.history.push("/");
    });
  };

  responseGoogle = response => {
    const { googleId } = response;
    googleSignup(googleId).then(response => {
      this.props.setUser(response.data);
      this.props.history.push("/");
    });
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={divStyle}>
          <Avatar style={{ backgroundColor: "rgb(73,72,71)" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ margin: "2%" }}>
            Sign up
          </Typography>

          <form onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="text"
                  name="username"
                  id="username"
                  label="username"
                  autoComplete="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="password"
                  name="password"
                  id="password"
                  label="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "3%", backgroundColor: "rgb(27,172, 191)" }}
            >
              Sign Up
            </Button>
          </form>
          <p>{this.state.error}</p>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <FacebookLogin
              appId="2511839425504211"
              fields="name,email,picture"
              callback={this.responseFacebook}
              render={renderProps => (
                <Button
                  onClick={renderProps.onClick}
                  type="submit"
                  fullWidth
                  variant="outlined"
                  color="primary"
                  style={{ marginTop: "3%", marginRight: "2%" }}
                >
                  Sign up via <br />
                  <i className="fab fa-facebook" />
                </Button>
              )}
            />
            <GoogleLogin
              clientId="617606078054-dtd6r3bkt33mbsb436f2fip2g5b62h62.apps.googleusercontent.com"
              render={renderProps => (
                <Button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  type="submit"
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  style={{ marginTop: "3%" }}
                >
                  Sign up via <br />
                  <i className="fab fa-google" />
                </Button>
              )}
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
          <br />
          <Grid container justify="flex-end">
            <Grid item>
              Already have an account?
              <Link to="/login"> Log in</Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}
