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
    width:'140px',
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(0),
  },



}));




const ProfilPage = () => {

  const [Sujets, setSujets] = useState([]);
  const [idfsujet,setidfsujet]= useState('');
  
  var searchRes
  const [response, setresponse] = React.useState('');
  const [OpenFen, SetOpenfen]=React.useState(false);
  var classes = useStyles();
  var uid = useContext(UidContext);
  var role = useContext(RoleUContext);
  var idfContext = useContext(UIDFContext);
  var username = useContext(UserNameContext);

  function PostulerButton(props) {
    return (
      <IconButton aria-label="expand row" size="small" onClick={ async (e) => {console.log("les props ", props.index,' -- ',props.idf);await PostulerBinome(props.idf)}}>
            <AddCircleIcon style={{fontSize:"35px"}}/>
        </IconButton>
    );
  };

  function Postulant(props) {
    var  Postulants = props.postulant
    return (
        
          <TableBody>
            {Postulants.filter((val) => {
             if (true) return val;


            }).map((Postulants,index) => (
              <TableRow key={Postulants}>
                <TableCell component="th" scope="row">{Postulants}</TableCell>
                


              </TableRow>
            ))}
          </TableBody>
        
    );
  }

  const PostulerBinome = async (idfsujet) => {
 
    console.log('----------- DANS POSTULER ----')

    console.log(idfsujet+'----'+idfContext)
    console.log('----------- DANS POSTULER ----')
    var BinomeParIdf,SujetCode;
    await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/pageBinome/PostulerSujet",
      withCredentials: true,
      data: {
        idfsujet:idfsujet,
        idfB:idfContext,
      }
    }).then((res) => {
      console.log('------------------------------')
      console.log('------------------------------')
      console.log('les status : ' + res.status);
      console.log('------------------------------')
      console.log('------------------------------')
      if (res.status == 200) {
        setresponse ( 'Binomes correctement Ajouté aux postulant du sujet ')
        SetOpenfen(true);
        getSujets()
      } else {
        if (res.status == 401) {
          setresponse ( 'Aucun Sujet correspondant');
          //console.log(response);
        }
        if (res.status == 260) {
            setresponse ( 'Binome deja postulant ');
            console.log(response);
          }
          if (res.status == 500) {
            setresponse ( 'Erreur lors de l ajout ');
            console.log(response);
          }
          if (res.status == 250) {
            setresponse ( ' Compte Binome Non validé !! pas possible de postulé ');
            console.log(response);
          }
          if (res.status == 404) {
            setresponse ( ' Vous netes pas identifier comme binome ');
            console.log(response);
          }

      }
      SetOpenfen(true);
    }).catch(err =>{ setresponse ( ' Compte Binome Non validé !! pas possible de postulé ');SetOpenfen(true);});
  }

  const getSujets = async () => {

    await axios({
      method: "post",
      url: "http://localhost:5000/Utilisateur/TableauDeBord/Sujet",
      withCredentials: true,
      
    }).then((res) => {
      console.log('les status : ' + res.status);
      if (res.status == 200) {
       // setresponse ( 'On a  nos Sujets')
        console.log(response);
        console.log(res.data)
        setSujets(res.data)
      } else {
        if (res.status == 400) {
          //setresponse ( 'Aucun sujet ya chikh');
          console.log(response);
          //SetOpenfen(true);
        }

      }
    })
  }

  useEffect(() => {
    console.log('lid contexte : ', UidContext, ' son role : ', RoleUContext);
    console.log('dans le useeffcet ');
    const GetInfo = async () => {
      /*console.log('on get les info')*/
      await axios({
        method: "get",
        url: "http://localhost:5000/Utilisateur/chekbi",
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.status)
          if (res.status == (201)) { if( window.location.href !="http://localhost:3000/seConnecter") window.location.href ="/seConnecter" }
          })
        .catch((err) => { console.log('thardet', err);  })
    }
    
    GetInfo();
    getSujets()

  }, [])

  const dispo = (val)=>{
      if(val)return 'Pris'
      else return 'Disponible'
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
                <TableCell align="center">Disponibilitée</TableCell>
                <TableCell align="center">Niveau</TableCell>
                <TableCell align="center">Postuant</TableCell>
                <TableCell align="center">Postuler</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {Sujets.filter((val) => {
               if (dispo(val.sujet.pris)=='Disponible') return val;


              }).map((Sujets,index) => (
                <TableRow key={Sujets.sujet.code}>
                  <TableCell component="th" scope="row">{Sujets.sujet.code}</TableCell>
                  <TableCell align="center">{Sujets.sujet.titre}</TableCell>
                  <TableCell align="center">{Sujets.sujet.theme}</TableCell>
                  <TableCell align="center">{dispo(Sujets.sujet.pris)}</TableCell>
                  <TableCell align="center">{Sujets.sujet.niveau}</TableCell>
                  <TableCell align="center"><Postulant postulant={Sujets.sujet.postulant}/></TableCell>
                  <TableCell align="center"><PostulerButton index={index} idf={Sujets.sujet.code}/></TableCell>


                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <FenPop 
          OpenFen={OpenFen} 
          SetOpenfen={SetOpenfen} 
          sujet=' Postuler pour un sujet '
           message={response} 
           />
      </div>
    </div>
  );
};

export default ProfilPage;