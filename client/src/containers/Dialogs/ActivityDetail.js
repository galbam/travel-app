import React, { Component, Fragment } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import AddIcon from "@material-ui/icons/Add";
import Select from '@material-ui/core/Select';
// import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';

class ActivityDetail extends Component {
  state = {
    open: false,
    form: {
      type: "",
      title: this.props.activity.title,
      description: this.props.activity.description,
      imgUrl: "",
      expenses: 0,
      bgcolor: ""
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
      form: { title, description, expenses, bgcolor }
    } = this.state;

    return (
      <Fragment>
        <Link onClick={this.handleToggle}>
          {this.props.children}
        </Link>
        <Dialog
          open={open}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
        >

          <DialogTitle id="form-dialog-title">Update Activity</DialogTitle>
          <form>
            <DialogContent>
              <TextField
                label="Title"
                value={title}
                onChange={this.handleChange("title")}
                margin="normal"
              />
              <br />
              <TextField
                multiline
                rows="2"
                label="Description"
                value={description}
                onChange={this.handleChange("description")}
                margin="normal"
              />
              <br />
              <TextField
                label="Expenses"
                value={expenses}
                onChange={this.handleChange("expenses")}
                margin="normal" />
              <br />
              <InputLabel htmlFor="color-simple">Color</InputLabel>
              <Select
                value={bgcolor}
                onChange={this.handleChange("bgcolor")}
                inputProps={{
                  name: 'bgcolor',
                  id: 'color-simple',
                }}
              >
                <MenuItem value="red">Red</MenuItem>
                <MenuItem value="yellow">Yellow</MenuItem>
                <MenuItem value="blue">Blue</MenuItem>
                <MenuItem value="gray">Gray</MenuItem>
                <MenuItem value="skyblue">Sky Blue</MenuItem>
              </Select>
            </DialogContent>
  
          </form>

        </Dialog>

      </Fragment>
    )
  }
}

export default ActivityDetail;
