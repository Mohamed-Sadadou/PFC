const router = require('express').Router();
const UtilisateurController =  require('../Controller/Utilisateur.Controller');
const midauth = require('../middleware/auth.middleware')
const Chek = require('../middleware/auth.middleware')
const TableauDeBord=require('../routes/TableauDeBord.routes');
const Notification = require('../Controller/Notification.Controller')
const EnsController = require('../Controller/Enseignant.Controller')
const AdminRoutes = require('../Routes/Admin.routes')
const EnseignantRoutes = require('../Routes/Enseignant.routes')
const EtudiantRoutes = require('../Routes/Etudiant.routes')
//const TableauDeBord = require('../Routes/TableauDeBord.routes')
const BinomeRoutes = require('../Routes/Binome.routes')
//pour creeCompteAdmin

router.post("/creecompte",UtilisateurController.CreeCompte);

//pour se connecter

router.post("/connection",UtilisateurController.SeConnecter);

//pour se deconnecter

router.get("/deconnection",Chek.ChekUser,UtilisateurController.Deconnection);

router.post("/Notification",Notification.MesNotif);
router.post("/VuNotif",Notification.VuNotif);

//pour modifier nom d'utilisateru

router.post("/compte/modifierNomUtilisateur",Chek.ChekUser,UtilisateurController.ModifiUsername);

//pour modifier password

router.post("/compte/modifierpassword",Chek.ChekUser,UtilisateurController.ModifiUserpassword);

//****** pour renvoyer tout les utilisateurs ******/

router.get('/compte/GetAllUsers',Chek.ChekUser,Chek.chekAdmin, UtilisateurController.getAllUsers);

//****** pour renvoyer un seul utilisateur ********/

router.get('/compte/:id',Chek.ChekUser, UtilisateurController.getUsers);

router.get('/chektout',Chek.ChekTout);
router.get('/chekadm',Chek.chekAdmin);
router.get('/cheketd',Chek.chekEtudiant);
router.get('/chekens',Chek.chekEnseignant);
router.get('/chekbi',Chek.chekBinome);


router.post('/test',EnsController.GetEns);
//*********** on go voir les roles  *****************/

router.use('/pageAdmin',Chek.chekAdmin,AdminRoutes);

router.use('/pageEnseignant',Chek.chekEnseignant,EnseignantRoutes);

router.use('/pageEtudiant',Chek.chekEtudiant,EtudiantRoutes);

router.use('/TableauDeBord',TableauDeBord);

router.use('/pageBinome',BinomeRoutes);
router.use('/NewDeadLine',Notification.NewDeadLine);

module.exports = router;