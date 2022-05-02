
import React from 'react';
import { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import NavBar from '../Commun/NavBar';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
    marginLeft: theme.spacing(55),
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
  },

  title: {
    marginLeft: theme.spacing(25),
  },
  form1: {
    width: '40%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(5),
  },

  idf: {

    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(9),
  },
  spec: {
    marginTop: theme.spacing(-8),
    marginLeft: theme.spacing(65),
  },
  submit: {
    width: '50%',
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(35),
    borderRadius: theme.spacing(9)
  },
  table: {
    position: 'absolute',
    width: '82%',
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(-2),
  },
  theme: {
    position: 'absolute',
    marginLeft: theme.spacing(60),
    marginTop: theme.spacing(-8),
    width: '300px',
  },



}));

export default function CreateResp(props) {

  const classes = useStyles();
  const [themeSujet, setThemeSujet] = React.useState('B1');
  const [open, setOpen] = React.useState(false);
  const [responsable, setResponsable] = useState([]);
  const [response, setresponse] = React.useState('');
  const [OpenFen, SetOpenfen] = React.useState(false);

  const getResponsable = async () => {

    await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/TableauDeBord/Enseignant",
      withCredentials: true,
      data: {
        response
      }
    }).then((res) => {
      if (res.status == 200) {
        //  response = 'On a nos enseignant'
        console.log(response);
        console.log(res.data)
        setResponsable(res.data)
      } else {
        if (res.status == 400) {
          //  response = 'Etudiant non cree erreur lors de l enregistrement';
          console.log(response);
        }

      }
    })


  }

  useEffect(() => {
    console.log('dans le useeffcet ');
    getResponsable()
  }, [])

  const [searchRes, setSearchRes] = useState('')
  const handleSearchRes = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    setSearchRes(value);
  };
  const handleChange = (event) => {
    setdetail(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const [idf, setidf] = React.useState('');
  const [detail, setdetail] = React.useState('');

  const handleDesigneCommission = (e) => {

    setidf(searchRes)
    console.log('on a sub')
    console.log('--------')
    console.log('IDF : ', idf);
    console.log('--------')
    console.log('Detail : ', detail);

    console.log('on go sauvegardé Commission');

    if (idf == "" || detail == "") {
      setresponse('Veuillez renseignez tout les champs !');
      SetOpenfen(true);
    } else {
      axios({
        method: "post",
        url: "http://localhost:5000/Utilisateur/pageEnseignant/ResponsableDeSpecialite/DesignCommission",
        withCredentials: true,
        data: {
          idf,
          detail,

        }
      }).then((res) => {
        if (res.status == 200) {
          setresponse('Role de commission de validation du theme : ' + detail + ' Assigné a l Enseignant : ' + idf + ' avec succes ')
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
            Ajouter un membre de la commission de validation
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
              onChange={handleSearchRes}
              value={searchRes}
            />
            <FormControl className={classes.theme}>
              <InputLabel id="demo-controlled-open-select-label">Thème</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={detail}
                onChange={(e => { setdetail(e.target.value); handleClose(); })}
                value={detail}
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
            onClick={handleDesigneCommission}
          >
            Selectionner
          </Button>
          <TableContainer component={Paper} className={classes.table}>
            <Table aria-label="simple table">
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
                  /* if (searchRes == "") {
                     return val
                   } else if (val.Id == searchRes) {
                     return val
                   }*/
                  if (true) return val;

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
          <FenPop
            OpenFen={OpenFen}
            SetOpenfen={SetOpenfen}
            sujet=' Commission de validation  '
            message={response}
          />
        </div>
      </main>

    </div>
  );
}