import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import NavBar from '../Commun/NavBar';
import axios from 'axios';
import {useParams}from 'react-router';
import { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { UidContext, RoleUContext } from '../AppContexte';
import FenPop from '../Commun/FenetrePopUp';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" marginTop="theme.spacing(-40)" align="center">

    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(60),
    marginTop: theme.spacing(9),
    backgroundColor: theme.palette.primary.light,
  },

  title: {
    marginLeft: theme.spacing(50),
  },
  form1: {
    width: '30%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(5),
  },
  form2: {
    width: '50%',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(15),
  },
  form3: {
    width: '30%',
    marginTop: theme.spacing(-17),
    marginLeft: theme.spacing(95),
  },
  submit: {
    width: '40%',
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(35),
    borderRadius: theme.spacing(9)
  },
  formControl: {
    //margin: theme.spacing(2),
    marginLeft:theme.spacing(15),
    marginTop:theme.spacing(5),
    width: '50%', 
   minWidth: 120,
  },
  formControl2: {
    margin: theme.spacing(2),
    marginTop:theme.spacing(5),
    marginLeft:theme.spacing(15),
    width: '50%', 
    minWidth: 120,
  },
  description: {
    height: theme.spacing(4),
  },
  taux: {
    marginTop:theme.spacing(5),
    marginLeft:theme.spacing(0),
  },
  description2: {
    height: theme.spacing(4),
  },
  table: {
    width: '90%',
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(5),
  },
  tableH:{
   
    marginTop:theme.spacing(5),
  },
  Bouton1:{
       width: '30%',
       borderRadius:'500px',
      marginTop:theme.spacing(-52),
      marginLeft: theme.spacing(100),
  },
  Bouton2:{
    width: '30%',
    borderRadius:'500px',
   marginTop:theme.spacing(-38),
   marginLeft: theme.spacing(100),
},

Bouton3:{
    width: '30%',
    borderRadius:'500px',
   marginTop:theme.spacing(-22),
   marginLeft: theme.spacing(100),
},

Bouton4:{
  position:'absolute',
    width: '30%',
    borderRadius:'500px',
    background: theme.palette.error.dark,
   marginTop:theme.spacing(5),
   marginLeft: theme.spacing(-100),
},


}));

