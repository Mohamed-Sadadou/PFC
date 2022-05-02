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
    marginTop: theme.spacing(-0),
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
    marginTop: theme.spacing(-8.5),
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
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(47),
    borderRadius: theme.spacing(9)
  },
  error: {
    backgroundColor: red[300]
  },
  table: {
    width: '100%',
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(0),
  },
  disponibl: {
    width: '30%',
    marginTop: theme.spacing(-2),
    marginLeft: theme.spacing(5),
  }

}));

export default function AfficheEtudiant() {
  const [Etudiants, setEtudiants] = useState([]);
  const [response, setresponse] = React.useState('');
  const [OpenFen, SetOpenfen] = React.useState(false);
  const classes = useStyles();
  const none = '------';
  var filtres = [];
  var champs = [];
  const getEtudiants = async () => {

    await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/TableauDeBord/GetBinome",
      withCredentials: true,

    }).then((res) => {
      if (res.status == 200) {
        setEtudiants(res.data)
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
    getEtudiants();


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

    console.log('-----------------')
    console.log('-----------------')
    console.log(aBinome!=='')
    console.log('-----------------')
    console.log('-----------------')
    if (setOpenNiveau && niveau !== '') {
      console.log('-----------------')
      console.log('-----------------')
      console.log('1')
      console.log('-----------------')
      console.log('-----------------')

      console.log('on a le niveau selectionner ');
      filtres.push('niveau');
      champs.push(niveau);

    }
    if (setOpenaBinome && aBinome !=='') {
      console.log('-----------------')
      console.log('-----------------')
      console.log('2')
      console.log('-----------------')
      console.log('-----------------')
      console.log('on a le valide selectionner ');
      filtres.push('valide');
      champs.push(aBinome);

    }
    if (setOpensection && section !== '') {
      console.log('-----------------')
      console.log('-----------------')
      console.log('3')
      console.log('-----------------')
      console.log('-----------------')
      console.log('on a la aSujet selectionner ');
      filtres.push('aSujet');
      champs.push(section);

    }
    if (setOpenspecialite && specialite !== '') {
      console.log('-----------------')
      console.log('-----------------')
      console.log('4')
      console.log('-----------------')
      console.log('-----------------')
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
      getEtudiants();
      setresponse(' Voila tous les Binomes ')
      SetOpenfen(true);
    } else {
      if (filtres.length == 1) {

        console.log('on a un filtre ', filtres[0], '--', champs[0]);
        axios({
          method: "post",
          url: "http://localhost:5000/Utilisateur/TableauDeBord/GetBinomeF1",
          withCredentials: true,
          data: {
            filtre1: filtres[0],
            champ1: champs[0],

          }
        }).then((res) => {
            
          if (res.status == 200) {
            console.log('-----------------')
            console.log('-----------------')
            
            if (res.data.length==0) { setresponse(' Aucun Binomes Trouvé !!');setEtudiants([]); }
             else{setresponse("Nombre d'Binomes  Correspondant a la recherches : < " + res.data.length + " >");setEtudiants(res.data);}
          } else {
            if (res.status == 201) {
              setresponse(' Aucun Binomes Trouvé !!');
              console.log(response);
              setEtudiants([]); 
            }

          }
          SetOpenfen(true);
        }).catch((err)=>console.log("thardeeeet !!!!",err))
      } else {
        if (filtres.length == 2) {

          console.log('on a un filtre ', filtres[0], '--', champs[0]);
          axios({
            method: "post",
            url: "http://localhost:5000/Utilisateur/TableauDeBord/GetBinomeF2",
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
            
              if (res.data.length==0) { setresponse(' Aucun Binomes Trouvé !!');setEtudiants([]); }
               else{setresponse("Nombre d'Binomes  Correspondant a la recherches : < " + res.data.length + " >");setEtudiants(res.data);}
            } else {
              if (res.status == 201) {
                setresponse(' Aucun Binomes Trouvé !!');
                console.log(response);
                setEtudiants([]); 
              }
  
            }
            SetOpenfen(true);
          })
        } else {
          if (filtres.length == 3) {

            console.log('on a un filtre ', filtres[0], '--', champs[0]);
            axios({
              method: "post",
              url: "http://localhost:5000/Utilisateur/TableauDeBord/GetBinomeF3",
              withCredentials: true,
              data: {
                filtre1: filtres[0],
                champ1: champs[0],
                filtre2: filtres[1],
                champ2: champs[1],
                filtre3: filtres[2],
                champ3: champs[2],

              }
            }).then((res) => {
              if (res.status == 200) {
                console.log('-----------------')
                console.log('-----------------')
               
                if (res.data.length==0) { setresponse(' Aucun Binomes Trouvé !!');setEtudiants([]); }
                 else{setresponse("Nombre d'Binomes  Correspondant a la recherches : < " + res.data.length + " >");setEtudiants(res.data);}
              } else {
                if (res.status == 201) {
                  setresponse(' Aucun Binomes Trouvé !!');
                  console.log(response);
                  setEtudiants([]); 
                }
    
              }
              SetOpenfen(true);
            })
          } else {
            if (filtres.length == 4) {

              console.log('on a un filtre ', filtres[0], '--', champs[0]);
              axios({
                method: "post",
                url: "http://localhost:5000/Utilisateur/TableauDeBord/GetBinomeF4",
                withCredentials: true,
                data: {
                  filtre1: filtres[0],
                  champ1: champs[0],
                  filtre2: filtres[1],
                  champ2: champs[1],
                  filtre3: filtres[2],
                  champ3: champs[2],
                  filtre4: filtres[3],
                  champ4: champs[3],

                }
              }).then((res) => {
                if (res.status == 200) {
                  console.log('-----------------')
                  console.log('-----------------')
                  
                  if (res.data.length==0) { setresponse(' Aucun Binomes Trouvé !!');setEtudiants([]); }
                   else{setresponse("Nombre d'Binomes  Correspondant a la recherches : < " + res.data.length + " >");setEtudiants(res.data);}
                } else {
                  if (res.status == 201) {
                    setresponse(' Aucun Binomes Trouvé !!');
                    console.log(response);
                    setEtudiants([]); 
                  }
      
                }
                SetOpenfen(true);
              })
            } else {
              getEtudiants();
              setresponse(' Voila tous les Binomes ')
              SetOpenfen(true);
            }
          }
        }
      }
    }
  }
  const valide= (val)=>{
   if(val)return ('Validé')
   else return('Non Validé')
    }

    const aSujet= (val)=>{
      if(val)return ('Avec sujet')
      else return('sans sujet')
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
            Visualiser les Binomes
              </Typography>

          <form className={classes.form2} noValidate>

            <FormControl className={classes.niveau}>
              <InputLabel id="demo-controlled-open-select-label">Niveau</InputLabel>
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

                <MenuItem value="L3">L3</MenuItem>

                <MenuItem value="M2">M2</MenuItem>

              </Select>
            </FormControl>
            <FormControl className={classes.type} >
              <InputLabel id="demo-controlled-open-select-label">à Sujet</InputLabel>
              <Select className={classes.chek}

                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={opensection}
                onClose={handleClosesection}
                onOpen={handleOpensection}
                value={section}
                onChange={(e) => { setsection(e.target.value); setOpensection(true);handleClosesection(); }}
                value={section}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value={true}>Avec sujet</MenuItem>
                <MenuItem value={false}>Sans sujet</MenuItem>

              </Select>
            </FormControl>
          </form>

          <form className={classes.form3} noValidate>
            <FormControl className={classes.them} >
              <InputLabel id="demo-controlled-open-select-label">Validation</InputLabel>
              <Select className={classes.chek}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openaBinome}
                onClose={handleCloseaBinome}
                onOpen={handleOpenaBinome}
                value={aBinome}
                onChange={(e) => { setaBinome(e.target.value); setOpenaBinome(true);handleCloseaBinome(); }}
                value={aBinome}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value={true}>Compte Validé</MenuItem>
                <MenuItem value={false}>Compte non Validé</MenuItem>


              </Select>
            </FormControl>
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
                <MenuItem value='ISIL'>ISIL</MenuItem>
                <MenuItem value='ACAD'>ACAD</MenuItem>
                <MenuItem value='GTR'>GTR</MenuItem>

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
                <TableCell align="center">Nom Etudiant 1</TableCell>
                <TableCell align="center">Nom Etudiant 2</TableCell>
                <TableCell align="center">Specialité</TableCell>
                <TableCell align="center">Avec sujet</TableCell>
                <TableCell align="center">Validation</TableCell>
                <TableCell align="center">Niveau</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {Etudiants.filter((val) => {
                if (true) {
                  return val
                }
                var dispo
                // console.log('les sujet avant la table : ', sujets);


              }).map((Etudiants) => (
                <TableRow key={Etudiants.idf}>
                  <TableCell component="th" scope="row" >{Etudiants.idf || none}</TableCell>
                  <TableCell align="center">{Etudiants.etudiant1[0].nomUtilisateur || none}</TableCell>
                  <TableCell align="center">{Etudiants.etudiant2[0].nomUtilisateur || none}</TableCell>
                  <TableCell align="center" >{Etudiants.specialite || none}</TableCell>
                  <TableCell align="center">{aSujet(Etudiants.aSujet) || none}</TableCell>
                  <TableCell align="center">{valide(Etudiants.valide)}</TableCell>
                  <TableCell align="center">{Etudiants.niveau || none}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <FenPop
          OpenFen={OpenFen}
          SetOpenfen={SetOpenfen}
          sujet=' Recherches de sujets '
          message={response}
        />
      </main>
    </div>

  );

  //******************************************** */
}