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
import EditIcon from '@material-ui/icons/Edit'


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
    marginLeft: theme.spacing(55),
    marginTop: theme.spacing(9),
    backgroundColor: theme.palette.primary.light,
  },

  title: {
    marginLeft: theme.spacing(40),
  },
  form1: {
    width: '30%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(5),
  },
  form2: {
    width: '30%',
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
    marginLeft: theme.spacing(70),
    marginTop: theme.spacing(-18),
    width: '20%',
    minWidth: 120,
  },
  formControl2: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(-5),
    marginLeft: theme.spacing(70),
    width: '20%',
    minWidth: 120,
  },
  description: {
    height: theme.spacing(4),
  },
  description2: {
    height: theme.spacing(4),
  },
  table: {
    width: '90%',
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(5),
  },
  tableH: {

    marginTop: theme.spacing(5),
  }

}));

export default function AjouSujetExterne() {

  const classes = useStyles();
  const theme = useTheme();
  var searchTitle;

  const [openNiveau, setOpenNiveau] = React.useState(false);
  const [titre, setTitreSujet] = React.useState('');
  const [themeSujet, setThemeSujet] = React.useState('B1');
  const [description, setDescription] = React.useState('');
  const [niveau, setNiveau] = React.useState('');
  const [themeSjt, setThemesjt] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [sujets, setSujet] = useState([]);
  const none = '------';

  const [response, setresponse] = React.useState('');
  const [OpenFen, SetOpenfen] = React.useState(false);
  const handleChange = (event) => {
    setThemesjt(event.target.value);
  };

  const handleChangeNiveau = (event) => {
    setNiveau(event.target.value);
    console.log(event.target.value);
    let valueNiveau = event.target.value;
    setNiveau(valueNiveau);


  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseNiveau = () => {
    setOpenNiveau(false);
  };
  const handleOpenNiveau = () => {
    setOpenNiveau(true);
  };


  //onst [email, setEmail] = React.useState('');
  //const [etablissement, setEtablissement] = React.useState('');

  var searchRes;
  const [Users, setUsers] = useState([]);

  const handleCreeSujetInterne = (e) => {
    //setGrade('A1')
    console.log('on a sub')
    console.log('--------')

    console.log('titre : ', titre);
    console.log('--------')
    console.log('themeSujet : ', themeSujet);
    console.log('--------')
    console.log('description : ', description);
    console.log('--------')
    console.log('niveau : ', niveau);

    console.log('on go sauvegardé le sujet ');

    if (titre == "" || themeSujet == "" || description == "" || niveau == "") {
      setresponse('Veuillez renseignez tout les champs !');
      SetOpenfen(true);
    } else {
      axios({
        method: "post",
        url: "http://localhost:5000/Utilisateur/pageEnseignant/ProposerSujet",
        withCredentials: true,
        data: {

          titre,
          theme: themeSujet,
          description,
          niveau,

        }
      }).then((res) => {
        if (res.status == 201) {
          setresponse('Sujet Interne creer avec succes')
          console.log(response);
          getSujet();
        } else {
          if (res.status == 500) {
            setresponse('Sujet Interne non cree erreur lors de l enregistrement');
            console.log(response);
          } else {
            setresponse('Erreur les champs sont mal renseigné ' + res.status.error);
            console.log(response);
          }

        }
        SetOpenfen(true);
      })
    }


  };

  const getSujet = async () => {

    await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/pageEnseignant/TableauDeBord/Sujet",
      withCredentials: true,
      data: {
        response
      }
    }).then((res) => {
      if (res.status == 200) {
        //response = 'On a nos sujet'
        console.log(response);
        console.log(res.data)
        setSujet(res.data)
      } else {
        if (res.status == 400) {
          // response = 'Erreurs !!!!';
          console.log(response);
        }

      }
    })
  }

  const Dispo = (val) => {
    console.log('le val : ', val);
    if (val) { return 'Pris' } else { return 'Disponible' }
  }
  useEffect(() => {
    console.log("use effect");
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
    getSujet();


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
            Ajouter un sujet Interne
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


          </form>
          <form noValidate>
            <FormControl className={classes.formControl2}>
              <InputLabel id="demo-controlled-open-select-label">Niveau</InputLabel>
              <Select className={classes.chek}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openNiveau}
                onClose={handleCloseNiveau}
                onOpen={handleOpenNiveau}
                value={niveau}
                onChange={(e) => { setNiveau(e.target.value); setOpenNiveau(true); handleCloseNiveau(); }}
                value={niveau}
              >
                <MenuItem value="">
                </MenuItem>

                <MenuItem value="L3">L3</MenuItem>

                <MenuItem value="M2">M2</MenuItem>

              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">Thème</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={themeSjt}
                onChange={(e => { setThemeSujet(e.target.value); handleClose(); })}
                value={themeSujet}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value={'Application Mobile'}>Application Mobile</MenuItem>
                <MenuItem value={'Inteligence Artificiel'}>Inteligence Artificiel</MenuItem>
                <MenuItem value={'Application Web'}>Application Web</MenuItem>
                <MenuItem value={'Base de données'}>Base de données</MenuItem>
                <MenuItem value={'Recherches'}>Recherches</MenuItem>
              </Select>
            </FormControl>

          </form>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleCreeSujetInterne}
          >
            Ajouter sujet
          </Button>

          <TableContainer component={Paper} className={classes.table}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell >Code</TableCell>
                  <TableCell align="center">Titre</TableCell>
                  <TableCell align="center">Theme</TableCell>
                  <TableCell align="center"> Niveau</TableCell>

                  <TableCell align="center">Type</TableCell>
                  <TableCell align="center">Etablissment</TableCell>
                  <TableCell align="center">Specialité</TableCell>
                  <TableCell align="center">Disponibilité</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sujets.map((sujets) => (
                  <TableRow key={sujets.sujet.code}>
                    <TableCell component="th" scope="row" >{sujets.sujet.code || none}</TableCell>
                    <TableCell align="center" >{sujets.sujet.titre || none}</TableCell>
                    <TableCell align="center">{sujets.sujet.theme || none}</TableCell>
                    <TableCell align="center">{sujets.sujet.niveau || none}</TableCell>
                    <TableCell align="center">{sujets.sujet.typeSujet || none}</TableCell>
                    <TableCell align="center">{sujets.etablissment || sujets.universite}</TableCell>
                    <TableCell align="center">{sujets.Specialite || none}</TableCell>
                    <TableCell align="center">{Dispo(sujets.sujet.pris)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <FenPop
            OpenFen={OpenFen}
            SetOpenfen={SetOpenfen}
            sujet=' Proposition de sujet  '
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