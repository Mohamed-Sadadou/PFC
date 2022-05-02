const router = require('express').Router();
const AdminController =  require('../Controller/Admin.Controller');
const SujetController = require('../Controller/Sujet.Controller');
const midauth = require('../middleware/auth.middleware')
const Chek= require('../middleware/auth.middleware'); 

const ModificationRoute = require('./ModificationSujet.routes');
const BinomeController =  require('../Controller/Binome.Controller');
//const AffectationRoute = require('./');
//pour CreeSujetInterne

//router.get("/",SujetController.CreeSujetinterne);



router.post("/CreeCompteBinome",BinomeController.CreeCompteBinome);

router.get("/GetBinomes",Chek.chekAdmin,BinomeController.ToutBinome);

router.post("/GetBinomeIdf",Chek.chekAdmin,BinomeController.BinomeParIdf);

router.post("/BinomeParspecialite",Chek.chekAdmin,BinomeController.BinomeParspecialite);

router.post("/BinomeParvalidite",Chek.chekAdmin,BinomeController.BinomeParvalidite);

router.post("/BinomeParASujet",Chek.chekAdmin,BinomeController.BinomeParASujet);

router.get("/MesBinomes",BinomeController.MesBinomes);

//router.post("/Mesbinomes",BinomeController.GetBinome)

router.post("/ValideCompteBinome",BinomeController.ValiderCompteBinome);

router.post("/SupprimerBinomes",BinomeController.SupprimerBinomes);

router.post("/PostulerSujet",BinomeController.PostulerSujet);

router.post("/ModifierTitreSujet",Chek.chekBinome,BinomeController.modifierTitreB);

router.post("/ModifierDescriptionSujet",Chek.chekBinome,BinomeController.modifierDescriptionB);

router.post('/UnFiltre',BinomeController.BinomeParUnFiltre);

router.post('/DeuxFiltre',BinomeController.BinomeParDeuxFiltre);

router.post('/TroisFiltre',BinomeController.BinomeParTroisFiltre);

router.post('/QuatreFiltre',BinomeController.BinomeParQuatreFiltre);



module.exports = router;