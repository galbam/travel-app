import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import {Link} from 'react-router-dom'


  const drawerWidth = 240;

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));
  
  export default function MiniDrawer() {
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
          style={{ background: "#eeeeee" }}
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              style={{color:"#494847"}}
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
        
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          open={open}
        >
          <div style={{ background: "#494847" }} className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List style={{ background: "#494847" }}>
            {/* {['Home', 'Planner', 'Things to do', 'Transportation', 'Accommodation', 'Packing List', 'Budget'].map((text, index) => ( */}
              <Link className="mylink" to="/">
              <ListItem button key='Home'>
                <ListItemIcon>{<InboxIcon style={{color: "white"}}/>}</ListItemIcon>
                <ListItemText primary='Home' />
              </ListItem>
              </Link>

              <Link className="mylink" to="/planner">
              <ListItem button key='Planner'>
                <ListItemIcon>{<InboxIcon style={{color: "white"}}/>}</ListItemIcon>
                <ListItemText primary='Planner' />
              </ListItem>
              </Link>

              <Link className="mylink" to="/thingstodo">
              <ListItem button key='Things to do'>
                <ListItemIcon>{<InboxIcon style={{color: "white"}}/>}</ListItemIcon>
                <ListItemText primary='Things to do' />
              </ListItem>
              </Link>

              <Link className="mylink" to="/transportation">
              <ListItem button key='Transportation'>
                <ListItemIcon>{<InboxIcon style={{color: "white"}}/>}</ListItemIcon>
                <ListItemText primary='Transportation' />
              </ListItem>
              </Link>

              <Link className="mylink" to="/accommodation">
              <ListItem button key='Accommodation'>
                <ListItemIcon>{<InboxIcon style={{color: "white"}}/>}</ListItemIcon>
                <ListItemText primary='Accommodation' />
              </ListItem>
              </Link>

              <Link className="mylink" to="/packinglist">
              <ListItem button key='Packing List'>
                <ListItemIcon>{<InboxIcon style={{color: "white"}}/>}</ListItemIcon>
                <ListItemText primary='Packing List' />
              </ListItem>
              </Link>

              <Link className="mylink" to="/budget">
              <ListItem button key='Budget'>
                <ListItemIcon>{<InboxIcon style={{color: "white"}}/>}</ListItemIcon>
                <ListItemText primary='Budget' />
              </ListItem>
              </Link>
            
          </List>
         
        </Drawer>
        
      </div>
    );
  }