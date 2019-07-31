import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import AddIcon from "@material-ui/icons/Add";
import Select from "@material-ui/core/Select";
// import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Link from "@material-ui/core/Link";


class ActivityDetail extends Component {
  state = {
    open: false,
    form: {
      type: this.props.activity.type,
      id: this.props.activity._id,
      title: this.props.activity.title,
      description: this.props.activity.description,
      expenses: this.props.activity.expenses
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

  handleDelete = event => {
    event.preventDefault();
    const _id = this.state.form.id;  

    this.props.deleteActivity(_id);
    this.setState({
      open: !this.state.open
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const _id = this.state.form.id;
    const title = this.state.form.title;
    const description = this.state.form.description;
    const expenses = Number(this.state.form.expenses);
    const type = this.state.form.type;

    const updatedActivity = {
      _id,
      title,
      description,
      expenses,
      type
    };

    this.props.updateActivity(updatedActivity);
  };

  render() {
    const {
      open,
      form: { title, description, expenses, type }
    } = this.state;

    return (
      <div >
        <Link
          onClick={this.handleToggle}
          style={{color:'white'}}
        >
      {this.state.form.title} 
      </Link> 
      
        <Dialog
          open={open}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Activity</DialogTitle>
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
               <br />
              <InputLabel htmlFor="type">Activity type</InputLabel>
              <Select
                value={type}
                onChange={this.handleChange("type")}
                inputProps={{
                  name: "type",
                  id: "type"
                }}
              >
                <MenuItem value="transportation">Transportation</MenuItem>
                <MenuItem value="accommodation">Accommodation</MenuItem>
                <MenuItem value="food">Food & Drinks</MenuItem>
                <MenuItem value="sightseeing">Sightseeing</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              <br />
              <TextField
                label="Expenses"
                value={expenses}
                onChange={this.handleChange("expenses")}
                margin="normal"
              />
              <br />
            </DialogContent>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button onClick={this.handleToggle} type="submit" color="primary">
                Update
              </Button>
              <Button onClick={this.handleDelete} type="submit" color="primary">
                Delete
              </Button>
            </div>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default ActivityDetail;
