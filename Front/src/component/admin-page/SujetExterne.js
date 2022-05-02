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
    marginTop: theme.spacing(-20),
    marginLeft: theme.spacing(50),
  },
  form3: {
    width: '30%',
    marginTop: theme.spacing(-17),
    marginLeft: theme.spacing(95),
  },
  submit: {
    width: '40%',
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(35),
    borderRadius: theme.spacing(9)
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  description: {
    height: theme.spacing(4),
  },
  description2: {
    height: theme.spacing(4),
  },
  table: {
    width: '80%',
    marginTop: theme.spacing(1),
  },
  tableH: {
    marginTop: theme.spacing(5),
  }

}));

export default function AjouSujetExterne() {

  const classes = useStyles();
  const theme = useTheme();

  const [OpenFen, SetOpenfen] = React.useState(false);
  const [response, setresponse] = React.useState('');


  const [themeSjt, setThemesjt] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleChange = (event) => {
    setThemesjt(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const [idfB, setBinome] = React.useState('');
  const [idf, setEnseignant] = React.useState('');
  const [titre, setTitreSujet] = React.useState('');
  const [themeSujet, setThemeSujet] = React.useState('B1');
  const [description, setDescription] = React.useState('');
  const [etablissment, setEtablissment] = React.useState('');
  //onst [email, setEmail] = React.useState('');
  //const [etablissement, setEtablissement] = React.useState('');

  var searchRes;
  const [Users, setUsers] = useState([]);

  const handleCreeSujetExterne = (e) => {
    //setGrade('A1')
    console.log('on a sub')
    console.log('--------')
    console.log('idfB : ', idfB);
    console.log('--------')
    console.log('idf : ', idf);
    console.log('--------')
    console.log('titre : ', titre);
    console.log('--------')
    console.log('themeSujet : ', themeSujet);
    console.log('--------')
    console.log('description : ', description);
    console.log('--------')
    console.log('etablissment : ', etablissment);

    console.log('on go sauvegardé le sujet ');

    if (idfB == "" || idf == "" || titre == "" || themeSujet == "" || description == "" || etablissment == "") {
      setresponse('Veuillez renseignez tout les champs !');
      SetOpenfen(true);
    } else {
      axios({
        method: "post",
        url: "http://localhost:5000/Utilisateur/pageAdmin/NewSujetExterne",
        withCredentials: true,
        data: {
          idfB,
          idf,
          titre,
          theme: themeSujet,
          description,
          etablissment,

        }
      }).then((res) => {
        if (res.status == 201) {
          setresponse('Sujet Externe creer avec succes')
          console.log(response);
        } else {
          if (res.status == 500) {
            setresponse('Sujet Externe non cree erreur lors de l enregistrement');
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

  const getUtilisateurs = async () => {

    await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/pageAdmin/TableauDeBord/Users",
      withCredentials: true,
      data: {
        response
      }
    }).then((res) => {
      console.log('les status : ' + res.status);
      if (res.status == 200) {
        //  setresponse ( 'On a nos enseignant')
        console.log(response);
        console.log(res.data)
        setUsers(res.data)
      } else {
        if (res.status == 400) {
          // setresponse ('Etudiant non cree erreur lors de l enregistrement');
          console.log(response);
        }

      }
    })
  }

  useEffect(() => {
    console.log('lid contexte : ', UidContext, ' son role : ', RoleUContext);
    console.log('dans le useeffcet ');
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
    getUtilisateurs()

  }, [])

  const Roles = (Users) => {
    var Roles = [];
    Users.forEach(element => {
      console.log('dans la boucle de sujets')
      if (element.role.role == 'Enseignant' || element.role.role == 'Binome') {
        Roles.push(element);
      }
    });

    return Roles;
  }

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
            Ajouter un sujet externe
        </Typography>
          <form className={classes.form1} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="matricule"
              label="*identificateur binome"
              name="matricule"
              autoComplete="matricule"
              autoFocus
              onChange={(e) => setBinome(e.target.value)}
              value={idfB}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name=""
              label="Identificateur Co-promoteur"
              type="text"
              id="text"
              onChange={(e) => setEnseignant(e.target.value)}
              value={idf}

            />


          </form>
          <form className={classes.form2} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="text"
              label="titre du sujet"
              type="text"
              id="text"
              autoComplete="text"
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
          <form className={classes.form3} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Etablissement"
              label="Etablissement"
              type="Etablissement"
              id="Etablissement"
              onChange={(e) => setEtablissment(e.target.value)}
              value={etablissment}
            />
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
            onClick={handleCreeSujetExterne}
          >
            Ajouter sujet
          </Button>

          <TableContainer component={Paper} className={classes.tableH} >
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>IDF</TableCell>
                  <TableCell align="center">Nom d'utilisateur</TableCell>
                  <TableCell align="center">Role</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {Roles(Users).filter((val) => {
                  /* if (searchRes == "") {
                     return val
                   } else if (val.Id == searchRes) {
                     return val
                   }*/
                  return val

                }).map((Users) => (
                  <TableRow key={Users.idf}>
                    <TableCell component="th" scope="row">{Users.idf}</TableCell>
                    <TableCell align="center">{Users.nomUtilisateur}</TableCell>
                    <TableCell align="center">{Users.role.role}</TableCell>


                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <FenPop
            OpenFen={OpenFen}
            SetOpenfen={SetOpenfen}
            sujet=' Creation du Sujet externe '
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