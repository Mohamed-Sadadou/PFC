import { React, useContext, useState,useEffect } from 'react';
import NavBar from "../Commun/NavBar";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { UidContext, RoleUContext, UIDFContext, UserNameContext } from '../AppContexte';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { blue } from '@material-ui/core/colors';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },

    tout: {
        width: '40%',
        height: '40%',
        marginLeft: theme.spacing(75),
        marginTop: theme.spacing(2),
   },

    avatar: {
        width: '200px',
        height: '200px',
        margin: theme.spacing(0),
        boxShadow: '2px 5px 5px black',
        marginLeft: theme.spacing(51),
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.info.dark,
    },
    account: {
        width: '200px',
        height: '200px',
        margin: theme.spacing(0),
        marginLeft: theme.spacing(0),
        marginTop: theme.spacing(0),
        backgroundColor: theme.palette.info.dark,
    },

    paper: {
        backgroundColor: blue[50],
        marginLeft: theme.spacing(40),
        width: 380,
        height: 490,
        borderRadius: 30,
        marginTop: theme.spacing(-5),
        //boxShadow: '2px 5px 30px black',
    },
    paper2: {
        backgroundColor: blue[50],
        marginLeft: theme.spacing(100),
        width: 570,
        height: 380,
        borderRadius: 30,
        marginTop: theme.spacing(-80),
        //boxShadow: '2px 5px 30px black',
    },
    paper3: {
        backgroundColor: blue[50],
        marginLeft: theme.spacing(100),
        width: 570,
        height: 200,
        borderRadius: 30,
        marginTop: theme.spacing(7),
        //boxShadow: '2px 5px 30px black',
    },
    title: {
        position:'absolute',
        fontSize:'24px',
        marginLeft: theme.spacing(10),
        marginTop: theme.spacing(9),
    },
    title2: {
        position:'absolute',
        fontSize:'24px',
        marginLeft: theme.spacing(24),
        marginTop: theme.spacing(0),
    },
    divider: {
        position:'absolute',
        width:'20px',
        marginTop: theme.spacing(90),
        marginLeft:theme.spacing(60),
      },
      idf:{
        position:'absolute',
        fontSize:'18px',
        marginTop: theme.spacing(20),
        marginLeft:theme.spacing(5),
      },
      role:{
        position:'absolute',
        fontSize:'18px',
        marginTop: theme.spacing(30),
        marginLeft:theme.spacing(5),
      },
      id:{
        position:'absolute',
        fontSize:'18px',
        marginTop: theme.spacing(40),
        marginLeft:theme.spacing(5),
      },
      idf2:{
        position:'absolute',
        fontSize:'18px',
        marginTop: theme.spacing(20),
        marginLeft:theme.spacing(15),
      },
      role2:{
        position:'absolute',
        fontSize:'18px',
        marginTop: theme.spacing(30),
        marginLeft:theme.spacing(15),
      },
      id2:{
        position:'absolute',
        fontSize:'16px',
        marginTop: theme.spacing(50),
        marginLeft:theme.spacing(5),
      },
      form2:{
        position:'absolute',
        width:'250px',
        marginTop:theme.spacing(4),
        marginLeft:theme.spacing(37),
    },
      form1:{
        position:'absolute',
        width:'250px',
        marginTop:theme.spacing(4),
        marginLeft:theme.spacing(4),
        
    },
      

    champs1:{
        position:'absolute',
        fontSize:'18px',
        marginTop:theme.spacing(10),
        marginLeft:theme.spacing(3),
    },
    camps1:{
        position:'absolute',
        fontSize:'18px',
        marginTop:theme.spacing(10),
        marginLeft:theme.spacing(18),
    },
    champs2:{
        position:'absolute',
        fontSize:'18px',
        marginTop:theme.spacing(16),
        marginLeft:theme.spacing(3),
    },
    camps2:{
        position:'absolute',
        fontSize:'18px',
        marginTop:theme.spacing(16),
        marginLeft:theme.spacing(18),
    },
    champs3:{
        position:'absolute',
        fontSize:'18px',
        marginTop:theme.spacing(22),
        marginLeft:theme.spacing(3),
    },
    camps3:{
        position:'absolute',
        fontSize:'18px',
        marginTop:theme.spacing(22),
        marginLeft:theme.spacing(18),
    },
    champs4:{
        position:'absolute',
        fontSize:'18px',
        marginTop:theme.spacing(28),
        marginLeft:theme.spacing(3),
    },
    camps4:{
        position:'absolute',
        fontSize:'18px',
        marginTop:theme.spacing(28),
        marginLeft:theme.spacing(18),
    },
    champs5:{
        position:'absolute',
        fontSize:'18px',
        marginTop:theme.spacing(34),
        marginLeft:theme.spacing(3),
    },
    camps5:{
        position:'absolute',
        fontSize:'18px',
        marginTop:theme.spacing(34),
        marginLeft:theme.spacing(21),
    },



}));




