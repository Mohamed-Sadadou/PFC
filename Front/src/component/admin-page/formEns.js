import React, { useEffect, useState } from 'react';
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
import FenPop from '../Commun/FenetrePopUp';
import NavBar from '../Commun/NavBar';
import axios from 'axios';



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
    marginLeft: theme.spacing(70),
    marginTop: theme.spacing(9),
    backgroundColor: theme.palette.primary.light,
  },

  title: {
    marginLeft: theme.spacing(55),
  },
  form1: {
    width: '40%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(5),
  },
  form2: {
    width: '40%',
    marginTop: theme.spacing(-40),
    marginLeft: theme.spacing(70),

  },
  submit: {
    width: '40%',
    marginTop: theme.spacing(6),
    marginLeft: theme.spacing(35),
    borderRadius: theme.spacing(9)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  specialite: {
    width: '400px',
    marginTop: theme.spacing(-40),
    marginLeft: theme.spacing(80),
  },
  numero: {
    width: '400px',
    marginTop: theme.spacing(-30.5),
    marginLeft: theme.spacing(80),
  },
  etablissement: {
    width: '400px',
    marginTop: theme.spacing(-24),
    marginLeft: theme.spacing(80),
  },
  grade: {
    width: '400px',
    marginTop: theme.spacing(-16),
    marginLeft: theme.spacing(80),
  },


}));

export default function CreateEns(props) {

  const classes = useStyles();
  const theme = useTheme();

  const [OpenFen, SetOpenfen] = React.useState(false);
  //const [grade, setGrade] = React.useState('G1');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setGrade(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const [etablissement, setetablissement] = useState('')
  const [idf, setIdf] = React.useState('');
  const [mdp, setPassword] = React.useState('');
  const [nomUtilisateur, setNomUtilisateur] = React.useState('');
  const [grade, setGrade] = React.useState('B1');
  const [numero, setNumero] = React.useState('');
  const [specialite, setspecialite] = useState('')
  const [email, setEmail] = React.useState('');

  const [openspecialite, setOpenspecialite] = React.useState(false);
  const [response, setresponse] = React.useState('');
  const [openetablissement, setOpenetablissement] = React.useState(false);
  const handleClosespecialite = () => {
    setOpenspecialite(false);
  };
  const handleOpenspecialite = () => {
    setOpenspecialite(true);
  };
  const handleCloseetablissement = () => {
    setOpenetablissement(false);
  };
  const handleOpenetablissement = () => {
    setOpenetablissement(true);
  };

  const handleCreeEns = (e) => {


    if (idf == " " || mdp == "" || nomUtilisateur == "" || email == "" || specialite == "" || numero == "" || etablissement == "" || grade == "") {
      setresponse('Veuillez renseignez tout les champs !');
      SetOpenfen(true);
    } else {
      console.log('on a sub')
      console.log('--------')
      console.log('matricul : ', idf);
      console.log('--------')
      console.log('NomUtilisateur : ', nomUtilisateur);
      console.log('--------')
      console.log('grade : ', grade);

      console.log('on go sauvegardé enseignant');

      axios({
        method: "post",
        url: "http://localhost:5000/Utilisateur/pageAdmin/CreeCompteEnseignant",
        withCredentials: true,
        data: {
          idf,
          mdp,
          nomUtilisateur,
          email,
          specialite,
          numero,
          etablissement,
          grade
        }
      }).then((res) => {
        if (res.status == 201) {
          setresponse('Enseignant : ' + nomUtilisateur + ' identifié : ' + idf + ' creer avec succes')

          console.log(response);
        } else {
          if (res.status == 206) {
            setresponse('Enseignant non cree erreur lors de l enregistrement');
            console.log(response);
          } else {
            console.log(res.data);
            setresponse (res.data.errors.IDF +res.data.errors.MDP +res.data.errors.email  );
            console.log(res.data.errors)
          }

        }
        SetOpenfen(true);
      })
    }


  };

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
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar}>
          <Avatar className={classes.avatar}>
            <AccountCircleOutlined />
          </Avatar>
          <Typography className={classes.title} component="h1" variant="h5">
            Créer le compte Enseignant
        </Typography>
          <form className={classes.form1} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Identificateur"
              label="Identificateur"
              name="Identificateur"
              autoComplete="Identificateur"
              autoFocus
              onChange={(e) => setIdf(e.target.value)}
              value={idf}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={mdp}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="text"
              label="Nom et prenom"
              type="text"
              id="text"
              autoComplete="text"
              onChange={(e) => setNomUtilisateur(e.target.value)}
              value={nomUtilisateur}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Email"
              label="email"
              type="email"
              id="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

          </form>
          <form noValidate>
            <FormControl className={classes.specialite} >
              <InputLabel id="demo-controlled-open-select-label">Spécialité</InputLabel>
              <Select className={classes.chek}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openspecialite}
                onClose={handleClosespecialite}
                onOpen={handleOpenspecialite}
                value={specialite}
                onChange={(e) => { setspecialite(e.target.value); setOpenspecialite(true); handleClosespecialite(); }}
                value={specialite}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value={'Application Mobile'}>Application Mobile</MenuItem>
                <MenuItem value={'Inteligence Artificiel'}>Inteligence Artificiel</MenuItem>
                <MenuItem value={'Application Web'}>Application Web</MenuItem>
                <MenuItem value={'Base de données'}>Base de données</MenuItem>
                <MenuItem value={'Reseaux'}>Reseaux</MenuItem>
                <MenuItem value={'Recherches'}>Recherches</MenuItem>

              </Select>
            </FormControl>
            <TextField className={classes.numero}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Numero de telephone"
              label="Numero de telephone"
              type="Numero de telephone"
              id="Numero de telephone"
              autoComplete="Numero de telephone"
              onChange={(e) => setNumero(e.target.value)}
              value={numero}
            />
            <FormControl className={classes.etablissement} >
              <InputLabel id="demo-controlled-open-select-label">etablissement</InputLabel>
              <Select className={classes.chek}

                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openetablissement}
                onClose={handleCloseetablissement}
                onOpen={handleOpenetablissement}
                value={etablissement}
                onChange={(e) => { setetablissement(e.target.value); setOpenetablissement(true); handleCloseetablissement(); }}
                value={etablissement}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value='USTHB'>USTHB</MenuItem>
                <MenuItem value='Externe'>Externe</MenuItem>


              </Select>
            </FormControl>
            <FormControl className={classes.grade}>
              <InputLabel id="demo-controlled-open-select-label">Grade</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                onChange={(e => { setGrade(e.target.value); handleClose(); })}
                value={grade}

              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value={'Maitre Assistant B'}>Maitre Assistant B</MenuItem>
                <MenuItem value={'Maitre Assistant A'}>Maitre Assistant A</MenuItem>
                <MenuItem value={'Maitre de conference B'}>Maitre de conference B</MenuItem>
                <MenuItem value={'Maitre de conference A'}>Maitre de conference A</MenuItem>
                <MenuItem value={'Professeur'}>Professeur</MenuItem>
              </Select>
            </FormControl>
          </form>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleCreeEns}
          >
            créer compte
          </Button>
          <FenPop OpenFen={OpenFen} SetOpenfen={SetOpenfen} sujet=' Creation du compte Enseignant ' message={response} />

          <Box mt={8}>
            <Copyright />
          </Box>
        </div>
      </main>

    </div>
  );
}