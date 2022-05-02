import React, { useEffect, useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import FenPop from './FenetrePopUp';
import 'date-fns';
import axios from 'axios';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { UidContext, RoleUContext, UIDFContext } from '../AppContexte';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="top" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  specialite: {
    position: 'absolute',
    marginLeft: theme.spacing(-20),
    marginTop: theme.spacing(7),
    width: '370px',
  },
  code: {
    // position:'absolute',
    marginLeft: theme.spacing(-0),
    marginTop: theme.spacing(0),
    width: '370px',
  },
  taux: {
    position: 'relative',
    marginLeft: theme.spacing(-46),
    marginTop: theme.spacing(10),
    width: '370px',
    heigh: '50px',
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
  const [Code, setCode] = React.useState('');
  const [sujet, setsujet] = React.useState('');
  const [OpenFen2, SetOpenfen2] = React.useState(false);
  const [openspecialite, setOpenspecialite] = React.useState(false);
  const [specialite, setspecialite] = useState('')

  const handleClickOpen = () => {
    SetOpenfen(true);
  };

  const handleClose = () => {
    SetOpenfen(false);
  };
  const ModifierDesc = async (e) => {

    console.log('on go modifier le sujet ');

    if (sujet == "" || Code == "") {
      setresponse('Veuillez remplir tout les champs')
      SetOpenfen2(true);
    } else {
      await axios({
        method: "post",
        url: "http://localhost:5000/Utilisateur/pageEnseignant/modifiersujet/ModifierDescription",
        withCredentials: true,
        data: {
          description: sujet,
          code: Code,
        }
      }).then((res) => {
        console.log('reeeeeesssss', res.status);
        if (res.status == 200) {
          console.log('200 chikh');
          setresponse('Description correctement modifier')
          console.log(response);

        } else {
          if (res.status == 250) {
            setresponse("Erreur ce n'est pas votre sujet ou sujet inconu");
            console.log(response);
          } else {
            if (res.status == 500) {
              setresponse('Erreur de modification');
              console.log(response);
            } else {
              setresponse('Erreur les champs sont mal renseigné ' + res.status.error);
              console.log(response);
            }
          }

        }
        SetOpenfen2(true);
      })
    }

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
          <form >
            <TextField
              className={classes.code}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="text"
              label="code du sujet a modifier"
              type="text"
              id="text"
              autoComplete="text"
              onChange={(e) => setCode(e.target.value)}
              value={Code}
            />
            <TextField
              className={classes.taux}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="text"
              label="La nouvelle description"
              type="text"
              id="text"
              autoComplete="text"
              onChange={(e) => setsujet(e.target.value)}
              value={sujet}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={ModifierDesc} color="primary">
            Valider
          </Button>

        </DialogActions>
        <FenPop
          OpenFen={OpenFen2}
          SetOpenfen={SetOpenfen2}
          sujet=" Modifer le taux d'avancement "
          message={response}
        />
      </Dialog>
    </div>
  );
}