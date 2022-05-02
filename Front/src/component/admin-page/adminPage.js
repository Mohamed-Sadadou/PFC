import React, { useContext,useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from "../Commun/NavBar";
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import { blue } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import { Link } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import SubjectOutlined from '@material-ui/icons/SubjectOutlined';
import { UidContext, RoleUContext } from '../AppContexte';
//const {height,width}=useWindowDimension();

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.blue,
      },
    },
  },
}))(MenuItem);
const useStyles = makeStyles((theme) => ({

  root: {

    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(25),
      height: theme.spacing(25),
    },
  },
  all: {
    backgroundColor: blue[100],
    height: '100%',
    paddingBottom: theme.spacing(10),
  },
  paper1: {
    backgroundColor: blue[50],
    marginLeft: theme.spacing(55),
    width: 240,
    height: 380,
    marginTop: theme.spacing(10),
  },

  paper: {
    backgroundColor: blue[50],
    marginLeft: theme.spacing(3),
    width: 240,
    height: 380,
    marginTop: theme.spacing(10),
  },
  title: {
    fontSize: '1rem',
    marginLeft: theme.spacing(4),
    '@media (min-width:600px)': {
      fontSize: '1.4rem',
    },
    align: 'center',
    marginTop: theme.spacing(3),

  },
  title2: {
    fontSize: '0.25rem',
    marginLeft: theme.spacing(5),
    '@media (min-width:600px)': {
      fontSize: '1.3rem',
      align: 'center',
    },
    align: 'center',
    marginTop: theme.spacing(3),


  },
  title3: {
    fontSize: '1rem',
    marginLeft: theme.spacing(3),
    '@media (min-width:600px)': {
      fontSize: '1.3rem',
    },
    align: 'center',
    marginTop: theme.spacing(2.5),


  },
  button: {
    marginTop: theme.spacing(20),
    marginLeft: theme.spacing(2.8),
    height: theme.spacing(5),
    backgroundColor: blue[300],
  },
  buttonT: {
    marginTop: theme.spacing(-160),
    marginLeft: theme.spacing(157),
    height: theme.spacing(9),
    width:theme.spacing(20),
    borderRadius:theme.spacing(20),
    backgroundColor: blue[500],
  },
  button1: {
    marginTop: theme.spacing(20),
    marginLeft: theme.spacing(7.3),
    height: theme.spacing(5),
    backgroundColor: blue[300],
  },
  button2: {
    marginTop: theme.spacing(20),
    marginLeft: theme.spacing(7.3),
    height: theme.spacing(5),
    backgroundColor: blue[300],
  },
  backgd: {
   
    backgroundColor: blue[100],
    height: '100%',
    height: 'max-height',
  },
  blue: {
    height: 80,
    width: 80,
    backgroundColor: '#fff',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(10),
  },
  blue2: {
    height: 65,
    width: 65,
    backgroundColor: '#fff',
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(0),
  },
}));

export default function MainAdminPage() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  console.log(window.innerWidth);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const uid = useContext(UidContext);
  const role = useContext(RoleUContext);
  console.log('lid du context : ' + uid);
  console.log('le role du context : ' + role);


  useEffect(() => {
   
    const GetInfo = async () => {
      /*console.log('on get les info')*/
      await axios({
        method: "get",
        url: "http://localhost:5000/Utilisateur/chekadm",
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.status)
          if (res.status == (201)) { if( window.location.href !="http://localhost:3000/seConnecter") window.location.href ="/seConnecter" }
          })
        .catch((err) => { console.log('thardet', err);  })
    }
    GetInfo();

  }, []);

  return (
    <div className={classes.all}>
      <NavBar />
      <div className={classes.backgd}>
        <div className={classes.root}>
          <Paper className={classes.paper1} elevation={20} >
            <Avatar className={classes.blue}>
              <AccountCircleOutlined className={classes.blue2}/>
            </Avatar>

            <div  >
              <Typography className={classes.title}> créer les comptes</Typography>
              <div>
                <Button
                  color="primary"
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                  className={classes.button}>
                  choisir l'utilisateur
              </Button>
                <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >

                  <StyledMenuItem><ListItem button component={Link} to="/CreateEns"> <ListItemText primary="Enseignant" /></ListItem></StyledMenuItem>
                  <StyledMenuItem><ListItem button component={Link} to="/CreateEtd"> <ListItemText primary="Etudiant" /></ListItem></StyledMenuItem>
                  <StyledMenuItem><ListItem button component={Link} to="/DesigneResponsableSpecialite"><ListItemText primary="Responsable de spécialité" /></ListItem> </StyledMenuItem>
                  <StyledMenuItem><ListItem button component={Link} to="/DesigneMembreJury"><ListItemText primary="Membre de jury" /></ListItem></StyledMenuItem>
                </StyledMenu>
              </div>
            </div>
          </Paper>
          <Paper className={classes.paper} elevation={20} >
            <Avatar className={classes.blue}>
              <SubjectOutlined className={classes.blue2}/>
            </Avatar>
            <Typography className={classes.title2}>
              Ajouter un sujet
        </Typography>
            <Button component={Link} to="/AjouterSujetExterne" className={classes.button1}>Selectionner</Button>
          </Paper>
          <Paper className={classes.paper} elevation={20} >
            <Avatar className={classes.blue}>
              <SubjectOutlined className={classes.blue2}/>
            </Avatar>
            <Typography onClick={handleClick} className={classes.title3}>
              Visualiser les sujets
        </Typography>
            <Button component={Link} to="/VisualiserSujet" className={classes.button2}>Selectionner</Button>
          </Paper>
          <div className={classes.paper3} >

          </div>
          <div className={classes.paper3} />
        </div>
        <Button component={Link} to="/TableauDeBord" className={classes.buttonT}> Tableau De Bord </Button>
      </div>
    </div>
  );
}