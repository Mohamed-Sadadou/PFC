import { React, useContext, useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/Person';
import Home from '@material-ui/icons/Home';
import { Link } from "react-router-dom";
import { UidContext, RoleUContext, UIDFContext,UserNameContext,EnsRolesConext } from '../AppContexte';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { IconButton } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CheckCircleOutLineIcon from '@material-ui/icons/CheckCircleOutline'


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
   // background:'linear-gradient(to bottom right, #0277BD,#03A9F4)',
   // backgroundColor: blue[50],
    boxShadow: '2px 0px 10px black',
  },
  avatar1: {
    width: theme.spacing(16),
    height: theme.spacing(16),
    marginLeft: theme.spacing(6),
    color:'black',
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
    marginLeft: theme.spacing(7.5),
    marginTop: theme.spacing(2),
    //color:'white',
  },
  title3: {
    marginLeft: theme.spacing(7.5),
    marginTop: theme.spacing(2),
    //1color:'white',
  },
  boutonD: {
    borderRadius: '80px',
    height: '50px',
    width: '170px',
    background: theme.palette.error.dark,
    marginTop: theme.spacing(7),
    marginLeft: theme.spacing(4),
  },
  cloche: {
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(50),
  },
  items:{
    color:'white',
  }
}));

export default function NavBar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [Notifications, SetNotifications] = useState([]);
  const [NewNotification, setnewnotif] = useState(false);
  const [bloc, setbloc] = useState(null);
  const [switcher, setswitch] = useState(false);


  const getNotifications = async () => {

    await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/Notification",
      withCredentials: true,
      data: {
        idf: idf,
        role:role,
        id:uid,
      }

    }).then((res) => {
      console.log('les status : ' + res.status);
      if (res.status == 200) {
        console.log(res.data)
        SetNotifications(res.data)

      } else {
        if (res.status == 400) {

        }
      }
    })
  }

  const VuNotif = async (idd,Destinataire) => {

   if(role=='Enseignant'){ if(Roles.includes('responsable de specialite')){
      Destinataire='responsable';
    }}
    await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/VuNotif",
      withCredentials: true,
      data: {
        id: idd,
        Destinataire:Destinataire,
      }

    }).then((res) => {
      console.log('les status : ' + res.status);
      if (res.status == 200) {
        console.log(res.data)
        SetNotifications(res.data)

      } else {
        if (res.status == 400) {

        }
      }
    })
  }

  function NotifBouton(props) {

    

    console.log('------------------------------')
    console.log('LA NEW NOTIFICATION : ', NewNotification)
    console.log('------------------------------')
    if (NewNotification===false) {
      return (
        <div>
          <IconButton aria-label="expand row" size="small" onClick={
            (e) => {
              if (role != 'admin') {
                if (switcher) setswitch(false);
                else setswitch(true);
                setnewnotif(false);
              }
            }}>
            <NotificationsIcon style={{ fontSize: "35px" }} />
          </IconButton>

        </div>
      );

    } else {
      if (NewNotification===true) {
        return (
          <div>
            <IconButton aria-label="expand row" size="small" onClick={
              (e) => {
                if (role != 'admin') {
                  console.log('le booleen : ', NewNotification);
                  if (switcher) setswitch(false);
                  else setswitch(true);
                  setnewnotif(false);
                }
              }}>
              <NotificationsActiveIcon style={{ fontSize: "35px" }} />
            </IconButton>

          </div>
        );
      }else{
        return ( 
          <div>

          </div>
        );
      }
    }
  };

  function VuBouton(props) {

    return (
      <IconButton aria-label="expand row" size="small" onClick={(e) => {
        VuNotif(props.id,props.Destinataire);
        <CheckCircleIcon style={{ fontSize: "25px" }} />
      }}>
        <CheckCircleIcon style={{ fontSize: "25px" }} />
      </IconButton>
    );
  };

  const NewNotif = async (Notifs) => {
    console.log('dans le NewNotif ',Notifs.length);
    var n = true;
    var i = 0;
    while (i < Notifs.length ) {
      console.log('dans la boucle NewNotif ',( Notifs[i].Destinataire == idf || Notifs[i].Destinataire == role) );
      if (!Notifs[i].Etat &&( Notifs[i].Destinataire == idf || Notifs[i].Destinataire == role) ) {
        
        return true;
      }
      i++;
    }
    return false;
  }
  //const [mobileOpen, setMobileOpen] = React.useState(false);
  const uid = useContext(UidContext);
  const role = useContext(RoleUContext);
  const idf = useContext(UIDFContext);
  const nameuser = useContext(UserNameContext);
  const Roles = useContext(EnsRolesConext);
  const page = [];
   var valeur;
  if (role == 'admin') {
    page.push('/admin-page');
    page.push('/profil');
    page.push('/deconnection');
  }
  if (role == 'Enseignant') {
    page.push('/Enseignant-page');
    page.push('/profil');
    page.push('/deconnection');
  }
  if (role == 'Etudiant') {
    page.push('/Etudiant-page');
    page.push('/profil');
    page.push('/deconnection');
  }
  if (role == 'Binome') {
    page.push('/Binome-page');
    page.push('/profil');
    page.push('/deconnection');
  }



  function handleDeconnection() {
    console.log("DECONNECTION");

    axios({
      method: "get",
      url: "http://localhost:5000/Utilisateur/deconnection",
      withCredentials: true,

    }
    ).then(() => {
      console.log('ON SE DECONNECTE NOOOOW');
      //<link to='/'/>

    })
  }
  useEffect(() => {
 
    const stuff = async () => {
      if (idf != null && role != 'admin') {
        await getNotifications().then(async function () { 
           valeur= await NewNotif(Notifications).then((result)=>{console.log('LEEE REEESUUULTAAAT ',result);setnewnotif(result)})
        });

  console.log('le bool de notif ,', NewNotification);
  setbloc(true);
}

    }
stuff();
console.log('use effect de navbar')

  }, [idf])

