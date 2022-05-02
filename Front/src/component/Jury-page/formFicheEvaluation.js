import React from 'react';
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
    marginLeft: theme.spacing(55),
    marginTop: theme.spacing(9),
    backgroundColor: theme.palette.primary.light,
  },
  
  title: {
    marginLeft: theme.spacing(40),
  },
  form1: {
    width: '40%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(5),
  },
  form2: {
    width: '40%',
    marginTop: theme.spacing(-20),
    marginLeft: theme.spacing(75),
  },
  submit: {
      width: '40%',
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(35),
    borderRadius: theme.spacing(9)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
 
  
}));

export default function CreateEtd(props) {

  const classes = useStyles();
  const theme = useTheme();
  

  const [niveau, setNiveau] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [response, setresponse] = React.useState('');
  const [OpenFen, SetOpenfen]=React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const [Code, setCode] = React.useState('');
  
  const [Remarques, setRemarques] = React.useState('');
 
  const [Note, setNote] = React.useState('');
 

  const NoteFinale = async ()=>{
     await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/pageEnseignant/Jury/NoteFinaleSujet",
      withCredentials: true,
      data: {
        codeSujet:Code,
      }
    }).then((res) => {
      console.log("LAAA NOOOTE ",res.data.note)
      if (res.status == 200) {
        console.log('dans le 200 ',res.data.note)
        setresponse ( "La note final du sujet est : "+res.data.note+ " felicitation au Binome !")
        console.log(response);
      } else {
        if (res.status == 250) {
          setresponse ( 'Le president a deja introduit la fiche final devaluation');
          console.log(response);
        }

      }
      SetOpenfen(true);
    })
  }


  const handleCreeFicheEval = (e) => {

    console.log('on a sub')
    

    console.log('on go Ajouter la fiche ');

    axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/pageEnseignant/Jury/RempliFicheEvaluation",
      withCredentials: true,
      data: {
        codeSujet:Code,
        note:Note,
        remarque:Remarques,
        final:niveau,
      }
    }).then((res) => {
      if (res.status == 200) {
        setresponse ( 'Fiche Evaluation correctement ajouté aux sujet : '+Code+' Operation effectuer avec succes')
        console.log(response);
        if(niveau=="President"){
          NoteFinale();
        }else{
          SetOpenfen(true);
        }
      } else {
        if (res.status == 250) {
          setresponse ( 'Le president a deja introduit la fiche final devaluation');
          console.log(response);
        }
        if (res.status == 210) {
          setresponse ( "Le sujet n'est pas valider impossible d'evaluer ");
          console.log(response);
          
        }

        SetOpenfen(true);
      }
      
    })


  };
  
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
          Remplir la fiche d'evaluation
        </Typography>
        <form className={classes.form1} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Code"
            label="Code Sujet"
            name="Code"
            autoComplete="Code"
            autoFocus
            onChange={(e) => setCode(e.target.value)}
            value={Code}
          />
          
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="text"
            label="Remarques"
            type="text"
            id="text"
            autoComplete="text"
            onChange={(e) => setRemarques(e.target.value)}
            value={Remarques}
          /> 
        </form>
        <form className={classes.form2} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Note"
            label="Note"
            name="Note"
            autoFocus
            onChange={(e) => setNote(e.target.value)}
            value={Note}
          />
         
          
         <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Role</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={niveau}
          onChange={(e)=>{setNiveau(e.target.value);handleClose();}}
        >
          <MenuItem value="">
          </MenuItem>
          
          <MenuItem value={'Jury'}>Jury</MenuItem>
          
          <MenuItem value={'President'}>President du jury</MenuItem>
        </Select>
      </FormControl>
        </form>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleCreeFicheEval}
          >
            Ajouter la fiche 
          </Button>
          <FenPop 
          OpenFen={OpenFen} 
          SetOpenfen={SetOpenfen} 
          sujet=' Ajout fiche Evaluation '
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