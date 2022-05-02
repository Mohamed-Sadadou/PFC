const router = require('express').Router();
const AdminController =  require('../Controller/Admin.Controller');
const SujetController = require('../Controller/Sujet.Controller');
const midauth = require('../middleware/auth.middleware')
const Chek= require('../middleware/auth.middleware'); 




router.post("/specialite",SujetController.sujetParspecialite);

router.post("/titre",SujetController.sujetPartitre);

router.post("/theme",SujetController.sujetPartheme);

router.post("/niveau",SujetController.sujetParniveau);

router.post("/type",SujetController.sujetPartype);

router.post('/modif',SujetController.modifierTitreE);

router.post('/UnFiltre',SujetController.sujetParUnFiltre);

router.post('/DeuxFiltre',SujetController.sujetParDeuxFiltre);

router.post('/TroisFiltre',SujetController.sujetParTroisFiltre);

router.post('/QuatreFiltre',SujetController.sujetParQuatreFiltre);

router.post('/CinqueFiltre',SujetController.sujetParCinqueFiltre);

router.post('/SixFiltre',SujetController.sujetParSixFiltre);




module.exports = router;