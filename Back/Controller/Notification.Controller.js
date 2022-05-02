const Notification = require('../Models/Notification.Model');

module.exports.NewNotif = async (auteur, destinataire, contenu) => {

    console.log('CREATION D UNE NOTIFICATION !!!')
    const notif = new Notification({
        Auteur: auteur,
        Destinataire: destinataire,
        Contenu: contenu,
        Date: Date.now(),
        Etat: false,

    });
    notif.save().then(() => {
        console.log('lid est : ', notif._id);
        console.log('notre Notif est la  : ', sujeti);
        return true;
    })
        .catch(error => { return false; });


}
module.exports.VuNotif = async (req) => {

    if (req.body)
        if (req.body.Destinataire == 'Enseignant' || req.body.Destinataire == 'Etudiant') {
            console.log('Notif : ', req.body.id, ' Vu ');
        } else {
            Notification.findOneAndUpdate(
                { _id: req.body.id },
                { $set: { 'Etat': true } },
                { new: true, upsert: true, setDefaultsOnInsert: true },
                (err, docs) => {
                    if (!err) {
                        console.log('Notif : ', req.body.id, ' Vu ');
                    }
                    else console.log('Notif : ', req.body.id, ' erreur ');
                }
            )
        }
}
module.exports.MesNotif = async (req, res) => {
    console.log('---------------------------- dans mes notif')
    console.log(req.body.idf);
    console.log('------------------------------');
    var dest2='';
    if(req.body.role=='Binome'){
        dest2='Etudiant';
    }
    Notification.find({ $or: [{ 'Destinataire': req.body.idf },{ 'Destinataire': req.body.id },{ 'Destinataire': req.body.role },{'Destinataire': dest2 }] },(err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.status(200).json(docs);
        }
        else console.log(' on a un souci : ' + err);
    }).sort({Date:-1});
}

module.exports.NewDeadLine = async (req, res) => {

    console.log('CREATION D UNE NOTIFICATION  DEAD LINE!!!')
    const notif = new Notification({
        Auteur: req.body.auteur,
        Destinataire: req.body.destinataire,
        Contenu: req.body.contenu +' A la date : '+req.body.date,
        Date: req.body.date,
        Etat: false,

    });
    notif.save().then(() => {
        console.log('lid est : ', notif._id);

        res.status(200).json('COOL');
    })
        .catch(error => { res.status(205); });


}