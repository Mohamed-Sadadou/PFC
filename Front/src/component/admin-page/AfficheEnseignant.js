import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import NavBar from '../Commun/NavBar';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { red } from '@material-ui/core/colors';
import FenPop from '../Commun/FenetrePopUp';

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
    marginLeft: theme.spacing(68),
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
  },

  title: {
    marginLeft: theme.spacing(57),
  },
  form1: {
    width: '40%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(5),
    // dispaly: 'flex',
    //flexDirection: 'row',
  },

  form2: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(10),
    //dispaly: 'flex',
    //flexDirection: 'row',
  },
  form3: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(15),
    //dispaly: 'flex',
    //flexDirection: 'row',
  },
  niveau: {
    width: '30%',
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(25),
  },
  type: {
    width: '30%',
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(25),
  },
  them: {
    width: '30%',
    marginTop: theme.spacing(-15),
    marginLeft: theme.spacing(60),
  },
  specia: {
    width: '30%',
    marginTop: theme.spacing(-6),
    marginLeft: theme.spacing(60),
  },
  idf: {
    marginTop: theme.spacing(-7),
    marginLeft: theme.spacing(37),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  filter: {
    width: '700%'
  },
  button: {
    width: '35%',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(48),
    borderRadius: theme.spacing(9)
  },
  error: {
    backgroundColor: red[300]
  },
  table: {
    width: '1200px',
    minWidth: '1200px',
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(0),
  },
  disponibl: {
    width: '30%',
    marginTop: theme.spacing(-2),
    marginLeft: theme.spacing(5),
  }

}));

