import React, { useEffect, useState, useContext } from 'react';
import NavBar from "../Commun/NavBar";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { UidContext, RoleUContext, UIDFContext, UserNameContext, EnsRolesConext } from '../AppContexte';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FenPop from '../Commun/FenetrePopUp';
import AddCircleIcon from '@material-ui/icons/AddCircle';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  tableH: {
    width: "80%",
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(35),
  },
  buutt: {
    height: '10px',
    width: '10px',
  },

  tableH1: {

    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(100),
  },
  tableP: {
    width: '140px',
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(0),
  },



}));

const ProfilPage = () => {

  const [Sujets, setSujets] = useState([]);
  const [idfsujet, setidfsujet] = useState('');
  const [OpenFen, SetOpenfen]=React.useState(false);
  const [response, setresponse] = React.useState('');

  var classes = useStyles();
  var uid = useContext(UidContext);
  var role = useContext(RoleUContext);
  var idfContext = useContext(UIDFContext);
  var username = useContext(UserNameContext);
  var roles = useContext(EnsRolesConext);

  function ValiderButton(props) {
    return (
      <IconButton aria-label="expand row" size="small" onClick={(e) => {
        console.log("les props ", props.code, ' -- ');
        ValiderSujet(props.code);
      }}>
        <AddCircleIcon style={{ fontSize: "35px" }} />
      </IconButton>
    );
  };

  function Postulant(props) {
    var Postulants = props.postulant
    return (

      <TableBody>
        {Postulants.filter((val) => {
          if (true) return val;


        }).map((Postulants, index) => (
          <TableRow key={Postulants}>
            <TableCell component="th" scope="row">{Postulants}</TableCell>



          </TableRow>
        ))}
      </TableBody>

    );
  }

  const trouveindex=(roles)=>{
    var i = 0;
  while(i<roles.length){
     if(roles[i].role=='Commission'){
       return i;
     }
     i++;
  }
  }
  const ValiderSujet = async (idfsujet) => {

    var BinomeParIdf, SujetCode;
    await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/pageEnseignant/Commission/ValiderSujet",
      withCredentials: true,
      data: {
        code: idfsujet,

      }
    }).then((res) => {
      console.log('les status : ' + res.status);
      if (res.status == 200) {
        setresponse (' Sujet : '+idfsujet+' Correctement validé !')
        console.log(response);
        console.log(res.data)
        //getSujets()
      } else {
        if (res.status == 401) {
          setresponse ('Aucun Sujet correspondant');
          console.log(response);
        }
        if (res.status == 402) {
          setresponse ( 'ERREUR ');
          console.log(response);
        }
        if (res.status == 500) {
          setresponse ( 'ERREUR lors de la validation !! serveur planté !! ');
          console.log(response);
        }

      }
      SetOpenfen(true);
    })
  }

  const getSujets = async () => {

    await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/TableauDeBord/Sujet",
      withCredentials: true,

    }).then((res) => {
      console.log('les status : ' + res.status);
      if (res.status == 200) {
        //response = 'On a nos Sujets'
        console.log(response);
        console.log(res.data)
        setSujets(res.data)
      } else {
        if (res.status == 400) {
         // response = 'Aucun sujet ya chikh';
          console.log(response);
        }

      }
    })
  }

  const SujetsNonValide = (Sujets) => {
    var SujetsNonValide = [];
    var i=0;
    Sujets.forEach(element => {
      console.log('dans la boucle de sujets ',i);i++;
      console.log('lelement.sujet.valide :  ',element.sujet.Valide);
      console.log('lelement avec fonction valide :  ',valide(element.sujet.Valide));
      console.log('le test role :  ',(roles[trouveindex(roles)].detail).toLowerCase());
      console.log('le test bool :  ',element.sujet.theme==(roles[trouveindex(roles)].detail).toLowerCase());
      if (valide(element.sujet.Valide) != 'validé' && (element.sujet.theme).toLowerCase()==(roles[trouveindex(roles)].detail).toLowerCase()) {
        console.log('lelement dans le if :  ',valide(element.sujet.Valide));
        SujetsNonValide.push(element);

      }
    });

    return SujetsNonValide;
  }

  useEffect(() => {
    console.log('lid contexte : ', UidContext, ' son role : ', RoleUContext);
    console.log('dans le useeffcet ');
    getSujets()

  }, [OpenFen])

  const dispo = (val) => {
    if (val) return 'Pris'
    else return 'Disponible'
  }

  const valide = (val) => {
    if (val) return 'validé'
    else return 'non validé'
  }
  return (
    <div>

      <NavBar />

      <div>
        <TableContainer component={Paper} className={classes.tableH} >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell width='25%'>Code</TableCell>
                <TableCell align="center">Titre</TableCell>
                <TableCell align="center">Theme</TableCell>
                <TableCell align="center">Disponibilitée</TableCell>
                <TableCell align="center">Niveau</TableCell>
                <TableCell align="center">Postuant</TableCell>
                <TableCell align="center">Valider</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {SujetsNonValide(Sujets).map((Sujets, index) => (
                <TableRow key={Sujets.sujet.code}>
                  <TableCell component="th" scope="row">{Sujets.sujet.code}</TableCell>
                  <TableCell align="center">{Sujets.sujet.titre}</TableCell>
                  <TableCell align="center">{Sujets.sujet.theme}</TableCell>
                  <TableCell align="center">{dispo(Sujets.sujet.pris)}</TableCell>
                  <TableCell align="center">{Sujets.sujet.niveau}</TableCell>
                  <TableCell align="center"><Postulant postulant={Sujets.sujet.postulant} /></TableCell>
                  <TableCell align="center"><ValiderButton index={index} code={Sujets.sujet.code} /></TableCell>


                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <FenPop 
          OpenFen={OpenFen} 
          SetOpenfen={SetOpenfen} 
          sujet=' Validation  '
           message={response} 
           />
      </div>
    </div>
  );
};

export default ProfilPage;