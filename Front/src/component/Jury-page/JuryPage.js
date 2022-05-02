import React, { useContext } from 'react';
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
    marginTop: theme.spacing(11.4),
    marginLeft: theme.spacing(7.5),
    height: theme.spacing(5),
    backgroundColor: blue[300],
  },
  button1: {
    marginTop: theme.spacing(16),
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
  return (
    <div className={classes.all}>
      <NavBar />
      <div className={classes.backgd}>
        <div className={classes.root}>
          <Paper className={classes.paper1} elevation={20} >
            <Avatar className={classes.blue}>
              <SubjectOutlined className={classes.blue2}/>
            </Avatar>

            <div  >
              <Typography className={classes.title}> Visualisé les fiches d'evaluation d'un sujet </Typography>
              <Button component={Link} to="/VisualiserFiches" className={classes.button}>Selectionner</Button>
            </div>
          </Paper>
          <Paper className={classes.paper} elevation={20} >
            <Avatar className={classes.blue}>
              <SubjectOutlined className={classes.blue2}/>
            </Avatar>
            <Typography className={classes.title2}>
            Remplire une fiche D'evaluation
            </Typography>
            <Button component={Link} to="/AjouterFicheEvaluation" className={classes.button1}>Selectionner</Button>
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
      </div>
    </div>
  );
}