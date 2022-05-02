
import React from 'react';
import { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import NavBar from '../Commun/NavBar';
import axios from 'axios';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
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
    marginLeft: theme.spacing(60),
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
  },

  title: {
    marginLeft: theme.spacing(40),
  },
  form1: {
    width: '50%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
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
    width: '40%',
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(45),
    borderRadius: theme.spacing(9)
  },
  table: {
    position: 'absolute',
    width: '1180px',
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(1),
  },
  specialite: {
    position: 'absolute',
    width: '400px',
    marginTop: theme.spacing(-8),
    marginLeft: theme.spacing(60),
  },



}));

export default function CreateResp(props) {

  const classes = useStyles();

  const [responsable, setResponsable] = useState([]);

  const [OpenFen, SetOpenfen] = React.useState(false);
  const [response, setresponse] = React.useState('');

  const getResponsable = async () => {

    await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/pageAdmin/TableauDeBord/Enseignant",
      withCredentials: true,
      data: {
        response
      }
    }).then((res) => {
      if (res.status == 200) {
        //setresponse ( 'Role Responsable attribué ')
        console.log(response);
        console.log(res.data)
        setResponsable(res.data)
      } else {
        if (res.status == 400) {
          //  setresponse ('Role Responsable Non attribué');
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
    getResponsable()
  }, [])

  const [searchRes, setSearchRes] = useState('')
  const handleSearchRes = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    setSearchRes(value);
  };

  const [idf, setidf] = React.useState('');
  const [detail, setdetail] = React.useState('');

  const handleDesigneResponsable = (e) => {

    setidf(searchRes)
    console.log('on a sub')
    console.log('--------')
    console.log('IDF : ', idf);
    console.log('--------')
    console.log('Detail : ', detail);

    console.log('on go sauvegardé Responsabl');
    if (idf == "" || detail == "") {
      setresponse('Veuillez renseignez tout les champs !');
      SetOpenfen(true);
    } else {
      axios({
        method: "post",
        url: "http://localhost:5000/Utilisateur/pageAdmin/creeCompteResponsable",
        withCredentials: true,
        data: {
          idf,
          detail,

        }
      }).then((res) => {
        if (res.status == 200) {
          setresponse('Role responsable de specialite de la specialité : ' + detail + ' Assigné a l enseignant identifié : ' + idf + ' avec succes')
          console.log(response);
        } else {
          if (res.status == 201) {
            setresponse('Role Non Assigné IDF inconnu');
            console.log(response);
          }else {
            setresponse('Role Non Assigné Erreur de mise a jour');
          }

        }
        SetOpenfen(true);
      })
    }

  };
  const handleClosespecialite = () => {
    setOpenspecialite(false);
  };
  const handleOpenspecialite = () => {
    setOpenspecialite(true);
  };
  const [openspecialite, setOpenspecialite] = React.useState(false);

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
            Ajouter un responsable de Specialite
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
            <FormControl className={classes.specialite} >
              <InputLabel id="demo-controlled-open-select-label">Spécialité</InputLabel>
              <Select className={classes.chek}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openspecialite}
                onClose={handleClosespecialite}
                onOpen={handleOpenspecialite}
                value={detail}
                onChange={(e) => { setdetail(e.target.value); setOpenspecialite(true); handleClosespecialite(); }}
                value={detail}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value={'Responsable Informatique'}>Responsable Informatique</MenuItem>
                <MenuItem value={'ISIL'}>ISIL</MenuItem>
                <MenuItem value={'ACAD'}>ACAD</MenuItem>
                <MenuItem value={'GTR'}>GTR</MenuItem>
                <MenuItem value={'MIL'}>MIL</MenuItem>
                <MenuItem value={'MRSD'}>MRSD</MenuItem>
                <MenuItem value={'MSII'}>MSII</MenuItem>
                <MenuItem value={'MSSI'}>MSSI</MenuItem>
                <MenuItem value={'MMIV'}>MMIV</MenuItem>
                <MenuItem value={'MBigData'}>MBigData</MenuItem>
                <MenuItem value={'MBioInfo'}>MBioInfo</MenuItem>

              </Select>
            </FormControl>

          </form>


          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleDesigneResponsable}
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
                {responsable.map((responsable) => (
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

        </div>
        <FenPop
          OpenFen={OpenFen}
          SetOpenfen={SetOpenfen}
          sujet=' Role Responsable de specialite '
          message={response}
        />
      </main>

    </div>
  );
}