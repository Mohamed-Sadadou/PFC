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
    width: '60%', // Fix IE 11 issue.
    marginTop: theme.spacing(-16),
    marginLeft: theme.spacing(50),
    //dispaly: 'flex',
    //flexDirection: 'row',
  },
  form3: {
    width: '60%', // Fix IE 11 issue.
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(50),
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
    marginLeft: theme.spacing(20),
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
  disponibl:{
    width: '30%',
    marginTop: theme.spacing(-2),
    marginLeft: theme.spacing(5),
  }

}));

export default function VisualiserSjt() {
  const [sujets, setSujet] = useState([]);
  const [compteur, setCompteur] = useState(0);
  const [response, setresponse] = React.useState('');
  const [OpenFen, SetOpenfen]=React.useState(false);
  var filtres = [];
  var champs = [];
  //var compteur;
  

  const getSujet = async () => {

    await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/TableauDeBord/Sujet",
      withCredentials: true,
      data: {
        response
      }
    }).then((res) => {
      if (res.status == 200) {
        //response = 'On a nos sujet'
       // console.log(response);
      //  console.log(res.data)
        setSujet(res.data)
      } else {
        if (res.status == 400) {
         // response = 'Erreurs !!!!';
         // console.log(response);
        }

      }
    })
  }
  useEffect(() => {
    console.log("use effect");
  
    getSujet();


  }, [])



  var searchTitle;
  const classes = useStyles();
  const [opensucess, setOpenSucess] = useState('')
  const [openerror, setOpenError] = useState('')
  const [message, setMessage] = useState(true)
  const none = '------';



  // }

  //********Filter Hooks */


  const [idf, setIDf] = useState('')
  const [titre, setTitre] = useState('')
  const [niveau, setNiveau] = React.useState('');
  const [themesjt, setThemesjt] = React.useState('');
  const [type, setType] = React.useState('');
  const [disp, setdisp] = React.useState('');
  const [specialite, setSpecialite] = React.useState('');

  //***********open close hooks */

  const [openNiveau, setOpenNiveau] = React.useState(false);
  const [openThemesjt, setOpenThemesjt] = React.useState(false);
  const [openType, setOpenType] = React.useState(false);
  const [opendisp, setOpendisp] = React.useState(false);
  const [openSpecialite, setOpenSpecialite] = React.useState(false);
  const [openTitre, setOpenTitre] = React.useState(false);
  const [openIDf, setopenIDf] = React.useState(false);

  //*************** choix du filter */
  const handleChangeNiveau = (event) => {
    setNiveau(event.target.value);
    console.log(event.target.value);
    let valueNiveau = event.target.value;
    setNiveau(valueNiveau);


  };
  const handleChangeThemesjt = (event) => {
    setThemesjt(event.target.value);
    console.log(event.target.value);
    let valueTheme = event.target.value;
    setThemesjt(valueTheme);
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
    console.log(event.target.value);
    let valueType = event.target.value;
    setType(valueType);
  };
  const handleChangeSpecialite = (event) => {
    setSpecialite(event.target.value);
    console.log(event.target.value);
    let valueSpec = event.target.value;
    setSpecialite(valueSpec);
  };
  const handleSearchTitle = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    //value.length > 2 && setSearchTitle(value);
  };
  const handleSearchEns = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    // value.length > 2 && setSearchEns(value);
  };
  //*************function filter */

  //*************open & close methods */

  const handleCloseNiveau = () => {
    setOpenNiveau(false);
  };
  const handleOpenNiveau = () => {
    setOpenNiveau(true);
  };

  const handleCloseThemesjt = () => {
    setOpenThemesjt(false);
  };

  const handleOpenThemesjt = () => {
    setOpenThemesjt(true);
  };

  const handleCloseType = () => {
    setOpenType(false);
  };

  const handleOpenType = () => {
    setOpenType(true);
  };

  const handleClosedisp = () => {
    setOpendisp(false);
  };

  const handleOpendisp = () => {
    setOpendisp(true);
  };

  const handleCloseSpecialite = () => {
    setOpenSpecialite(false);
  };

  const handleOpenSpecialite = () => {
    setOpenSpecialite(true);
  };

  const valide = (val)=>{
    console.log('le bool :  ',val)
    if(val)return 'Validé'
    else return 'non Validé'
}
  const Dispo = (val)=>{
    console.log('le bool :  ',val)
    if(val)return 'Pris'
    else return 'Disponible'
}
  const handleMessage = (message, Response) => {

  }

  const handleRecherche = (e) => {
    console.log('laaaaa : ',setOpendisp);

    console.log('appel de la recherche le compteur : ', compteur);
    if (setOpenTitre && titre != '') {
      console.log('on a le titre selectionner ');
      filtres.push('titre');
      champs.push(titre);

    }
    if (setOpenNiveau && niveau != '') {
      console.log('on a le niveau selectionner ');
      filtres.push('niveau');
      champs.push(niveau);

    }
    if (setOpenSpecialite && specialite != '') {
      console.log('on a la specialite selectionner ');
      filtres.push('Specialite');
      champs.push(specialite);

    }
    if (setOpenThemesjt && themesjt != '') {
      console.log('on a le theme selectionner ');
      filtres.push('theme');
      champs.push(themesjt);

    }
    if (setOpenType && type != '') {
      console.log('on a le type selectionner ');
      filtres.push('typeSujet');
      champs.push(type);

    }
    if (setOpendisp && disp != '') {
      console.log('on a la disponibilité selectionner ');
      filtres.push('pris');
      champs.push(disp);

    }
    if (setopenIDf && idf != '') {
      console.log('on a le idf selectionner ');
      if (setOpenType && type != '' && type == 'interne') {
        filtres.push('encadreur');
      } else {
        if (setOpenType && type != '' && type == 'externe') {
          filtres.push('copromoteur');
        }else{
          filtres.push('encadreur');
        }
      }

      champs.push(idf);

    }
    console.log('on a sub')
    console.log('--------')
    console.log('Compteur : ', filtres.length);
    console.log('--------')
    console.log('IDF : ', idf);
    console.log('--------')
    console.log('Titre : ', titre);
    console.log('--------')
    console.log('theme : ', themesjt);
    console.log('--------')
    console.log('niveau : ', niveau);
    console.log('--------')
    console.log('type : ', type);
    console.log('--------')
    console.log('specialite : ', specialite);
    console.log('--------')
    console.log('Disponibilité : ', disp);

    console.log('on go effectuer la recherche');
    if (filtres.length == 0) {
      getSujet();
      setresponse ( ' Voila tous les sujets ')
      handleMessage(true, response);
    } else {
      if (filtres.length == 1) {

        console.log('on a un filtre ', filtres[0], '--', champs[0]);
        axios({
          method: "post",
          url: "http://localhost:5000/Utilisateur/TableauDeBord/SujetF1",
          withCredentials: true,
          data: {
            filtre1: filtres[0],
            champ1: champs[0],

          }
        }).then((res) => {
          if (res.status == 200) {
            setresponse ( ' Nombre de sujets Correspondant a la recherches : < '+res.data.length+' >')
            if(res.data.length==0){setresponse ( ' Aucun sujets Trouvé !!')}
            // console.log(response);
            //  console.log('la data renvoyé' + res.data);
           
            
            setSujet(res.data);
          } else {
            if (res.status == 400) {
              setresponse ( 'Erreurs de recherches !!!');
              console.log(response);
            }

          }
          SetOpenfen(true);
        })
      } else {
        if (filtres.length == 2) {
          console.log('on a un filtre ', filtres[0], '--', champs[0], '--', filtres[1], '--', champs[1]);
          axios({
            method: "post",
            url: "http://localhost:5000/Utilisateur/TableauDeBord/SujetF2",
            withCredentials: true,
            data: {
              filtre1: filtres[0],
              champ1: champs[0],
              filtre2: filtres[1],
              champ2: champs[1],

            }
          }).then((res) => {
            if (res.status == 200) {
              setresponse ( ' Nombre de sujets Correspondant a la recherches : < '+res.data.length+' >')
              if(res.data.length==0){setresponse ( ' Aucun sujets Trouvé !!')}
             
              setSujet(res.data);
              if (res.data == null) { setresponse ( "Aucun sujet ne correspond a la recherche") }
              
            } else {
              if (res.status == 400) {
                setresponse ( 'Erreurs de recherches !!!');
                console.log(response);
              }
  
            }
            SetOpenfen(true);
          })
        } else {
          if (filtres.length == 3) {
            console.log('on a un filtre ', filtres[0], '--', champs[0], '--', filtres[1], '--', champs[1], '--', filtres[2], '--', champs[2]);
            axios({
              method: "post",
              url: "http://localhost:5000/Utilisateur/TableauDeBord/SujetF3",
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
                setresponse ( ' Nombre de sujets Correspondant a la recherches : < '+res.data.length+' >')
                if(res.data.length==0){setresponse ( ' Aucun sujets Trouvé !!')}
               // console.log(response);
              //  console.log('la data renvoyé' + res.data);
                setSujet(res.data);
                
                
              } else {
                if (res.status == 400) {
                  setresponse ( 'Erreurs de recherches !!!');
                  console.log(response);
                }
    
              }
              SetOpenfen(true);
            })
          } else {
            if (filtres.length == 4) {
              console.log('on a un filtre ', filtres[0], '--', champs[0], '--', filtres[1], '--', champs[1], '--', filtres[2], '--', champs[2], '--', filtres[3], '--', champs[3]);
              axios({
                method: "post",
                url: "http://localhost:5000/Utilisateur/TableauDeBord/SujetF4",
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
                  setresponse ( ' Nombre de sujets Correspondant a la recherches : < '+res.data.length+' >')
                  if(res.data.length==0){setresponse ( ' Aucun sujets Trouvé !!')}
                  // console.log(response);
                  //  console.log('la data renvoyé' + res.data);
                  setSujet(res.data);
                  
                  
                } else {
                  if (res.status == 400) {
                    setresponse ( 'Erreurs de recherches !!!');
                    console.log(response);
                  }
      
                }
                SetOpenfen(true);
              })
            } else {
              if (filtres.length == 5) {
                console.log('on a un filtre ', filtres[0], '--', champs[0], '--', filtres[1], '--', champs[1], '--', filtres[2], '--', champs[2], '--', filtres[3], '--', champs[3], '--', filtres[4], '--', champs[4]);
                axios({
                  method: "post",
                  url: "http://localhost:5000/Utilisateur/TableauDeBord/SujetF5",
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
                    filtre5: filtres[4],
                    champ5: champs[4],

                  }
                }).then((res) => {
                  if (res.status == 200) {
                    setresponse ( ' Nombre de sujets Correspondant a la recherches : < '+res.data.length+' >')
                    if(res.data.length==0){setresponse ( ' Aucun sujets Trouvé !!')}
                    
                    setSujet(res.data);
                   
                    
                  } else {
                    if (res.status == 400) {
                      setresponse ( 'Erreurs de recherches !!!');
                      console.log(response);
                    }
        
                  }
                  SetOpenfen(true);
                })
              } else {
                if (filtres.length == 6) {
                  console.log('on a un filtre ', filtres[0], '--', champs[0], '--', filtres[1], '--', champs[1], '--', filtres[2], '--', champs[2], '--', filtres[3], '--', champs[3], '--', filtres[4], '--', champs[4], '--', filtres[5], '--', champs[5]);
                  axios({
                    method: "post",
                    url: "http://localhost:5000/Utilisateur/TableauDeBord/SujetF6",
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
                      filtre5: filtres[4],
                      champ5: champs[4],
                      filtre6: filtres[5],
                      champ6: champs[5],

                    }
                  }).then((res) => {
                    if (res.status == 200) {
                      setresponse ( ' Nombre de sujets Correspondant a la recherches : < '+res.data.length+' >')
                      if(res.data.length==0){setresponse ( ' Aucun sujets Trouvé !!')}
                     
                      setSujet(res.data);
                      if (res.data == null) { setresponse ( "Aucun sujet ne correspond a la recherche") }
                      
                    } else {
                      if (res.status == 400) {
                        setresponse ( 'Erreurs de recherches !!!');
                        console.log(response);
                      }
          
                    }
                    SetOpenfen(true);
                  })
                } else {
                  if (filtres.length == 7) {
                    console.log('on a un filtre ', filtres[0], '--', champs[0], '--', filtres[1], '--', champs[1], '--', filtres[2], '--', champs[2], '--', filtres[3], '--', champs[3], '--', filtres[4], '--', champs[4], '--', filtres[5], '--', champs[5]);
                    axios({
                      method: "post",
                      url: "http://localhost:5000/Utilisateur/TableauDeBord/SujetF7",
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
                        filtre5: filtres[4],
                        champ5: champs[4],
                        filtre6: filtres[5],
                        champ6: champs[5],
                        filtre7: filtres[6],
                        champ7: champs[6],
  
                      }
                    }).then((res) => {
                      if (res.status == 200) {
                        setresponse ( ' Nombre de sujets Correspondant a la recherches : < '+res.data.length+' >')
                        if(res.data.length==0){setresponse ( ' Aucun sujets Trouvé !!')}
                       // console.log(response);
                      //  console.log('la data renvoyé' + res.data);
                        setSujet(res.data);
                        if (res.data == null) { setresponse ( "Aucun sujet ne correspond a la recherche") }
                        
                      } else {
                        if (res.status == 400) {
                          setresponse ( 'Erreurs de recherches !!!');
                          console.log(response);
                        }
            
                      }
                      SetOpenfen(true);
                    })
                  } else {
                    getSujet();
                    setresponse (' Voila tous les sujets ')
                    SetOpenfen(true);
                  }
                }
              }
            }
          }
        }
      }
    }
    /*
    
     */
    
    
  };

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
            Visualiser les sujets
          </Typography>

           <div>{alert}</div>

          <form className={classes.form1} noValidate>
            <TextField
              margin="normal"
              fullWidth
              id="Titre Sujet"
              label="Titre Sujet"
              autoFocus
              onChange={(e) => { setTitre(e.target.value); setOpenTitre(true); }}
              value={titre}
            />
            <TextField
              margin="normal"
              fullWidth
              id="IdfEns"
              label="IDF Enseignant"
              autoFocus
              onChange={(e) => { setIDf(e.target.value); setopenIDf(true); }}
              value={idf}
            />

          </form>
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
                onChange={(e) => { setNiveau(e.target.value); setOpenNiveau(true); handleCloseNiveau();}}
                value={niveau}
              >
                <MenuItem value="">
                </MenuItem>

                <MenuItem value="L3">L3</MenuItem>

                <MenuItem value="M2">M2</MenuItem>

              </Select>
            </FormControl>
            <FormControl className={classes.type} >
              <InputLabel id="demo-controlled-open-select-label">Type</InputLabel>
              <Select className={classes.chek}

                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openType}
                onClose={handleCloseType}
                onOpen={handleOpenType}
                value={type}
                onChange={(e) => { setType(e.target.value); setOpenType(true);handleCloseType(); }}
                value={type}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value='interne' >Interne</MenuItem>
                <MenuItem value='externe'>Externe</MenuItem>

              </Select>
            </FormControl>
          </form>

          <form className={classes.form3} noValidate>
            <FormControl className={classes.them} >
              <InputLabel id="demo-controlled-open-select-label">Thème</InputLabel>
              <Select className={classes.chek}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openThemesjt}
                onClose={handleCloseThemesjt}
                onOpen={handleOpenThemesjt}
                value={themesjt}
                onChange={(e) => { setThemesjt(e.target.value); setOpenThemesjt(true);handleCloseThemesjt(); }}
                value={themesjt}
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
            <FormControl className={classes.specia}>
              <InputLabel id="demo-controlled-open-select-label">Spécialité</InputLabel>
              <Select className={classes.chek}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openSpecialite}
                onClose={handleCloseSpecialite}
                onOpen={handleOpenSpecialite}
                value={specialite}
                onChange={(e) => { setSpecialite(e.target.value); setOpenSpecialite(true);handleCloseSpecialite(); }}
                value={specialite}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value='ISIL'>ISIL</MenuItem>
                <MenuItem value='ACAD'>ACAD</MenuItem>
                <MenuItem value='GTR ' >GTR</MenuItem>

              </Select>
            </FormControl>
          </form>
          <FormControl className={classes.disponibl} >
              <InputLabel id="demo-controlled-open-select-label">Disponibilité</InputLabel>
              <Select className={classes.chek}

                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={opendisp}
                onClose={handleClosedisp}
                onOpen={handleOpendisp}
                value={disp}
                onChange={(e) => { setdisp(e.target.value); setOpendisp(true); handleClosedisp();}}
                value={disp}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value='false' >Disponible</MenuItem>
                <MenuItem value='true'>Pris</MenuItem>

              </Select>
            </FormControl>
         
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
                <TableCell >Code</TableCell>
                <TableCell align="center">Titre</TableCell>
                <TableCell align="center">Theme</TableCell>
                <TableCell align="center"> Niveau</TableCell>

                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Etablissment</TableCell>
                <TableCell align="center">Specialité</TableCell>
                <TableCell align="center">Disponibilité</TableCell>
                <TableCell align="center">Validation</TableCell>
                <TableCell align="center">%</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sujets.filter((val) => {
                if (searchTitle == "") {
                  return val
                } else if (true) {
                  return val
                }
                var dispo
                console.log('les sujet avant la table : ', sujets);


              }).map((sujets) => (
                <TableRow key={sujets.sujet.code}>
                  <TableCell component="th" scope="row" >{sujets.sujet.code || none}</TableCell>
                  <TableCell align="center" >{sujets.sujet.titre || none}</TableCell>
                  <TableCell align="center">{sujets.sujet.theme || none}</TableCell>
                  <TableCell align="center">{sujets.sujet.niveau || none}</TableCell>
                  <TableCell align="center">{sujets.sujet.typeSujet || none}</TableCell>
                  <TableCell align="center">{sujets.etablissment || sujets.universite}</TableCell>
                  <TableCell align="center">{sujets.sujet.Specialite || none}</TableCell>
                  <TableCell align="center">{Dispo(sujets.sujet.pris)}</TableCell>
                  <TableCell align="center">{valide(sujets.sujet.Valide)}</TableCell>
                  <TableCell align="center">{sujets.sujet.tauxAvancement}</TableCell>
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
}