export default function ModifierSujet(params) {

  const classes = useStyles();
  const theme = useTheme();
  var searchTitle;
  const  {code}  = useParams();

  const [openNiveau, setOpenNiveau] = React.useState(false);
  const [titre, setTitreSujet] = React.useState('');
  const [taux, settaux] = React.useState('');
  const [themeSujet, setThemeSujet] = React.useState('B1');
  const [description, setDescription] = React.useState('');
  const [niveau, setNiveau] = React.useState('');
  const [themeSjt, setThemesjt] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [sujets, setSujet] = useState([]);
  const none = '------';

  const [response, setresponse] = React.useState('');
  const [OpenFen, SetOpenfen]=React.useState(false);
 


  const ModifierTitre = (e) => {
    //setGrade('A1')
    console.log('on a sub')
    console.log('--------')
   
    console.log('titre : ', titre);
    console.log('--------')
  
    

    console.log('on go sauvegardé le sujet ');

    axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/pageEnseignant/modifiersujet/ModifierTitre",
      withCredentials: true,
      data: {
        titre,
        code,
      }
    }).then((res) => {
      if (res.status == 200) {
        setresponse ('Titre correctement modifier')
        console.log(response);
  
      } else {
        if (res.status == 500) {
          setresponse ('Erreur de modification');
          console.log(response);
        } else {
          setresponse ('Erreur les champs sont mal renseigné ' + res.status.error);
          console.log(response);
        }

      }
      SetOpenfen(true);
    })


  };
  const ModifierDesc = (e) => {
    //setGrade('A1')
    console.log('on a sub')
    console.log('--------')
   
    console.log('titre : ', titre);
    console.log('--------')
  
    

    console.log('on go sauvegardé le sujet ');

    axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/pageEnseignant/modifiersujet/ModifierDescription",
      withCredentials: true,
      data: {
        description,
        code,
      }
    }).then((res) => {
      if (res.status == 200) {
        setresponse ('Description correctement modifier')
        console.log(response);
  
      } else {
        if (res.status == 500) {
          setresponse ('Erreur de modification');
          console.log(response);
        } else {
          setresponse ('Erreur les champs sont mal renseigné ' + res.status.error);
          console.log(response);
        }

      }
      SetOpenfen(true);
    })


  };
  const ModifierTaux = (e) => {
    //setGrade('A1')
    console.log('on a sub')
    console.log('--------')
   
    console.log('titre : ', titre);
    console.log('--------')
  
    

    console.log('on go sauvegardé le sujet ');

    axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/pageEnseignant/modifiersujet/ModifierTauxAvancement",
      withCredentials: true,
      data: {
        tauxAvancement:taux,
        code,
      }
    }).then((res) => {
      if (res.status == 200) {
        setresponse ('taux avancement correctement modifier')
        console.log(response);
  
      } else {
        if (res.status == 500) {
          setresponse ('Erreur de modification');
          console.log(response);
        } else {
          setresponse ('Erreur les champs sont mal renseigné ' + res.status.error);
          console.log(response);
        }

      }
      SetOpenfen(true);
    })


  };
  const SupprimerSujet = (e) => {
    //setGrade('A1')
    console.log('on a sub')
    console.log('--------')
   
    console.log('titre : ', titre);
    console.log('--------')
  
    

    console.log('on go supp le sujet ');

    axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/pageEnseignant/modifiersujet/SupprimerSujet",
      withCredentials: true,
      data: {
        code,
      }
    }).then((res) => {
      if (res.status == 200) {
        setresponse ('Sujet supprimé !!')
        console.log(response);
  
      } else {
        if (res.status == 250) {
          setresponse ('Erreur de suppression');
          console.log(response);
        } else {
          setresponse ('Erreur les champs sont mal renseigné ' + res.status.error);
          console.log(response);
        }

      }
      SetOpenfen(true);
    })


  };
  useEffect(() => {
    console.log("use effect");
    console.log(code);
 
    const GetInfo = async () => {
      /*console.log('on get les info')*/
      await axios({
        method: "get",
        url: "http://localhost:5000/Utilisateur/chekens",
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.status)
          if (res.status == (201)) { if( window.location.href !="http://localhost:3000/seConnecter") window.location.href ="/seConnecter" }
          })
        .catch((err) => { console.log('thardet', err);  })
    }
    
    GetInfo();

  }, [])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div >
          <Avatar className={classes.avatar}>
            <AccountCircleOutlined />
          </Avatar>
          <Typography className={classes.title} component="h1" variant="h5">
            Modifier votre sujet 
        </Typography>
          
          <form className={classes.form2} noValidate>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="text"
              label="Titre du sujet"
              type="text"
              id="text"
              
              onChange={(e) => setTitreSujet(e.target.value)}
              value={titre}
            />
            
            <TextField
              className={classes.description}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Description"
              label="Description"
              name="Description"
              autoFocus
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <TextField
            className={classes.taux}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="text"
              label="Taux d'avancement "
              type="text"
              id="text"
              
              onChange={(e) => settaux(e.target.value)}
              value={taux}
            />

            
          </form>
          
          <div >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.Bouton1}
            onClick={ModifierTitre}
          >
            Modifier Titre
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.Bouton2}
            onClick={ModifierDesc}
          >
            Modifier description
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.Bouton3}
            onClick={ModifierTaux}
          >
           Modifier Taux d'avancement
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
           // color="primary"
            className={classes.Bouton4}
            onClick={SupprimerSujet}
          >
           Supprimer le sujet
          </Button>
         
          </div>
          

         
        <FenPop 
          OpenFen={OpenFen} 
          SetOpenfen={SetOpenfen} 
          sujet=' Modification du sujet   '
           message={response} 
           />

          <Box mt={8}>
            <Copyright />
          </Box>
        </div>
      </main>

    </div>
  );
}