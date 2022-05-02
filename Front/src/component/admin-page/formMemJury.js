import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
  },

  title: {
    marginLeft: theme.spacing(40),
  },
  form1: {
    width: '50%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },

  submit: {
    width: '40%',
    marginTop: theme.spacing(-12),
    marginLeft: theme.spacing(80),
    borderRadius: theme.spacing(9)
  },
  table: {
    width: '90%',
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(60),
  }



}));

export default function CreateJury(props) {

  const classes = useStyles();
  const [OpenFen, SetOpenfen] = React.useState(false);
  const [response, setresponse] = React.useState('');
  const [responsable, setResponsable] = useState([]);


  const getEnseignant = async () => {

    await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/pageAdmin/TableauDeBord/Enseignant",
      withCredentials: true,
      data: {
        response
      }
    }).then((res) => {
      if (res.status == 200) {
        //response = 'On a nos enseignant'
        console.log(response);
        console.log(res.data)
        setResponsable(res.data)
      } else {
        if (res.status == 400) {
          setresponse('Aucun enseignant disponible');
          SetOpenfen(true)
          console.log(response);
        }

      }
    })


  }

  useEffect(() => {
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
    getEnseignant()
  }, [])

  const [searchRes, setSearchRes] = useState('')
  const handleSearchRes = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    setSearchRes(value);
  };

  const [idf, setidf] = React.useState('');
  const [detail, setdetail] = React.useState('');

  const handleDesigneJury = (e) => {

    setidf(searchRes)
    console.log('on a sub')
    console.log('--------')
    console.log('IDF : ', idf);
    console.log('--------')
    console.log('Detail : ', detail);

    console.log('on go sauvegardé le jurry');

    if (idf == "" ) {
      setresponse('Veuillez renseignez tout les champs !');
      SetOpenfen(true);
    } else {
      axios({
        method: "post",
        url: "http://localhost:5000/Utilisateur/pageAdmin/creeCompteJury",
        withCredentials: true,
        data: {
          idf,
          detail,

        }
      }).then((res) => {
        console.log('le statu renvoyé' + res.status);
        if (res.status == 200) {
          setresponse('Role de jury Assigné a l enseignant identifier : ' + idf + ' et creer avec succes')
          console.log(response);
        } else {
          if (res.status == 201) {
            setresponse('Role Non Assigné erreur IDF inconnu');
            console.log(response);
          }else {
            setresponse('Role Non Assigné Erreur de mise a jour');
          }

        }

        SetOpenfen(true);
      })
    }


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
            Ajouter un Membre du jury
        </Typography>
          <form className={classes.form1} noValidate>
            <TextField
              className={classes.idf}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Identificateur"
              label="Identificateur"
              name="Identificateur"
              autoComplete="Identificateur"
              autoFocus
              onChange={(e) => { setidf(e.target.value) }}
              value={idf}
            />

          </form>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleDesigneJury}
          >
            Selectionner
          </Button>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>IDF</TableCell>
                  <TableCell align="center">Nom d'utilisateur</TableCell>
                  <TableCell align="center">Specialite</TableCell>
                  <TableCell align="center">Grade</TableCell>


                </TableRow>
              </TableHead>
              <TableBody>
                {responsable.filter((val) => {
                  if (searchRes == "") {
                    return val
                  } else if (val.Id == searchRes) {
                    return val
                  }


                }).map((responsable) => (
                  <TableRow key={responsable.idf}>
                    <TableCell component="th" scope="row">{responsable.idf}</TableCell>
                    <TableCell align="center">{responsable.nomUtilisateur}</TableCell>
                    <TableCell align="center">{responsable.enseignant[0].specialite}</TableCell>
                    <TableCell align="center">{responsable.enseignant[0].grade}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <FenPop OpenFen={OpenFen} SetOpenfen={SetOpenfen} sujet=' Designation Du Jury ' message={response} />

          <Box mt={8}>
            <Copyright />
          </Box>
        </div>
      </main>

    </div>
  );
}