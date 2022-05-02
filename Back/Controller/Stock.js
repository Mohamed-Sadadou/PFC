//************************************************************************************************************** */
module.exports.sujetParThemeTitre = (req, res) => {


    Sujet.find({ 'sujet.type': req.body.type, 'sujet.titre': req.body.titre }, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//******************************** */
module.exports.sujetParThemeType = (req, res) => {


    Sujet.find({ 'sujet.type': req.body.type, 'sujet.theme': req.body.theme }, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//******************************* */
module.exports.sujetParThemeNiveau = (req, res) => {


    Sujet.find({ 'sujet.type': req.body.type, 'sujet.niveau': req.body.niveau }, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//******************************************** */
module.exports.sujetParThemeSpecialite = (req, res) => {

    var query = Binome.find(null);
    query.where({'specialite': req.body.specialite,'sujet.type': req.body.type});
    //query.limit(3);
    // peut s'écrire aussi query.where('pseudo', 'Atinux').limit(3);
    var sujetss;
    query.exec(function (err, Bin) {
        if (err) { throw err; }
        // On va parcourir le résultat et les afficher joliment
        var bin;
        for (var i = 0, l = Bin.length; i < l; i++) {
            bin = Bin[i];
            Sujet.find({ 'sujet.Binome': bin._id }, (err, docs) => {
                if (!err) {
                    console.log('on a trouver ca : ', docs);
                    console.log('---- ', docs);
                    sujetss.push(docs);
                }
                else console.log(' on a un souci : ' + err);
            });
        }
        sujetss.forEach(element => {
            console.log('----- ', element);
        });
        return res.send(sujetss);
    });
};
//*************************************************************************************************************** */

//************************************************************************************************************** */
//******************************** */
module.exports.sujetParTitreType = (req, res) => {


    Sujet.find({ 'sujet.type': req.body.type,'sujet.titre': req.body.titre }, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//******************************* */
module.exports.sujetParTitreNiveau = (req, res) => {


    Sujet.find({'sujet.titre': req.body.titre, 'sujet.niveau': req.body.niveau }, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//******************************************** */
module.exports.sujetParTitreSpecialite = (req, res) => {

    var query = Binome.find(null);
    query.where({'specialite': req.body.specialite,'sujet.titre': req.body.titre});
    //query.limit(3);
    // peut s'écrire aussi query.where('pseudo', 'Atinux').limit(3);
    var sujetss;
    query.exec(function (err, Bin) {
        if (err) { throw err; }
        // On va parcourir le résultat et les afficher joliment
        var bin;
        for (var i = 0, l = Bin.length; i < l; i++) {
            bin = Bin[i];
            Sujet.find({ 'sujet.Binome': bin._id }, (err, docs) => {
                if (!err) {
                    console.log('on a trouver ca : ', docs);
                    console.log('---- ', docs);
                    sujetss.push(docs);
                }
                else console.log(' on a un souci : ' + err);
            });
        }
        sujetss.forEach(element => {
            console.log('----- ', element);
        });
        return res.send(sujetss);
    });
};
//*************************************************************************************************************** */
//******************************* */
module.exports.sujetParTypeNiveau = (req, res) => {


    Sujet.find({'sujet.type': req.body.type, 'sujet.niveau': req.body.niveau }, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//******************************************** */
module.exports.sujetParTypeSpecialite = (req, res) => {

    var query = Binome.find(null);
    query.where({'specialite': req.body.specialite});
    //query.limit(3);
    // peut s'écrire aussi query.where('pseudo', 'Atinux').limit(3);
    var sujetss;
    query.exec(function (err, Bin) {
        if (err) { throw err; }
        // On va parcourir le résultat et les afficher joliment
        var bin;
        for (var i = 0, l = Bin.length; i < l; i++) {
            bin = Bin[i];
            Sujet.find({ 'sujet.Binome': bin._id }, (err, docs) => {
                if (!err) {
                    console.log('on a trouver ca : ', docs);
                    console.log('---- ', docs);
                    sujetss.push(docs);
                }
                else console.log(' on a un souci : ' + err);
            });
        }
        sujetss.forEach(element => {
            console.log('----- ', element);
        });
        return res.send(sujetss);
    });
};
//*****************************************************************************************************************/
//*****************************************************************************************************************/