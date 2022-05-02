import React, { useCallback, useContext , useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Alert from 'react-popup-alert';
import FenPop from '../Commun/FenetrePopUp';
import axios from 'axios';
import img from '../images/a.png';
import { UidContext, RoleUContext } from '../AppContexte';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
       USTHB
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  
  paper: {
    margin: theme.spacing(8, 4),
    marginTop:theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  image:{
    width:'400px',
    height:'450px',
    marginTop:theme.spacing(20),
    marginLeft:theme.spacing(25),
  },
  Formss:{
    width:'40%',
    marginTop:theme.spacing(-87),
    marginLeft:theme.spacing(110),
  }
}));

export default function SignInSide() {
  const classes = useStyles();
  const [response, setresponse] = React.useState('');
  const [OpenFen, SetOpenfen] = React.useState(false);
  const [alert, setAlert] = React.useState({
    type: 'error',
    text: 'This is a alert message',
    show: false
  })
 

  function onCloseAlert() {
    setAlert({
      type: '',
      text: '',
      show: false
    })
  }

  function onShowAlert(type) {
    setAlert({
      type: type,
      text: 'Demo alert',
      show: true
    })
  }

  const [idf, setMatricule] = React.useState('');
  const [mdp, setPassword] = React.useState('');

  const handleSeconnecter=(e)=>{
    e.preventDefault();
    console.log('on a sub')
    console.log('--------')
    console.log('matricul : ',idf);
    console.log('--------')
    console.log('NomUtilisateur : ',mdp);
    
    console.log('on go se connecte' );

    axios({
      method:"post",
      url:"http://localhost:5000/Utilisateur/connection",
      withCredentials: true,
      data:{
        idf,
        mdp,
       
      }
    }
    ).then((res)=>{
      if (res.status == 200) {
        if(res.data.role=="admin"){
          console.log('il a identifier que c admin');
          window.location = '/admin-page';
        //  this.history.router.push('/admin-page');
        }else{
          if(res.data.role=="Enseignant"){
            console.log('il a identifier que c enseignant');
            window.location = '/Enseignant-page';
          }else{
            if(res.data.role=="Etudiant"){
              console.log('il a identifier que c etudiant');
              window.location = '/Etudiant-page';
            }else{
              if(res.data.role=="Binome"){
                console.log('il a identifier que c binome');
                window.location = '/Binome-page';
              }
            }
          }
        }
        
      } else {
        if (res.status == 201) {
          setresponse('Numero IDF inconnu');
          console.log(response);
        }
        if (res.status == 202) {
          setresponse('Mot de passe incorrect');
          console.log(response);
        }
        if (res.status == 203) {
          setresponse('Enseignant non trouvé');
          console.log(response);
        }
        SetOpenfen(true);
      }
     
    })


  };
  return (
    
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      
      <img className={classes.image} src={img} alt = "Logo"/>
      <Grid  className={classes.Formss} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="IDF"
              name="IDF"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setMatricule(e.target.value) }
              value={idf}
            />
            <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             name="password"
             label="Password"
             type="password"
             id="password"
             autoComplete="current-password"
             onChange={(e)=>setPassword(e.target.value)}
             value={mdp}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSeconnecter}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link  onClick={() => {onShowAlert('error')}}  variant="body2" >
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
            <FenPop
              OpenFen={OpenFen}
              SetOpenfen={SetOpenfen}
              sujet=' Connection ! '
              message={response}
            />
          </form>
        </div>
      </Grid>
    </Grid>
    
  );
}