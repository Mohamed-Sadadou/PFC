const router = require('express').Router();
const Notification = require('../Controller/Notification.Controller');




router.post("/Notifier",Notification.NewNotif);
router.post("/VuNotif",Notification.VuNotif);
router.post("/MesNotif",Notification.MesNotif);
router.post("/CreeDeadLine",Notification.NewDeadLine);
module.exports = router;