function DDrawer(props) {
  console.log('leeeeeeeeeeee drawer');
  if (!switcher) {
    return (<div>
      <NotifBouton className={classes.cloche} Notifications={Notifications} />
      <div className={classes.toolbar} />

      <Avatar className={classes.avatar1}>{role}</Avatar>
      <Divider className={classes.divider} />
      <Typography className={classes.title2}>
        {nameuser}
      </Typography>
      <Typography className={classes.title3}>
        {idf}
      </Typography>
      <Divider className={classes.divider} />

      <List>
        {['Home', 'Profil'].map((text, index) => (
          <ListItem className={classes.items} button key={text} component={Link} to={page[index]}  >
            <ListItemIcon>
              {index === 0 && <Home />}
              {index === 1 && <Person />}
            </ListItemIcon>
            <ListItemText primary={text} />

          </ListItem>

        ))}
        <Button className={classes.boutonD}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={(e) => { handleDeconnection(); }}
          component={Link} to={'/seConnecter'}
        >
          Deconnection
                    </Button>
      </List>

      <Divider />
    </div>);
  } else {
    return (
      <div>
        <div>
          <NotifBouton Notifications={Notifications} />
        </div>

        <div>
          <TableContainer component={Paper} className={classes.tableH} >
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell >Notification</TableCell>
                  <TableCell width={'10px'} align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Notifications.filter((val) => {
                  if (!val.Etat) return val;
                }).map((Notifications, index) => (
                  <TableRow key={Notifications._id}>
                    <TableCell component="th" scope="row">{Notifications.Contenu}</TableCell>
                    <TableCell align="center"><VuBouton id={Notifications._id} Destinataire={Notifications.Destinataire} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }

};

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
          {DDrawer()}
        </Drawer>
      </Hidden>
    </nav>


  </div>
);
}
