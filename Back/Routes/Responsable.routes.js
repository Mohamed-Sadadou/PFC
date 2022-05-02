const router = require('express').Router();
const AdminController = require('../Controller/Admin.Controller');

router.post('/DesignCommission',AdminController.CreeCompteCommission);
module.exports = router;
