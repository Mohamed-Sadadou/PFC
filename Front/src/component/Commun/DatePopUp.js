import React, { useEffect, useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import FenPop from '../Commun/FenetrePopUp';
import 'date-fns';
import axios from 'axios';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { UidContext, RoleUContext ,UIDFContext} from '../AppContexte';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
specialite:{
position:'absolute',
marginLeft:theme.spacing(-20),
marginTop:theme.spacing(7),
width:'370px',
},
sujet:{
 // position:'absolute',
  marginLeft:theme.spacing(-20),
  marginTop:theme.spacing(17),
  width:'370px',
  },

}));
export default function AlertDialogSlide(props) {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const idf = useContext(UIDFContext);
  const classes = useStyles();
  const { title, children, OpenFen, SetOpenfen } = props;
  const [response, setresponse] = React.useState('');
  const [dest, setdest] = React.useState('');
  const [sujet, setsujet] = React.useState('');
  const [OpenFen2,SetOpenfen2]=React.useState(false);
  const [openspecialite, setOpenspecialite] = React.useState(false);
  const [specialite, setspecialite] = useState('')
  const handleClosespecialite = () => {
    setOpenspecialite(false);
  };
  const handleOpenspecialite = () => {
    setOpenspecialite(true);
  };

  const handleClickOpen = () => {
    SetOpenfen(true);
  };

  const handleClose = () => {
    SetOpenfen(false);
  };
  const NewDeadLine = async (e) => {

    console.log('LAAA DAAATEEE , ', selectedDate);
    console.log('Le destinataire , ', dest);
    console.log('Sujet , ', sujet);
    if (sujet == "" || dest == "" ||selectedDate=="") {
      setresponse('Veuillez remplir tout les champs')
      SetOpenfen2(true);
    } else {
      await axios({
         method: "post",
         url: "http://localhost:5000/Utilisateur/NewDeadLine",
         withCredentials: true,
         data: {
           auteur:idf,
           destinataire:dest,
           contenu:sujet,
           date:selectedDate,
         
         }
       }).then((res) => {
         if (res.status == 200) {
           setresponse ( 'Nouvelle DeadLine Ajouter');       
           console.log(response);
         } else {
           if (res.status == 205) {
             setresponse ('Erreur lors de l ajout');
             console.log(response);
           }    
         }
         SetOpenfen2(true);
       })
      }
    handleClose();
  };

  return (
    <div>

      <Dialog 
        open={OpenFen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{props.sujet}</DialogTitle>
        <DialogContent>
          <form className={classes.container} noValidate>
            <TextField
              id="date"
              label="DeadLine"
              type="date"
              defaultValue="2021-06-29"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setSelectedDate(e.target.value)}
               value={selectedDate}
            />
            <FormControl className={classes.specialite} >
              <InputLabel id="demo-controlled-open-select-label">Destinataire</InputLabel>
              <Select className={classes.chek}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openspecialite}
                onClose={handleClosespecialite}
                onOpen={handleOpenspecialite}
                value={dest}
                onChange={(e) => { setdest(e.target.value); setOpenspecialite(true);handleClosespecialite(); }}
                value={dest}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value='Etudiant'>Etudiant</MenuItem>
                <MenuItem value='Enseignant'>Enseignant</MenuItem>
                

              </Select>
            </FormControl>
          <TextField
          className={classes.sujet}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="text"
            label="Sujet de la DeadLine"
            type="text"
            id="text"
            autoComplete="text"
            onChange={(e) => setsujet(e.target.value)}
            value={sujet}
          />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={NewDeadLine} color="primary">
            Valider
          </Button>

        </DialogActions>
        <FenPop 
          OpenFen={OpenFen2} 
          SetOpenfen={SetOpenfen2} 
          sujet=' Ajout dead line '
           message={response} 
           />
      </Dialog>
    </div>
  );
}