import React, { useEffect, useState, useContext } from 'react';
import NavBar from "../Commun/NavBar";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { UidContext, RoleUContext, UIDFContext, UserNameContext } from '../AppContexte';
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
//import CollapsibleTable from './Table';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FenPop from '../Commun/FenetrePopUp';
import EditIcon from '@material-ui/icons/Edit'
import { Link } from "react-router-dom";

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



}));





const ProfilPage = () => {



  const [Sujets, setSujets] = useState([]);
  const [response, setresponse] = React.useState('');
  const [OpenFen, SetOpenfen]=React.useState(false);


  var classes = useStyles();
  var uid = useContext(UidContext);
  var role = useContext(RoleUContext);
  var idf = useContext(UIDFContext);
  var username = useContext(UserNameContext);

  function AffectButton(props) {
    return (
      <IconButton aria-label="expand row" size="small" onClick={(e) => {
        console.log("les props ", props.Binome,' -- ',props.idf);AffecteBinome(props.idf,props.Binome)
        }}>
            <AddCircleIcon style={{fontSize:"35px"}}/>
        </IconButton>
    );
  }

  function ModifierButton(props) {
    return (
      <IconButton aria-label="expand row" size="small" component={Link} to={'/ModifierSujet/'+props.sujet+''} params={props.sujet}>
            <EditIcon style={{fontSize:"35px"}}/>
        </IconButton>
    );
  }

  const AffecteBinome = async (idfsujet,Binome) => {
    console.log("les props ", Binome,' -- ',idfsujet);
    var BinomeParIdf,SujetCode;
    await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/pageEnseignant/AffectationBinome",
      withCredentials: true,
      data: {
        Binome:Binome,
        code:idfsujet,

      }
    }).then((res) => {
      console.log('les status : ' + res.status);
      if (res.status == 200) {
        setresponse ('Affectation du binome : '+Binome+' au sujet : '+idfsujet+' Reussi ')
        console.log(response);
        console.log(res.data)
        getSujets(res.data)
      } else {
        if (res.status == 250) {
          setresponse ( 'Affectation Echouer binome deja affecter a un autre sujet !');
          console.log(response);
        }

      }
      SetOpenfen(true);
    })
  }

  const getSujets = async () => {

    await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/pageEnseignant/donnemessujet",
      withCredentials: true,
      data: {
        response
      }
    }).then((res) => {
      console.log('les status : ' + res.status);
      if (res.status == 200) {
        //response = 'On a nos enseignant'
        console.log(response);
        console.log(res.data)
        setSujets(res.data)
      } else {
        if (res.status == 400) {
        //  response = 'Etudiant non cree erreur lors de l enregistrement';
          console.log(response);
        }

      }
    })
  }

  useEffect(() => {
    console.log('lid contexte : ', UidContext, ' son role : ', RoleUContext);
    console.log('dans le useeffcet ');
    getSujets();
    const GetInfo = async () => {
      /*console.log('on get les info')*/
      await axios({
        method: "get",
        url: "http://localhost:5000/Utilisateur/chekens",
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.status)
          if (res.status == (201)) { if( window.location.href !="http://localhost:3000/seConnecter") window.location.href ="/seConnecter" }
          })
        .catch((err) => { console.log('thardet', err);  })
    }
    
    GetInfo();

  }, [])

  const dispo = (val)=>{
    if(val)return 'Pris'
    else return 'Disponible'
}

function Postulant(props) {
  var  Postulants = props.postulant
  return (
      
        <TableBody>
          {Postulants.filter((val) => {
           if (true) return val;


          }).map((Postulants,index) => (
            <TableRow key={Postulants}>
              <TableCell component="th" scope="row">{Postulants}</TableCell>
              <TableCell> <AffectButton Binome={Postulants} idf={props.sujet}/></TableCell>
             


            </TableRow>
          ))}
        </TableBody>
      
  );
}
  return (
    <div>
      
      <NavBar/>
      
      <div>
        <TableContainer component={Paper} className={classes.tableH} >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell align="center">Titre</TableCell>
                <TableCell align="center">Theme</TableCell>
                <TableCell align="center">Disponibilite</TableCell>
                <TableCell align="center">Niveau</TableCell>
                <TableCell align="center">Binome/Affectation</TableCell>
                <TableCell align="center">Modifier</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {Sujets.filter((val) => {
                 if (dispo(val.sujet.pris)=='Disponible') return val;


              }).map((Sujets,index) => (
                <TableRow key={Sujets.sujet.postulant[index]}>
                  <TableCell component="th" scope="row">{Sujets.sujet.code}</TableCell>
                  <TableCell align="center">{Sujets.sujet.titre}</TableCell>
                  <TableCell align="center">{Sujets.sujet.theme}</TableCell>
                  <TableCell align="center">{dispo(Sujets.sujet.pris)}</TableCell>
                  <TableCell align="center">{Sujets.sujet.niveau}</TableCell>
                  <TableCell align="center"><Postulant postulant={Sujets.sujet.postulant} sujet={Sujets.sujet.code}/></TableCell>
                  <TableCell align="center"><ModifierButton sujet={Sujets.sujet.code} /></TableCell>


                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <FenPop 
          OpenFen={OpenFen} 
          SetOpenfen={SetOpenfen} 
          sujet='Affectation du binome '
           message={response} 
           />
      </div>
    </div>
  );
};

export default ProfilPage;