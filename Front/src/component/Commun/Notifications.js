import { React, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { UidContext, RoleUContext, UIDFContext } from '../AppContexte';
import axios from 'axios';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },

  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  avatar1: {
    width: theme.spacing(13),
    height: theme.spacing(13),
    marginLeft: theme.spacing(8),
    boxShadow: '2px 5px 5px black',

  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  divider: {
    marginTop: theme.spacing(5),
  },
  title2: {
    marginLeft: theme.spacing(11),
    marginTop: theme.spacing(2),
  },
  title3: {
    marginLeft: theme.spacing(7),
    marginTop: theme.spacing(2),
  },
  boutonD: {
    borderRadius: '80px',
    height: '50px',
    width: '170px',
    background: theme.palette.error.dark,
    marginTop: theme.spacing(7),
    marginLeft: theme.spacing(4),
  },
}));

export default function NavBar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();


  function NotifBouton(props) {

        return (
        <div>
          <IconButton aria-label="expand row" size="small" onClick={
            (e) => {
              <NavBar/>
            }}>
            <NotificationsIcon style={{ fontSize: "35px" }} />
          </IconButton>

        </div>
      );
     
  };

  
  const uid = useContext(UidContext);
  const role = useContext(RoleUContext);
  const idf = useContext(UIDFContext);
  const page = [];



  const drawer = (
    <div>
      
    </div>
  );

  //const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>

      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>


    </div>
  );
}
