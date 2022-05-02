const mongoose = require('mongoose');




const NotificationSchema = new mongoose.Schema(
    {
        Auteur:String,
        Destinataire:String,
        Contenu:{
            type:String,
            maxlength:3000},
        Etat:Boolean,
        Date:Date,
    }
);



module.exports = mongoose.model('Notification',NotificationSchema);