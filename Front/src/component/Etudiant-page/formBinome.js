import React from 'react';
import { useState, useContext, useEffect } from 'react';
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
import { UidContext, RoleUContext, UIDFContext, UserNameContext } from '../AppContexte';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import FenPop from '../Commun/FenetrePopUp';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import { array } from 'prop-types';



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
    width: '35%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(15),
  },
  form2: {
    width: '40%',
    marginTop: theme.spacing(-20),
    marginLeft: theme.spacing(65),
  },
  submit: {
    width: '40%',
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(35),
    borderRadius: theme.spacing(9)
  },
  formControl: {
    //margin: theme.spacing(1),
    width: '20%',
    marginTop: theme.spacing(-22),
    marginLeft: theme.spacing(72),
    minWidth: 120,
  },
  formControl2: {
    width: '20%',
    marginTop: theme.spacing(-8),
    marginLeft: theme.spacing(72),
    minWidth: 120,
  },
  tableH: {

    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(-2),
  },


}));

export default function CreateBinome(props) {

  const classes = useStyles();
  const theme = useTheme();
  
  const uid = useContext(UidContext);
  const role = useContext(RoleUContext);
  const idfcontexte = useContext(UIDFContext);
  const username = useContext(UserNameContext);
  const [Droit, setDroit] = React.useState(true);
  const [niveau, setNiveau] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);



  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };



  const handleCloseSpecialite = () => {
    setOpen1(false);
  };

  const handleOpenSpecialite = () => {
    setOpen1(true);
  };

  function AffectButton(props) {
    return (
      <IconButton aria-label="expand row" size="small" onClick={(e) => {
        if (Droit) {
          //console.log("les props ", props.Binome, props.etd2); 
          ValiderBinome(props.Binome, props.etd2)
        } else {
          //pop up
          setresponse2('Vous etes deja present dans un compte binome validé vous ne pouvez pas etre dans deux Compte binomes ');
          SetOpenfen2(true);
        }
      }}>
        <AddCircleIcon style={{ fontSize: "35px" }} />
      </IconButton>
    );
  }

  const [idf, setMatricule] = React.useState('');
  const [mdp, setPassword] = React.useState('');
  const [nomUtilisateur, setNomUtilisateur] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [specialite, setSpecialite] = React.useState('');
  const [section, setSection] = React.useState('');
  const [groupe, setGroupe] = React.useState('');
  const [Binomes, setBinomes] = useState([]);
  const [LeBinome, setLeBinome]= useState('');
  const [response, setresponse] = React.useState('');
  const [OpenFen, SetOpenfen] = React.useState(false);


  const [response2, setresponse2] = React.useState('');
  const [OpenFen2, SetOpenfen2] = React.useState(false);

  const handleCreeBinome = (e) => {


    console.log('on a sub')
    console.log('--------')
    console.log('matricul : ', idf);

    console.log('--------')
    console.log('Niveau : ', niveau);

    console.log('on go sauvegardé Compte Binome');

    axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/pageEtudiant/Binome/CreeCompteBinome",
      withCredentials: true,
      data: {
        idf1: idfcontexte,
        idf2: idf,
        specialite: specialite,
        niveau: niveau,
        mdp: mdp,
      }
    }).then((res) => {
      getBinome();
      if (res.status == 201) {
        setresponse(' Binome : Etudiant 1 : ' + idfcontexte + ' Etudiant 2 : ' + idf + ' creer avec succes ! ')
        console.log('la reponse de la fonction ; ', response);
        console.log('la reponse du Back ; ', res.data.message);
      } else {
        if (res.status == 400) {
          setresponse(' Binome non cree erreur lors de l enregistrement ');
          console.log(response);
        }
        if (res.status == 401) {
          setresponse(' Binome non cree le deuxieme etudiant est inexistant ');
          console.log(response);
        }
        if (res.status == 500) {
          setresponse(' Erreur serveur ');
          console.log(response);
        }

      }
      SetOpenfen(true);
    })



  };

  const getBinome = async () => {

    console.log('!!!!!!!!!');

    await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/TableauDeBord/GetmesBinome",
      withCredentials: true,

    }).then((res) => {
      console.log('-------------- reeeees ------------------', res.status);
      if (res.status == 200) {
        //set = 'On a nos enseignant'
        //console.log(response);
        //  console.log(res.data)
        setBinomes(res.data)
      } else {
        if (res.status == 400) {
          //response = 'Etudiant non cree erreur lors de l enregistrement';
          setDroit(false);
          console.log('dans get Droit : ', Droit)
        }

      }
    })
  }

  useEffect(() => {

    const GetInfo1 = async () => {
      /*console.log('on get les info')*/
      await axios({
        method: "get",
        url: "http://localhost:5000/Utilisateur/cheketd",
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.status)
          if (res.status == (201)) { if( window.location.href !="http://localhost:3000/seConnecter") window.location.href ="/seConnecter" }
          })
        .catch((err) => { console.log('thardet', err);  })
    } 
    GetInfo1();

    console.log('on va get le binome');
    const GetInfo = async () => { getBinome() }
    GetInfo();
    if (!Droit) {
      setresponse2(' Vous avez deja un Binome validé vous ne pouvez ni creer ni valider de nouveau compte binome ! ');
      SetOpenfen2(true);
    }

  }, [])

  const dispo = (val) => {
    if (val) {
      return 'Validé'
    } else {
      return 'Non Validé'
    }
  }

  const MesBinome = (Binomes, idf) => {
    console.log('Droit : ', Droit)
    var mesBinome = [];
   // var idfbinomes=[];
    var i = 0;
    while (i < Binomes.length && Droit) {
      console.log('dans boucle Droit : ', Droit)
      if (idf == Binomes[i].etudiant2[0].idf) {
        mesBinome.push(Binomes[i]);
       // idfbinomes.push(Binomes[i].idf)
      }
      if (dispo(Binomes[i].valide) == 'Validé' && idf == Binomes[i].etudiant2[0].idf || dispo(Binomes[i].valide) == 'Validé' && idf == Binomes[i].etudiant1[0].idf) {
        console.log(' dans if Droit : ', Droit)
        setDroit(false);
      }
      i++;
    }

    //setAutre(idfbinomes);
    return mesBinome;

  }

  const AutresBinomes = (Binomes,Binome,etd2,etd1) => {
    console.log('Droit : ', Droit)
    console.log('LEEEE BINOMMMMME ,',Binome)
    var lesBinome = [];
   // var idfbinomes=[];
    var i = 0;
    while (i < Binomes.length) {
      console.log('le boollll , ',Binomes[i].etudiant1[0].idf,' ', etd1,' ', Binomes[i].etudiant1[0].idf,' ', etd2,Binomes[i].etudiant2[0].idf,' ', etd1 ,' ', Binomes[i].etudiant2[0].idf ,' ', etd2);
      console.log('le boollll , ',((Binomes[i].etudiant1[0].idf == etd1 || Binomes[i].etudiant1[0].idf == etd2)|| (Binomes[i].etudiant2[0].idf == etd1 || Binomes[i].etudiant2[0].idf == etd2)));
      if ( Binomes[i].idf != Binome && dispo(Binomes[i].valide) !== 'Validé' && ((Binomes[i].etudiant1[0].idf == etd1 || Binomes[i].etudiant1[0].idf == etd2)|| (Binomes[i].etudiant2[0].idf == etd1 || Binomes[i].etudiant2[0].idf == etd2))) {
        lesBinome.push(Binomes[i].idf);
      }   
      i++;
    }
    return lesBinome;
  }

  const MonBinome = (idf, idf1, idf2) => {


    if (idf == idf1) {
      return idf2;
    } else {
      return idf1;
    }



  }

  const SupprimerAutres = async(Binome,etd2,etd1)=>{
    var lesBinomes = AutresBinomes(Binomes,Binome,etd1,etd2);
    console.log('ces fameux Binomes ', lesBinomes);

    await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/pageBinome/SupprimerBinomes",
      withCredentials: true,
      data: {
        autres:lesBinomes,
        

      }
    }).then(console.log('cool')).catch((err)=>{console.log(err)});
  }

  const ValiderBinome = async (Binome, etd2) => {
    console.log('les parametres   ', Binome, etd2)
   // console.log('les binomes : ',autresBinomes);
   setLeBinome(Binome);
    var BinomeParIdf, SujetCode;
    await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/pageBinome/ValideCompteBinome",
      withCredentials: true,
      data: {
        etudiant2: etd2,
        idfB: Binome,
        

      }
    }).then(async (res) => {

      console.log('les status : ' + res.status);
      if (res.status == 200) {
        setresponse('Binomes : ' + Binome + ' Correctement Validé Vous pouvez vous connecter et postuler pour des sujets !')
        console.log(response);
        console.log(res.data)
       
        getBinome()
        
      } else {
        if (res.status == 400) {
          setresponse('Binome non Validé');
          console.log(response);
        }
        if (res.status == 402) {
          setresponse('Binome deja postulant ');
          console.log(response);
        }
        if (res.status == 500) {
          setresponse('Erreur lors de l ajout ');
          console.log(response);
        }

      }
      SetOpenfen(true);
      await SupprimerAutres(Binome,etd2,idfcontexte)
    })
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
            Créer le compte Binome
        </Typography>
          <form className={classes.form1} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="matricule"
              label="Matricule"
              name="matricule"
              autoComplete="matricule"
              autoFocus
              onChange={(e) => setMatricule(e.target.value)}
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



          </form>
          <form noValidate>
            <FormControl className={classes.formControl2}>
              <InputLabel id="demo-controlled-open-select-label">Specialite</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open1}
                onClose={handleCloseSpecialite}
                onOpen={handleOpenSpecialite}
                value={specialite}
                onChange={(e) => { setSpecialite(e.target.value);handleCloseSpecialite(); }}
              >
                <MenuItem value="">
                </MenuItem>

                <MenuItem value={'ISIL'}>ISIL</MenuItem>

                <MenuItem value={'ACAD'}>ACAD</MenuItem>

                <MenuItem value={'GTR'}>GTR</MenuItem>
              </Select>
            </FormControl>


            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">Niveau</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={niveau}
                onChange={(e) => { setNiveau(e.target.value);handleCloseSpecialite(); }}
              >
                <MenuItem value="">
                </MenuItem>

                <MenuItem value={'L3'}>L3</MenuItem>

                <MenuItem value={'M2'}>M2</MenuItem>
              </Select>
            </FormControl>
          </form>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              if (idfcontexte == idf) {
                setresponse2(' Vous Ne pouvez pas etre binome avec vous meme ! ');
                SetOpenfen2(true);
              } else {
                console.log('le Droit : ', Droit);
                if (Droit) { handleCreeBinome() }
                else {
                  setresponse2(' Vous avez deja un Binome validé vous ne pouvez ni creer ni valider de nouveau compte binome ! ');
                  SetOpenfen2(true);
                }
              }
            }}
          >
            créer compte
          </Button>

          <div>
            <TableContainer component={Paper} className={classes.tableH} >
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>IDF Binome</TableCell>
                    <TableCell align="center">Etudiant 1</TableCell>
                    <TableCell align="center">Etudiant 2</TableCell>
                    <TableCell align="center">Specialite</TableCell>
                    <TableCell align="center">validité</TableCell>
                    <TableCell align="center">Affectation</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {MesBinome(Binomes, idfcontexte).map((Binomes, index) => (
                    <TableRow key={Binomes.idf}>
                      <TableCell component="th" scope="row">{Binomes.idf}</TableCell>
                      <TableCell align="center">{Binomes.etudiant1[0].nomUtilisateur}</TableCell>
                      <TableCell align="center">{Binomes.etudiant2[0].nomUtilisateur}</TableCell>
                      <TableCell align="center">{Binomes.specialite}</TableCell>
                      <TableCell align="center">{dispo(Binomes.valide)}</TableCell>
                      <TableCell align="center"><AffectButton Binome={Binomes.idf} etd2={MonBinome(idfcontexte, Binomes.etudiant1[0].idf, Binomes.etudiant2[0].idf)} /></TableCell>


                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <FenPop
              OpenFen={OpenFen}
              SetOpenfen={SetOpenfen}
              sujet=' Creation du compte Binome '
              message={response}
            />

            <FenPop
              OpenFen={OpenFen2}
              SetOpenfen={SetOpenfen2}
              sujet=' Binome deja créé ! '
              message={response2}
            />
          </div>


          <Box mt={8}>
            <Copyright />
          </Box>
        </div>
      </main>

    </div>
  );
}