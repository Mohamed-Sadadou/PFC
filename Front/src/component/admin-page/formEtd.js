import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import NavBar from '../Commun/NavBar';
import axios from 'axios';
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
    marginLeft: theme.spacing(64),
    marginTop: theme.spacing(9),
    backgroundColor: theme.palette.primary.light,
  },
  
  title: {
    marginLeft: theme.spacing(50),
  },
  form1: {
    width: '40%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(14),
  },
  form2: {
    width: '60%',
    
    marginTop: theme.spacing(-40),
    marginLeft: theme.spacing(75),
  },
  submit: {
      width: '40%',
    marginTop: theme.spacing(-10),
    marginLeft: theme.spacing(35),
    borderRadius: theme.spacing(9)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  section:{
    width:'300px',
    marginTop: theme.spacing(-32),
    marginLeft: theme.spacing(80),
  },
  specialite:{
    width:'300px',
    marginTop: theme.spacing(-40),
    marginLeft: theme.spacing(80),
  },
  groupe:{
    width:'300px',
    marginTop: theme.spacing(-24),
    marginLeft: theme.spacing(80),
  },
  niveau:{
    width:'300px',
    marginTop: theme.spacing(-16),
    marginLeft: theme.spacing(80),
  },
 
  
}));

export default function CreateEtd(props) {

  const classes = useStyles();
  const theme = useTheme();
  

  const [niveau, setNiveau] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [response, setresponse] = React.useState('');
  const [OpenFen, SetOpenfen]=React.useState(false);
  const handleChange = (event) => {
    setNiveau(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const [idf, setMatricule] = React.useState('');
  const [mdp, setPassword] = React.useState('');
  const [nomUtilisateur, setNomUtilisateur] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [specialite, setspecialite] = useState('')
  const [section, setsection] = useState('')
  const [groupe, setgroupe] = React.useState('');
  const [aBinome, setaBinome] = React.useState('');
  
  //var response;
  const [opengroupe, setOpengroupe] = React.useState(false);
  const [openspecialite, setOpenspecialite] = React.useState(false);
  const [opensection, setOpensection] = React.useState(false);
  const handleClosesection = () => {
    setOpensection(false);
  };
  const handleOpensection = () => {
    setOpensection(true);
  };
  const handleClosespecialite = () => {
    setOpenspecialite(false);
  };
  const handleOpenspecialite = () => {
    setOpenspecialite(true);
  };
  const handleClosegroupe = () => {
    setOpengroupe(false);
  };
  const handleOpengroupe = () => {
    setOpengroupe(true);
  };


  const handleCreeEtu = (e) => {

    console.log('on a sub')
    console.log('--------')
    console.log('matricul : ', idf);
    console.log('--------')
    console.log('NomUtilisateur : ', nomUtilisateur);
    console.log('--------')
    console.log('Niveau : ', niveau);

    console.log('on go sauvegardé etudiant');
    if(idf.length<12 || idf.length>12 ){
      setresponse (" L'IDF d'un etudiant doit faire 12 caracteres numerique");
      SetOpenfen(true);
    }else{
      if (idf == " " || mdp == "" || nomUtilisateur == "" || email == "" || specialite == "" || section == "" || groupe == "" || niveau == "") {
        setresponse('Veuillez renseignez tout les champs !');
        SetOpenfen(true);
      } else {
      axios({
        method: "post",
        url: "http://localhost:5000/Utilisateur/pageAdmin/CreeCompteEtudiant",
        withCredentials: true,
        data: {
          idf,
          mdp,
          nomUtilisateur,
          email,
          specialite,
          section,
          groupe,
          niveau,
        }
      }).then((res) => {
        if (res.status == 201) {
          setresponse ( 'Etudiant : '+nomUtilisateur +' Matricule : '+idf+' creer avec succes');
          
          console.log(response);
        } else {
          if (res.status == 206) {
            setresponse ('Etudiant non cree erreur lors de l enregistrement');
            console.log(response);
          }else{
            console.log(res.data);
            setresponse (res.data.errors.IDF +res.data.errors.MDP +res.data.errors.email  );
            console.log(res.data.errors)
          }
          
        }
        SetOpenfen(true);
      })
    }
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
       <NavBar/>
      <main className={classes.content}>
      <div >
        <Avatar className={classes.avatar}>
          <AccountCircleOutlined />
        </Avatar>
        <Typography className={classes.title} component="h1" variant="h5">
          Créer le compte Etudiant
        </Typography>
        <form className={classes.form1} >
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
        <form  noValidate>
        <FormControl className={classes.specialite} >
              <InputLabel id="demo-controlled-open-select-label">Spécialité</InputLabel>
              <Select className={classes.chek}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openspecialite}
                onClose={handleClosespecialite}
                onOpen={handleOpenspecialite}
                value={specialite}
                onChange={(e) => { setspecialite(e.target.value); setOpenspecialite(true); handleClosespecialite();}}
                value={specialite}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value='ISIL'>ISIL</MenuItem>
                <MenuItem value='ACAD'>ACAD</MenuItem>
                <MenuItem value='GTR'>GTR</MenuItem>

              </Select>
            </FormControl>
          <FormControl className={classes.section} >
              <InputLabel id="demo-controlled-open-select-label">section</InputLabel>
              <Select className={classes.chek}

                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={opensection}
                onClose={handleClosesection}
                onOpen={handleOpensection}
                value={section}
                onChange={(e) => { setsection(e.target.value); setOpensection(true); handleClosesection();}}
                value={section}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value='A'>A</MenuItem>
                <MenuItem value='B'>B</MenuItem>
                <MenuItem value='C'>C</MenuItem>

              </Select>
            </FormControl>
            <FormControl  className={classes.groupe}>
              <InputLabel id="demo-controlled-open-select-label">Groupe</InputLabel>
              <Select className={classes.chek}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={opengroupe}
                onClose={handleClosegroupe}
                onOpen={handleOpengroupe}
                value={groupe}
                onChange={(e) => { setgroupe(e.target.value); setOpengroupe(true); handleClosegroupe();}}
                value={groupe}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value={'01'}>01</MenuItem>
                <MenuItem value={'02'}>02</MenuItem>
                <MenuItem value={'03'}>03</MenuItem>
                <MenuItem value={'04'}>04</MenuItem>

              </Select>
            </FormControl>
         <FormControl className={classes.niveau}>
        <InputLabel id="demo-controlled-open-select-label">Niveau</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={niveau}
          onChange={(e)=>{setNiveau(e.target.value); handleClose();}}
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
            onClick={handleCreeEtu}
          >
            créer compte
          </Button>

          <FenPop 
          OpenFen={OpenFen} 
          SetOpenfen={SetOpenfen} 
          sujet=' Creation du compte etudiant '
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