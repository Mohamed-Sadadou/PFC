const router = require('express').Router();

const AdminController = require('../Controller/Admin.Controller');
const BinomeController = require('../Controller/Binome.Controller');
const EnseignantController = require('../Controller/Enseignant.Controller');
const EtudiantController = require('../Controller/Etudiant.Controller');
const SujetController = require('../Controller/Sujet.Controller');
const UsersController =  require('../Controller/Utilisateur.Controller');

router.post('/Users',UsersController.getAllUsers);

router.post('/GetBinome',BinomeController.GetBinome);
router.post('/GetmesBinome',BinomeController.GetMesBinome);
router.post('/GetBinomeF1',BinomeController.GetBinome1F);
router.post('/GetBinomeF2',BinomeController.GetBinome2F);
router.post('/GetBinomeF3',BinomeController.GetBinome3F);
router.post('/GetBinomeF4',BinomeController.GetBinome4F);

router.post('/Enseignant',EnseignantController.GetEns);
router.post('/Enseignant1',EnseignantController.GetEns1);
router.post('/EnseignantF1',EnseignantController.GetEns1F);
router.post('/EnseignantF2',EnseignantController.GetEns2F);
router.post('/EnseignantF3',EnseignantController.GetEns3F);
router.post('/EnseignantF4',EnseignantController.GetEns4F);

router.post('/Etudiant',EtudiantController.GetEtu);
router.post('/Etudiant1',EtudiantController.GetEtu1);
router.post('/EtudiantF1',EtudiantController.GetEtu1F);
router.post('/EtudiantF2',EtudiantController.GetEtu2F);
router.post('/EtudiantF3',EtudiantController.GetEtu3F);
router.post('/EtudiantF4',EtudiantController.GetEtu4F);

router.post('/Sujet',SujetController.ToutSujet);
router.post('/SujetCode',SujetController.sujetParcode);
router.post('/SujetCode2',SujetController.sujetParcode2);
router.post('/SujetF1',SujetController.sujetParUnFiltre);
router.post('/SujetF2',SujetController.sujetParDeuxFiltre);
router.post('/SujetF3',SujetController.sujetParTroisFiltre);
router.post('/SujetF4',SujetController.sujetParQuatreFiltre);
router.post('/SujetF5',SujetController.sujetParCinqueFiltre);
router.post('/SujetF6',SujetController.sujetParSixFiltre);
router.post('/SujetF7',SujetController.sujetParSeptFiltre);


module.exports = router;