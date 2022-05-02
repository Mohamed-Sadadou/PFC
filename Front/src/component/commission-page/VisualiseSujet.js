import { makeStyles, useTheme } from '@material-ui/core/styles';
import { React, useContext, useState,useEffect } from 'react';
import NavBar from "../Commun/NavBar";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import axios from 'axios';
import FenPop from '../Commun/FenetrePopUp';

const useStyles = makeStyles((theme) => ({
    paper: {
        position:'absolute',
        backgroundColor: blue[50],
        marginLeft: theme.spacing(65),
        width: 700,
        height: 600,
        borderRadius: 30,
        marginTop: theme.spacing(5),
        //boxShadow: '2px 5px 30px black',
    },
    code:{
        position:'absolute',
        marginTop:theme.spacing(5),
        marginLeft:theme.spacing(10),
        width:'80%'
      },
      button:{
        position:'absolute',
        marginTop:theme.spacing(15),
        marginLeft:theme.spacing(10),
        width:'80%' 
      },
      champs1:{
        position:'absolute',
        fontSize:'18px',
        marginTop:theme.spacing(25),
        marginLeft:theme.spacing(3),
    },
    champs2:{
        position:'absolute',
        fontSize:'18px',
        marginTop:theme.spacing(32),
        marginLeft:theme.spacing(3),
    },
    champs3:{
        position:'absolute',
        fontSize:'18px',
        marginTop:theme.spacing(55),
        marginLeft:theme.spacing(3),
    },
    champs4:{
        position:'absolute',
        fontSize:'18px',
        marginTop:theme.spacing(60),
        marginLeft:theme.spacing(3),
    },
    champs5:{
        position:'absolute',
        fontSize:'18px',
        marginTop:theme.spacing(65),
        marginLeft:theme.spacing(3),
    },
    sepa1:{
        position:'absolute',
        fontSize:'18px',
        marginTop:theme.spacing(28),
        marginLeft:theme.spacing(3),
    },
    sepa2:{
        position:'absolute',
        fontSize:'18px',
        marginTop:theme.spacing(51),
        marginLeft:theme.spacing(3),
    },
}));

const VisualiseSujet = ()=>{
   var classes = useStyles();
    const [titre,setitre] = useState('');
    const [description,sedescription] = useState('');
    const [theme,setheme] = useState('');
    const [Binome,setBinome] = useState('');
    const [Code, setCode] = useState('');
    const [Code1, setCode1] = useState('');
    const [response, setresponse] = useState('');
    const [OpenFen, SetOpenfen]=useState(false);
var sepa='----------------------------------------------------------------------';
var no = '.............................................'
const VoirSujet =async (e) => {
    
console.log('IN EST DANS VOIR SUJET   ');
        
// console.log('on a un filtre ', filtres[0], '--', champs[0]);
await axios({
        method: "post",
        url: "http://localhost:5000/Utilisateur/TableauDeBord/SujetF1",
        withCredentials: true,
         data: {
          filtre1: 'code',
          champ1: Code,
            }
          }).then((res) => {
            console.log('REEEEESS ',res.status);
            console.log(res.data)
            if (res.status == 200 &&  res.data.length!=0) {
             setresponse('voila le sujet recherché !');
             setitre(res.data[0].sujet.titre);
             sedescription(res.data[0].sujet.description);
             setheme(res.data[0].sujet.theme);
             setBinome(res.data[0].sujet.Binome);
             setCode1(res.data[0].sujet.code);
             console.log('titre : ',titre)
             
            } else {
                setresponse('Aucun sujet ne correspond a la recherche');
            }
            SetOpenfen(true);
          })
      };

    return (
        <div>
            <NavBar />
            
            <Paper className={classes.paper} elevation={20} >
          
            <form noValidate>
          <TextField
          className={classes.code}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="text"
            label="code du sujet"
            type="text"
            id="text"
            autoComplete="text"
            onChange={(e) =>{
                setitre('');
                sedescription('');
                setheme('');
                setBinome('');
                setCode1('');
                setCode(e.target.value)
            }}
            value={Code}
          />
           <Button
            className={classes.button}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e)=>{e.preventDefault(); console.log('clique',Code);VoirSujet();}}
          >
            Search
              </Button>

              <Typography className={classes.champs1}>
                    Titre : {titre||no}
                    </Typography>
                    <Typography className={classes.sepa1}>
                    {sepa}
                    </Typography>
                    <Typography className={classes.champs2} >
                    Description : {description||no}
                    </Typography>
                    <Typography className={classes.sepa2}>
                    {sepa}
                    </Typography>
                    <Typography className={classes.champs3} >
                    Theme : {theme||no}
                    </Typography>
                    <Typography className={classes.champs4} >
                    Binome : {Binome||no}
                    </Typography>
                    <Typography className={classes.champs5} >
                    Code : {Code1||no}
                    </Typography>
          </form>
            </Paper>
            <FenPop 
          OpenFen={OpenFen} 
          SetOpenfen={SetOpenfen} 
          sujet=' Recherches de sujets '
           message={response} 
           />
        </div>
    );
};
export default VisualiseSujet;