const ProfilPage = () => {

    var response;
    var classes;
    var uid;
    var role;
    var idf;
    var username;

    const [Binome,setBinome]=useState('')
    const [Etudiant,setEtudiant]=useState('')
    const [Enseignant,setEnseignant]=useState('')

    classes = useStyles();
    uid = useContext(UidContext);
    role = useContext(RoleUContext);
    idf = useContext(UIDFContext);
    username = useContext(UserNameContext);

    const [NewUserName, SetUserName] = useState('');
    const [NewPassWord, SetPassWord] = useState('');

    const [grade,setgrade] = useState('');
    const [specialite,setspecialite] = useState('');
    const [numero,setnumero] = useState('');
    const [email,setemail] = useState('');
    const [etablissement,setetablissement] = useState('');

    const [section,setsection] = useState('');
    const [specialiteE,setspecialiteE] = useState('');
    const [groupe,setgroupe] = useState('');
    const [emailE,setemailE] = useState('');
    const [niveau,setniveau] = useState('');

    const [Etudiant1,setEtudiant1] = useState('');
    const [Etudiant2,setEtudiant2] = useState('');
    const [specialiteB,setspecialiteB] = useState('');
    const [valide,setvalide] = useState('');
    const [niveauB,setniveauB] = useState('');


    const validee= (val)=>{
        if(val)return ('Validé')
        else return('Non Validé')
         }

    const NewUserNameChange = async () => {
        console.log('----------------');
        console.log('----------------');
        console.log('----------------');
        console.log('le udi : ', uid, 'le user name : ', NewUserName);

        await axios({
            method: "post",
            url: "http://localhost:5000/Utilisateur/compte/modifierNomUtilisateur",
            withCredentials: true,
            data: {
                id: uid,
                nomUtilisateur: NewUserName,
            }
        }).then((res) => {
            console.log('les status : ' + res.status);
            if (res.status == 200) {
                response = 'Modification User Name reussi';
                console.log(response);
                console.log(res.data)
                username = NewUserName;

            } else {
                if (res.status == 500) {
                    response = 'Modification User Name echouer';
                    console.log(response);
                }

            }
        })
    }

    const NewMdpChange = async () => {
        console.log('----------------');
        console.log('----------------');
        console.log('----------------');
        console.log('le udi : ', uid, 'le user name : ', NewPassWord);
        await axios({
            method: "post",
            url: "http://localhost:5000/Utilisateur/compte/modifierpassword",
            withCredentials: true,
            data: {
                id: uid,
                mdp: NewPassWord,
            }
        }).then((res) => {
            console.log('les status : ' + res.status);
            if (res.status == 200) {
                response = 'Modification Mot de passe reussi'
                console.log(response);
                console.log(res.data)

            } else {
                if (res.status == 500) {
                    response = 'Modification Mot de passe echouer';
                    console.log(response);
                }

            }
        })
    }

    const getBinome = async() =>{
        console.log('on a un filtre ', idf, '--', idf);
        await axios({
          method: "post",
          url: "http://localhost:5000/Utilisateur/TableauDeBord/GetBinomeF1",
          withCredentials: true,
          data: {
            filtre1: 'idf',
            champ1: idf,

          }
        }).then((res) => {
            
          if (res.status == 200) {
            console.log('-----------------')
            console.log('-----------------')
            
            if (res.data.length==0) { console.log('PROBLEME') }
             else{
                setBinome(res.data);
                console.log('EEEEEWWWWWW ',res.data)
                setEtudiant1(res.data[0].etudiant1[0].nomUtilisateur)
                setEtudiant2(res.data[0].etudiant2[0].nomUtilisateur)
                setspecialiteB(res.data[0].specialite)
                setvalide(validee(res.data[0].valide))
                setniveauB(res.data[0].niveau)}
          } 
          
        }).catch((err)=>console.log("thardeeeet !!!!",err))
    }

    const getEtu = async() =>{
        console.log('on a un filtre ', idf, '--', idf);
        await axios({
          method: "post",
          url: "http://localhost:5000/Utilisateur/TableauDeBord/Etudiant1",
          withCredentials: true,
          data: {
            filtre1: 'idf',
            champ1: idf,

          }
        }).then((res) => {
            
          if (res.status == 200) {
            console.log('-----------------')
            console.log('-----------------')
            
            if (res.data.length==0) { console.log('PROBLEME') }
             else{
                setEtudiant(res.data);
                console.log('EEEEEWWWWWW ',res.data)
                setsection(res.data[0].etudiant[0].section)
                setspecialiteE(res.data[0].etudiant[0].specialite)
                setgroupe(res.data[0].etudiant[0].groupe)
                setemailE(res.data[0].etudiant[0].email)
                setniveau(res.data[0].etudiant[0].niveau)}
          } 
          
        }).catch((err)=>console.log("thardeeeet !!!!",err))
    }

    const getEns = async() =>{
        console.log('on a un filtre ', idf, '--', idf);
        await axios({
          method: "post",
          url: "http://localhost:5000/Utilisateur/TableauDeBord/Enseignant1",
          withCredentials: true,
          data: {
            filtre1: 'idf',
            champ1: idf,

          }
        }).then((res) => {
            
          if (res.status == 200) {
            console.log('-----------------')
            console.log('-----------------')
            
            if (res.data.length==0) { console.log('PROBLEME') }
             else{
                setEnseignant(res.data);
                console.log('EEEEEWWWWWW ',res.data)
                setgrade(res.data[0].enseignant[0].grade)
                setspecialite(res.data[0].enseignant[0].specialite)
                setnumero(res.data[0].enseignant[0].numero)
                setemail(res.data[0].enseignant[0].email)
                setetablissement(res.data[0].enseignant[0].etablissement)}
          } 
          
        }).catch((err)=>console.log("thardeeeet !!!!",err))
    }

    
    useEffect(() => {

        const stuff = async () => {
            if(role=='Enseignant'){
               await getEns();
             }else{
                 if(role=='Etudiant'){
                    await getEtu();
                 }else{
                     if(role=='Binome'){
                        await  getBinome();
                     }
                 }
             }
        }
 
        stuff();
       
    }, [])
    function AfficheDonnéesRoles(props) {

        if (role == 'admin') {
          return (
            <div>
               <Typography className={classes.title2}  >
                        Données {role} 
                    </Typography>
                    <Divider className={classes.divider}/>
                    <Typography className={classes.champs1}>
                   les Utilisateurs trouveront ici les Données lié a leurs 
                    </Typography>
                    <Typography className={classes.champs2}>
                    roles dans le site.
                    </Typography>
                   
            </div>
          );
        } else {
          if(role == 'Enseignant'){
            return (
                <div>
                  <Typography className={classes.title2}  >
                     Données {role} 
                    </Typography>
                    <Divider className={classes.divider}/>
                    <Typography className={classes.champs1}>
                   - Grade :
                    </Typography>
                    <Typography className={classes.champs2} >
                   - Specialite :
                    </Typography>
                    <Typography className={classes.champs3} >
                   - Numero :
                    </Typography>
                    <Typography className={classes.champs4} >
                   - Email :
                    </Typography>
                    <Typography className={classes.champs5} >
                   - Etablissement :
                    </Typography>

                    <Typography className={classes.camps1}>
                      {grade}
                    </Typography>
                    <Typography className={classes.camps2}>
                     {specialite}
                    </Typography>
                    <Typography className={classes.camps3}>
                     {numero}
                    </Typography>
                    <Typography className={classes.camps4}>
                     {email}
                    </Typography>
                    <Typography className={classes.camps5}>
                     {etablissement}
                    </Typography>
                </div>
              );
          }else{
              if(role == 'Etudiant'){
                return (
                    <div>
                      <Typography className={classes.title2}  >
                     Données {role} 
                    </Typography>
                    <Divider className={classes.divider}/>
                    <Typography className={classes.champs1}>
                   - Section :
                    </Typography>
                    <Typography className={classes.champs2} >
                   - Specialite :
                    </Typography>
                    <Typography className={classes.champs3} >
                   - Groupe :
                    </Typography>
                    <Typography className={classes.champs4} >
                   - Email :
                    </Typography>
                    <Typography className={classes.champs5} >
                   - Niveau :
                    </Typography>
                    <Typography className={classes.camps1}>
                      {section}
                    </Typography>
                    <Typography className={classes.camps2}>
                     {specialiteE}
                    </Typography>
                    <Typography className={classes.camps3}>
                     {groupe}
                    </Typography>
                    <Typography className={classes.camps4}>
                     {emailE}
                    </Typography>
                    <Typography className={classes.camps5}>
                     {niveau}
                    </Typography>
                    </div>
                  );
              }else{
                if(role == 'Binome'){
                    return (
                        <div>
                          <Typography className={classes.title2}  >
                     Données {role} 
                    </Typography>
                    <Divider className={classes.divider}/>
                    <Typography className={classes.champs1}>
                   - Etudiant1 :
                    </Typography>
                    <Typography className={classes.champs2} >
                   - Etudiant2 :
                    </Typography>
                    <Typography className={classes.champs3} >
                   - specialite :
                    </Typography>
                    <Typography className={classes.champs4} >
                   - valide :
                    </Typography>
                    <Typography className={classes.champs5} >
                   - Niveau :
                    </Typography>
                    <Typography className={classes.camps1}>
                      {Etudiant1}
                    </Typography>
                    <Typography className={classes.camps2}>
                     {Etudiant2}
                    </Typography>
                    <Typography className={classes.camps3}>
                     {specialiteB}
                    </Typography>
                    <Typography className={classes.camps4}>
                     {valide}
                    </Typography>
                    <Typography className={classes.camps5}>
                     {niveauB}
                    </Typography>
                        </div>
                      );
                  }else{
                      return(
                      <div></div>
                      );
                  }
              }
          }
        }
      };
  

    return (
        <div>
            <NavBar />
            <Avatar className={classes.avatar}>
                <AccountCircleOutlined className={classes.account} />
            </Avatar>
            
            <Paper className={classes.paper} elevation={20} >
          
                    <Typography className={classes.title}  >
                        Données Utilisateur
                       
                    </Typography>
                    <Divider className={classes.divider}/>
                    <Typography className={classes.idf}>
                   - IDF :
                    </Typography>
                    <Typography className={classes.role} >
                   - Role :
                    </Typography>
                    <Typography className={classes.id} >
                   - Nom d'Utilisateur :
                    </Typography>

                    <Typography className={classes.idf2}>
                      {idf}
                    </Typography>
                    <Typography className={classes.role2}>
                     {role}
                    </Typography>
                    <Typography className={classes.id2}>
                     {username}
                    </Typography>
            </Paper>

            <Paper className={classes.paper2} elevation={20} >
          
                   <AfficheDonnéesRoles/>
            </Paper>
            <Paper className={classes.paper3} elevation={20}>
            <form className={classes.form2}>
                   <TextField
                       variant="outlined"
                       margin="normal"
                       required
                       fullWidth
                       id="NewMdp"
                       type="password"
                       label="Nouveau Mot de passe"
                       name="NewMdp"
                       autoComplete="mdp"
                       autoFocus
                    onChange={(e) => SetPassWord(e.target.value)}
                    value={NewPassWord}
                   />
                   <Button className={classes.bouton}
                       type="submit"
                       fullWidth
                       variant="contained"
                       color="primary"
                   
                   onClick={NewMdpChange}
                   >
                       Modifier Mot de passe
                   </Button>
               </form>
               <form className={classes.form1}>
                   <TextField
                       variant="outlined"
                       margin="normal"
                       required
                       fullWidth
                       id="NewUserName"
                       label="Nouveau Nom d'indentification"
                       name="NewUserName"
                       autoComplete="NewUserName"
                       autoFocus
                    onChange={(e) => SetUserName(e.target.value)}
                    value={NewUserName}
                   />
                   <Button className={classes.bouton}
                       type="submit"
                       fullWidth
                       variant="contained"
                       color="primary"
                 
                       onClick={NewUserNameChange}
                   >
                       Modifier User Name
                   </Button>
               </form>
               </Paper>
        </div>
    );
};

export default ProfilPage;