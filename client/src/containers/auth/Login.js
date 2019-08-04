import React, { Component } from "react";
import { login } from "../services/auth-service";
import { googleLogin } from "../services/auth-service";
import { facebookLogin } from "../services/auth-service";
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

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    const { username, password } = this.state;
    event.preventDefault();

    login(username, password)
      .then(response => {
        if (response.data.message) {
          this.setState({ error: response.data.message });
        } else {
          localStorage.setItem("username", username);
          localStorage.setItem("userId", response.data._id);

          this.props.setUser(response.data);
          this.props.history.push("/");
        }
      })
      .catch(err => {
        this.setState({ err: err });
      });
  };

  responseFacebook = response => {
    //console.log(response);
    const { userId } = response;
    facebookLogin(userId)
      .then(response => {
        //console.log("here", response.data);
        //this.props.setUser(response.data);
        //this.props.history.push("/");
      })
      .catch(err => {
        this.setState({ err: err });
      });
  };

  responseGoogle = response => {
    //console.log(response.googleId);
    const { googleId } = response;
    googleLogin(googleId)
      .then(response => {
        //console.log("here", response.data);
        //this.props.setUser(response.data);
        //this.props.history.push("/");
      })
      .catch(err => {
        this.setState({ err: err });
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
            Log In
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
              Log In
            </Button>
          </form>
          <p>{this.state.error}</p>
          {/* <div style={{ display: "flex", flexDirection: "row" }}>
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
                  Log in via <br />
                  <i className="fab fa-facebook" />
                </Button>
              )}
            />
            <GoogleLogin
              clientId="617606078054-rc3kqkqtmfbumi8tuteufep6if17e8k2.apps.googleusercontent.com"
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
                  Log in via <br />
                  <i className="fab fa-google" />
                </Button>
              )}
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div> */}
          <br />
          <Grid container justify="flex-end">
            <Grid item>
              Not registered?
              <Link to="/signup"> Create an account</Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}
