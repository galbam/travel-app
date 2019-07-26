import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
// import Icon from "@material-ui/core/Icon";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

export default class extends Component {
  state = {
    open: false,
    form: {
      type: "",
      title: "",
      description: "",
      imgUrl: ""
    }
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleChange = name => ({ target: { value } }) => {
    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    });
  };

  render() {
    const {
      open,
      form: { type, title, description, imgUrl }
    } = this.state;
    return (
      <Fragment>
        <Button variant="fab" color="primary" onClick={this.handleToggle}>
          <AddIcon />
        </Button>
        <Dialog
          open={open}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create a New Event</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please Fill out the Form Below
            </DialogContentText>
            <form>
              <TextField
                label="Title"
                value={title}
                onChange={this.handleChange("title")}
                margin="normal"
              />
              <br />
              <TextField
                multiline
                rows="4"
                label="Description"
                value={description}
                onChange={this.handleChange("description")}
                margin="normal"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span">
                Upload
                <CloudUploadIcon />
              </Button>
            </label>
            <Button onClick={this.handleToggle} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
        
      </Fragment>
    );
  }
}
