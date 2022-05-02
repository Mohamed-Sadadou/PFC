import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import NavBar from '../Commun/NavBar';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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
    marginLeft: theme.spacing(60),
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
  },

  title: {
    marginLeft: theme.spacing(40),
  },
  form1: {
    width: '40%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(43),
    // dispaly: 'flex',
    //flexDirection: 'row',
  },

  button: {
    width: '35%',
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(45),
    borderRadius: theme.spacing(9)
  },
  
  tableH: {
    width: '140%',
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(5),
  },

}));

export default function VisualiserSjt() {

  const [Sujet, setSujet] = useState([]);
  const [response, setresponse] = React.useState('');
  const [OpenFen, SetOpenfen]=React.useState(false);
  const getSujetCode = async () => {
    setSujet([]);
    console.log('le titre : ',titre);
    if(titre==""){getSujet();}
    else
   { await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/TableauDeBord/SujetCode",
      withCredentials: true,
      data:{
       code:titre,
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
    })}
  }

  const getSujet = async () => {

    await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/TableauDeBord/SujetCode",
      withCredentials: true,
      data:{
       code:'20210530interne19694AppWeb',
      }
      
    }).then((res) => {
      if (res.status == 200) {
        //response = 'On a nos sujet'
        console.log(response);
        console.log(res.data)
        setSujet(res.data)
      } else {
        if (res.status == 400) {
      //    response = 'Erreurs !!!!';
          console.log(response);
        }

      }
    })
  }
  useEffect(() => {
    console.log("use effect");
    if(titre=='')getSujet();
    


  }, [])

  function createdate(date) {
    
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

  function role(val){
    if(val)return'President';
    else return'Jury';
  }

  const classes = useStyles();
  const none = '------';
  const [titre, setTitre] = useState('')

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
            Visualiser les Fiches d'evaluation
          </Typography>

           <div>{alert}</div>

          <form className={classes.form1} noValidate>
            <TextField
              margin="normal"
              fullWidth
              id="Code"
              label="Code Sujet"
              autoFocus
              onChange={(e) => { setTitre(e.target.value); }}
              value={titre}
            />
            

          </form>
          
          <Button
            className={classes.button}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={getSujetCode}
          >
            Search
              </Button>

        </div>

        <TableContainer component={Paper} className={classes.tableH} >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Jury</TableCell>
                <TableCell align="center">note</TableCell>
                <TableCell align="center">remarque</TableCell>
                <TableCell align="center">date</TableCell>
                <TableCell align="center">Role</TableCell>
                

              </TableRow>
            </TableHead>
            <TableBody>
              {Sujet.map((fiches,index) => (
                <TableRow key={fiches.jury}>
                  <TableCell component="th" scope="row">{fiches.jury}</TableCell>
                  <TableCell align="center">{fiches.note}</TableCell>
                  <TableCell align="center">{fiches.remarque}</TableCell>
                  <TableCell align="center">{createdate(fiches.date)}</TableCell>
                  <TableCell align="center">{role(fiches.final)}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <FenPop 
          OpenFen={OpenFen} 
          SetOpenfen={SetOpenfen} 
          sujet=' Affichage Fiches Evaluations '
           message={response} 
           />
      </main>
    </div>

  );
}