import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountIcon from "@material-ui/icons/AccountBox";
import LogoutIcon from "@material-ui/icons/Launch";
import BeachIcon from "@material-ui/icons/BeachAccess";

import { logout } from "../../containers/services/auth-service";
import { Link } from "react-router-dom";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

export default function Usermenu(props) {
  function handleLogout(props) {
    logout().then(() => {
      props.setUser(null);
    });
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{
          color: "white"
        }}
      >
        <div>{<AccountIcon />} </div>
        <div
          style={{
            marginLeft: "10px"
          }}
        >
          Hello {localStorage.getItem("username")}
        </div>
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <BeachIcon />
          </ListItemIcon>
          <Link
            style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}
            to="/boards"
          >
            <ListItemText primary="My trips" />
          </Link>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <Link
            style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}
            onClick={() => handleLogout(props)}
            to="/"
          >
            <ListItemText primary="Log out" />
          </Link>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