export default function AfficheEnseignant() {
  const [Enseignants, setEnseignants] = useState([]);
  const [Etudiants, setEtudiants] = useState([]);
  const [response, setresponse] = React.useState('');
  const [OpenFen, SetOpenfen] = React.useState(false);
  const classes = useStyles();
  const none = '------';
  const none1 = 'Aucun role assigné ';
  var filtres = [];
  var champs = [];
  const getEns = async () => {

    await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/TableauDeBord/Enseignant",
      withCredentials: true,

    }).then((res) => {
      if (res.status == 200) {
        setEnseignants(res.data)
      } else {
        if (res.status == 400) {
          console.log('souci');
        }

      }
    })
  }

  useEffect(() => {
    console.log("use effect");
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
    getEns();


  }, [])

  //************************************************* */
  const [section, setsection] = useState('')
  const [specialite, setspecialite] = useState('')
  const [niveau, setNiveau] = React.useState('');
  const [aBinome, setaBinome] = React.useState('');
  //************************************************* */
  const [openNiveau, setOpenNiveau] = React.useState(false);
  const [opensection, setOpensection] = React.useState(false);
  const [openspecialite, setOpenspecialite] = React.useState(false);
  const [openaBinome, setOpenaBinome] = React.useState(false);
  //**************************************************** */
  const handleCloseNiveau = () => {
    setOpenNiveau(false);
  };
  const handleOpenNiveau = () => {
    setOpenNiveau(true);
  };
  const handleClosespecialite = () => {
    setOpenspecialite(false);
  };
  const handleOpenspecialite = () => {
    setOpenspecialite(true);
  };
  const handleClosesection = () => {
    setOpensection(false);
  };
  const handleOpensection = () => {
    setOpensection(true);
  };
  const handleCloseaBinome = () => {
    setOpenaBinome(false);
  };
  const handleOpenaBinome = () => {
    setOpenaBinome(true);
  };
  //******************************************** */
  const handleRecherche = (e) => {



    if (setOpenNiveau && niveau != '') {
      console.log('on a le niveau selectionner ');
      filtres.push('grade');
      champs.push(niveau);

    }
    if (setOpenspecialite && specialite != '') {
      console.log('on a la specialite selectionner ');
      filtres.push('specialite');
      champs.push(specialite);

    }

    console.log('on a sub')
    console.log('--------')
    console.log('Compteur : ', filtres.length);
    console.log('--------')
    console.log('aBinome : ', aBinome);
    console.log('--------')
    console.log('section : ', section);
    console.log('--------')
    console.log('specialite : ', specialite);
    console.log('--------')
    console.log('niveau : ', niveau);

    //********************************************* */
    if (filtres.length == 0) {
      getEns();
      setresponse(' Voila tous les Etudiants ')
      SetOpenfen(true);
    } else {
      if (filtres.length == 1) {

        console.log('on a un filtre ', filtres[0], '--', champs[0]);
        axios({
          method: "post",
          url: "http://localhost:5000/Utilisateur/TableauDeBord/EnseignantF1",
          withCredentials: true,
          data: {
            filtre1: filtres[0],
            champ1: champs[0],

          }
        }).then((res) => {

          if (res.status == 200) {
            console.log('-----------------')
            console.log('-----------------')
            console.log(res.data[0].enseignant.length)
            if (res.data == null) { setresponse(' Aucun Enseignant Trouvé !!'); setEnseignants([]); }
            else { setresponse("Voici le resultat de la recherche "); setEnseignants(res.data); }
          } else {
            if (res.status == 201) {
              setresponse(' Aucun Enseignant Trouvé !!');
              console.log(response);
              setEnseignants([]);
            }

          }
          SetOpenfen(true);
        }).catch((err) => console.log("thardeeeet !!!!", err))
      } else {
        if (filtres.length == 2) {

          console.log('on a un filtre ', filtres[0], '--', champs[0]);
          axios({
            method: "post",
            url: "http://localhost:5000/Utilisateur/TableauDeBord/EnseignantF2",
            withCredentials: true,
            data: {
              filtre1: filtres[0],
              champ1: champs[0],
              filtre2: filtres[1],
              champ2: champs[1],

            }
          }).then((res) => {
            if (res.status == 200) {
              console.log('-----------------')
              console.log('-----------------')
              console.log(res.data[0].enseignant.length)
              if (res.data== null) { setresponse(' Aucun Enseignant Trouvé !!'); setEnseignants([]); }
              else { setresponse("Voici les resultats de la recherche"); setEnseignants(res.data); }
            } else {
              if (res.status == 201) {
                setresponse(' Aucun Enseignant Trouvé !!');
                console.log(response);
                setEnseignants([]);
              }

            }
            SetOpenfen(true);
          })
        } else {
          getEns();
          setresponse(' Voila tous les Enseignant ')
          SetOpenfen(true);
        }
      }
    }
  }

  function Roles(props) {
    var Roles = props.roles
    if(Roles.length==0){
      return (

        <TableBody>
          <TableCell >{none1}</TableCell>
        </TableBody>
  
      );
    }else{
      return (

        <TableBody>
          {Roles.filter((val) => {
            if (true) return val;
  
  
          }).map((Roles, index) => (
            <TableRow key={Roles.role}>
              <TableCell component="th" scope="row">{Roles.role||none}</TableCell>
              <TableCell >{Roles.detail||none}</TableCell>
  
  
  
            </TableRow>
          ))}
        </TableBody>
  
      );
    }
    
  }
  //************************************************* */
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
            Visualiser les enseignants
              </Typography>

          <form className={classes.form2} noValidate>

            <FormControl className={classes.niveau}>
              <InputLabel id="demo-controlled-open-select-label">Grade</InputLabel>
              <Select className={classes.chek}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openNiveau}
                onClose={handleCloseNiveau}
                onOpen={handleOpenNiveau}
                value={niveau}
                onChange={(e) => { setNiveau(e.target.value); setOpenNiveau(true);handleCloseNiveau(); }}
                value={niveau}
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

          <form className={classes.form3} noValidate>

            <FormControl className={classes.specia}>
              <InputLabel id="demo-controlled-open-select-label">Spécialité</InputLabel>
              <Select className={classes.chek}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openspecialite}
                onClose={handleClosespecialite}
                onOpen={handleOpenspecialite}
                value={specialite}
                onChange={(e) => { setspecialite(e.target.value); setOpenspecialite(true);handleClosespecialite(); }}
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
          </form>

          <Button
            className={classes.button}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRecherche}
          >
            Search
                  </Button>

        </div>

        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell >IDF</TableCell>
                <TableCell align="center">Nom Enseignant</TableCell>
                <TableCell align="center">Grade</TableCell>
                <TableCell align="center">Specialité</TableCell>
                <TableCell align="center">Numero</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Roles / Specialité</TableCell>
                <TableCell align="center">Etablissement</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Enseignants.filter((val) => {
                if (val.enseignant.length != 0) {
                  return val
                } else {
                  return null
                }
                var dispo
                // console.log('les sujet avant la table : ', sujets);


              }).map((Enseignants, index) => (
                <TableRow key={Enseignants.idf || index}>
                  <TableCell component="th" scope="row" >{Enseignants.idf || none}</TableCell>
                  <TableCell align="center">{Enseignants.nomUtilisateur || none}</TableCell>
                  <TableCell align="center">{Enseignants.enseignant[0].grade || none}</TableCell>
                  <TableCell align="center" >{Enseignants.enseignant[0].specialite || none}</TableCell>
                  <TableCell align="center">{Enseignants.enseignant[0].numero || none}</TableCell>
                  <TableCell align="center">{Enseignants.enseignant[0].email}</TableCell>
                  <TableCell align="center"><Roles roles={Enseignants.enseignant[0].roles} /></TableCell>
                  <TableCell align="center">{Enseignants.enseignant[0].etablissement || none}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <FenPop
          OpenFen={OpenFen}
          SetOpenfen={SetOpenfen}
          sujet=' Affichage Enseignant '
          message={response}
        />
      </main>
    </div>

  );

  //******************************************** */
}