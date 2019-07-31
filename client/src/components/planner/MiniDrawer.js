import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Usermenu from "./Usermenu";

//Icons
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CalendarIcon from "@material-ui/icons/DateRange";
import HotelIcon from "@material-ui/icons/Hotel";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import CommuteIcon from "@material-ui/icons/Commute";
import WorkIcon from "@material-ui/icons/Work";
import MoneyIcon from "@material-ui/icons/AttachMoney";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { Link } from "react-router-dom";

//Routes
import { Route } from "react-router-dom";
import ThingsToDo from "../../containers/ThingsToDo";
import Planner from "../../containers/Planner";
import Transportation from "../../containers/Transportation";
import Accommodation from "../../containers/Accommodation";
import PackingList from "../../containers/PackingList";
import Budget from "../../containers/Budget";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: "100vh"
  }
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ background: "#1bacbf" }}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            style={{ color: "#494847" }}
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "90vw"
            }}
          >
            <img className="logo" src="/images/logo.png" alt="logo" />

            <Usermenu setUser={props.setUser} />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div style={{ background: "#494847" }} className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>

        <List
          style={{
            background: "#494847",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100vh"
          }}
        >
          {/* {['Home', 'Planner', 'Things to do', 'Transportation', 'Accommodation', 'Packing List', 'Budget'].map((text, index) => ( */}
          <div>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/planner"
            >
              <ListItem button key="Planner">
                <ListItemIcon>
                  {<CalendarIcon style={{ color: "white" }} />}
                </ListItemIcon>
                <ListItemText primary="Planner" />
              </ListItem>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/thingstodo"
            >
              <ListItem button key="Things to do">
                <ListItemIcon>
                  {<PhotoCameraIcon style={{ color: "white" }} />}
                </ListItemIcon>
                <ListItemText primary="Things to do" />
              </ListItem>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/transportation"
            >
              <ListItem button key="Transportation">
                <ListItemIcon>
                  {<CommuteIcon style={{ color: "white" }} />}
                </ListItemIcon>
                <ListItemText primary="Transportation" />
              </ListItem>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/accommodation"
            >
              <ListItem button key="Accommodation">
                <ListItemIcon>
                  {<HotelIcon style={{ color: "white" }} />}
                </ListItemIcon>
                <ListItemText primary="Accommodation" />
              </ListItem>
            </Link>
          </div>

          <div>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/packinglist"
            >
              <ListItem button key="Packing List">
                <ListItemIcon>
                  {<WorkIcon style={{ color: "white" }} />}
                </ListItemIcon>
                <ListItemText primary="Packing List" />
              </ListItem>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/budget"
            >
              <ListItem button key="Budget">
                <ListItemIcon>
                  {<MoneyIcon style={{ color: "white" }} />}
                </ListItemIcon>
                <ListItemText primary="Budget" />
              </ListItem>
            </Link>

            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              <ListItem button key="Home">
                <ListItemIcon>
                  {<HomeIcon style={{ color: "white" }} />}
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
          </div>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Route exact path="/planner" component={Planner} />
        <Route exact path="/thingstodo" component={ThingsToDo} />
        <Route exact path="/transportation" component={Transportation} />
        <Route exact path="/accommodation" component={Accommodation} />
        <Route exact path="/packinglist" component={PackingList} />
        <Route exact path="/budget" component={Budget} />
      </main>
    </div>
  );
}
