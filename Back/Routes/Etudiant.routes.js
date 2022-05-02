const router = require('express').Router();
const AdminController =  require('../Controller/Admin.Controller');
const SujetController = require('../Controller/Sujet.Controller');
const midauth = require('../middleware/auth.middleware')
const Chek= require('../middleware/auth.middleware'); 

const RechercheRoutes = require("./Recherche.routes");
const BinomeRoutes= require('../Routes/Binome.routes');
const etudiantController = require('../Controller/Etudiant.Controller');
//pour CreeSujetInterne



router.use("/Binome",BinomeRoutes);

router.use('/recherche',RechercheRoutes);

module.exports = router;