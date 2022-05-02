const router = require('express').Router();
const AdminController =  require('../Controller/Admin.Controller');
const SujetController = require('../Controller/Sujet.Controller');
const midauth = require('../middleware/auth.middleware')
const Chek= require('../middleware/auth.middleware'); 
const TableauDeBord=require('../routes/TableauDeBord.routes')

const RechercheRoutes = require("./Recherche.routes");

//pour creeCompteEtudiant

router.post("/CreeCompteEtudiant",AdminController.CreeCompteEtudiant);

//pour creeCompteEtudiant

router.post("/CreeCompteEnseignant",AdminController.CreeCompteEnseignant);

//pour creeCompteResponsable

router.post("/creeCompteResponsable",AdminController.CreeCompteResponsable);


//pour creeCompteJury

router.post("/creeCompteJury",AdminController.CreeCompteJury);

//
router.post('/NewSujetExterne',SujetController.CreeSujetExterne);


// Recherches

router.use('/recherche',RechercheRoutes);

router.use('/TableauDeBord',TableauDeBord);

//router.post("/modifersujet",SujetController.modifierTitreE);

module.exports = router;