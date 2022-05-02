import React,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Link } from "react-router-dom";
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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { blue } from '@material-ui/core/colors';



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
  title1: {
    position:'absolute',
    marginTop:theme.spacing(0),
    fontSize:'19px',
    marginLeft: theme.spacing(45),
  },
  form1: {
    width: '50%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(20),
  },
  form2: {
    width: '40%',
    marginTop: theme.spacing(-20),
    marginLeft: theme.spacing(75),
  },
  submit: {
      width: '50%',
    marginTop: theme.spacing(-18),
    marginLeft: theme.spacing(75),
    //borderRadius: theme.spacing(9)
  },
  formControl: {
    width: '50%',
    margin: theme.spacing(1),
    marginLeft: theme.spacing(75),
    marginTop: theme.spacing(-18),
    minWidth: 120,
  },
  code2: {
    position:'absolute',
    width: '25%',
    margin: theme.spacing(1),
    marginLeft: theme.spacing(20),
    marginTop: theme.spacing(8),
    minWidth: 120,
  },
  btn: {
    position:'absolute',
    width: '20%',
  marginTop: theme.spacing(9),
  marginLeft: theme.spacing(80),
  //borderRadius: theme.spacing(9)
},
tableH:{
  position:'absolute',
  width:'79%',
  marginTop:theme.spacing(20),
  marginLeft:theme.spacing(2),
},
buttt:{
  position:'absolute',
  width:'20%',
  marginTop:theme.spacing(-5),
  marginLeft:theme.spacing(110),
  height: '40px',
    width: '300px',
    borderRadius: '50px',
    backgroundColor: blue[900],
}
 
  
}));

export default function CreateEtd(props) {

  const classes = useStyles();
  const theme = useTheme();
  const [response, setresponse] = React.useState('');
  const [OpenFen, SetOpenfen]=React.useState(false);
  const [response2, setresponse2] = React.useState('');
  const [OpenFen3, SetOpenfen3]=React.useState(false);
  const [Sujet, setSujet] = useState([]);
  const [niveau, setNiveau] = React.useState('');
  const [open, setOpen] = React.useState(false);
 

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


  function createdate(date) {
    
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

  function etat(val){
    if(val)return'Avis favorable';
    else return'Avis defavorable';
  }

  const [Code, setCode] = React.useState('');
  const [Code2, setCode2] = React.useState('');
  const [Remarques, setRemarques] = React.useState('');
  const [Note, setNote] = React.useState('');
 

  const handleAjoutFichEvaluation = (e) => {

    console.log('on a sub')
    console.log('on go Ajouter la fiche ');

    axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/pageEnseignant/Commission/AjoutFicheValidation",
      withCredentials: true,
      data: {
        codeSujet:Code,
        reserves:Remarques,
        final:niveau,
      }
    }).then((res) => {
      if (res.status == 200) {
        setresponse ( 'Fiche de validation correctement ajouté au sujet : '+Code)
        console.log(response);
      } else {
        if (res.status == 400) {
          setresponse ( 'Fiche de validation non ajouté  erreur lors de l enregistrement');
          console.log(response);
        }

      }
      SetOpenfen(true);
    })


  };

  const getSujetCode = async () => {
    setSujet([]);
    
    await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/TableauDeBord/SujetCode2",
      withCredentials: true,
      data:{
       code:Code2,
      }
      
    }).then((res) => {
      if (res.status == 200) {
        setresponse ( ' Voici les fiches Correspondantes ')
        if(res.data.length==0){
          setresponse ( ' Aucun Resultat Correspondant !! ')
        }
        console.log(response);
        console.log('La data renvoyé ',res.data)
        setSujet(res.data)
      } else {
        if (res.status == 400) {
          setresponse ( 'Erreurs !!!!');
          console.log(response);
        }

      }
      SetOpenfen(true);
    })
  }
  
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
          Remplir la fiche de Validation
        </Typography>
        <Button component={Link} to="/VisualiserSjtD" className={classes.buttt}>Visualiser Un sujet</Button>
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
            label="reserves"
            type="text"
            id="text"
            autoComplete="text"
            onChange={(e) => setRemarques(e.target.value)}
            value={Remarques}
          /> 
        </form>
        <form  noValidate>

          
         <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Avis</InputLabel>
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
          
          <MenuItem value={'Favorable'}>Avis Favorable</MenuItem>
          
          <MenuItem value={'Defavorable'}>Avis Defavorable</MenuItem>
        </Select>
      </FormControl>
        </form>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleAjoutFichEvaluation}
          >
            Ajouter la fiche 
          </Button>

          <Typography className={classes.title1} >
            Visualiser les Fiches de validation
          </Typography>
          <TextField className={classes.code2}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Code"
            label="Code Sujet"
            name="Code"
            autoComplete="Code"
            autoFocus
            onChange={(e) => setCode2(e.target.value)}
            value={Code2}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={getSujetCode}
          >
            Afficher les fiches 
          </Button>

          <TableContainer component={Paper} className={classes.tableH} >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Membre</TableCell>
                <TableCell align="center">Reserves</TableCell>
                <TableCell align="center">Etat</TableCell>
                <TableCell align="center">Date</TableCell>
                
                

              </TableRow>
            </TableHead>
            <TableBody>
              {Sujet.map((fiches,index) => (
                <TableRow key={fiches.membre}>
                  <TableCell align="left">{fiches.membre}</TableCell>
                  <TableCell align="center">{fiches.reserves}</TableCell>
                  <TableCell align="center">{etat(fiches.etat)}</TableCell>
                  <TableCell align="center">{createdate(fiches.date)}</TableCell>
                  

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

          <FenPop 
          OpenFen={OpenFen} 
          SetOpenfen={SetOpenfen} 
          sujet=' Ajout de la fiche de Validation '
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