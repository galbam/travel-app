import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "15vw"
  },
  input: {
    marginLeft: 8,
    flex: 1
  }
});

export default function SearchBar(props) {
  const handleChange = (event, props) => {
    const value = event.target.value;
    console.log(value);
    props.searchActivity(value);
  };

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <SearchIcon />
      <InputBase
        className={classes.input}
        placeholder="Search"
        onChange={e => handleChange(e, props)}
        type="search"
        name="search"
      />
    </Paper>
  );
}
