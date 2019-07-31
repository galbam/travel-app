import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import Select from '@material-ui/core/Select';
// import Icon from "@material-ui/core/Icon";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const uuidv1 = require('uuid/v1');

export default class extends Component {
  state = {
    open: false,
    form: {
      type: "",
      title: "",
      description: "",
      expenses: 0
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

  handleSubmit = event => {
    event.preventDefault();

    const title = this.state.form.title;
    const description = this.state.form.description;
    const expenses = Number(this.state.form.expenses);    
    const type = this.state.form.type;
    const date = new Date();

    const newActivityInContainer = {
      _id: uuidv1(), title, date, description, expenses, type
    }
    
    this.props.refreshContainer(newActivityInContainer);
  }

  render() {
    const {
      open,
      form: { title, description, expenses, type }
    } = this.state;
    return (
      <Fragment>
        {/* variant="fab"   =>   is giving an error */}
        <Button color="primary" onClick={this.handleToggle}>
          <AddIcon />
        </Button>
        <Dialog
          open={open}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create Activity</DialogTitle>

          <form onSubmit={this.handleSubmit}>
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
              <br/>
              <InputLabel htmlFor="type">Activity type</InputLabel>
              <Select
                value={type}
                onChange={this.handleChange("type")}
                inputProps={{
                  name: 'type',
                  id: 'type',
                }}
              >
                <MenuItem value="transportation">Transportation</MenuItem>
                <MenuItem value="flight">Flight</MenuItem>
                <MenuItem value="accommodation">Accommodation</MenuItem>
                <MenuItem value="food">Food & Drinks</MenuItem>
                <MenuItem value="sightseeing">Sightseeing</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              <br/>
              <TextField 
                label="Expenses"
                rows="2"
                value={expenses}
                onChange={this.handleChange("expenses")}
                margin="normal"/>
              
          </DialogContent>

           <DialogActions>
            {/* <input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={this.handleChange("imageUrl")}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span">
                Upload
                <CloudUploadIcon />
              </Button>
            </label> */}
            
            <Button onClick={this.handleToggle} type="submit" color="primary">
              Create
            </Button>
          </DialogActions> 
          </form>
        
        </Dialog>
        
      </Fragment>
    );
  }
}
