const jwt = require('jsonwebtoken');
const UserModel = require('../Models/Utilisateur.Model');
const EnseignantModel = require('../Models/Enseignant.Model');


module.exports.chekType = (req, res, next,type) => {
    const id = req.cookies.jwt;
    var roles=[];
    console.log('on chek ce token :', id);
    if (id) {
        jwt.verify(id, 'Token_secret_PFE', async (err, decodedid) => {
            if (err) {
                res.locals.user = null;
                res.cookies('jwt', '', { maxAge: 1 });
                next();
            } else {
                UserModel.findOne({ idf: decodedid.userId })
                    .then(user => {
                        if (!user) {
                            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
                        }
                        EnseignantModel.findOne({ _id: user.role.numerp })
                            .then(ens => {
                                if (!ens) {
                                    return res.status(401).json({ error: 'Utilisateur non trouvé !' });
                                }
                                roles=ens.roles;
                                if(!error && ens != null ){
                                    return res.status(200).json({message:'roles !!',roles});
                                }
                                

                            })
                            .catch(error => res.status(500).json({ error }));
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        }
        )
    } else {
        console.log('mauvais token');
        res.locals.user = null;
        return res.status(404).json({ error: 'ta pas le droit frere' });

    }

}

module.exports.chekJury = (req, res, next) => {
    this.chekType(req, res, next, 'Jury');
};

module.exports.chekResponsable = (req, res, next) => {
    this.chekType(req, res, next, 'responsable de specialite');
};

module.exports.chekCommission = (req, res, next) => {
    this.chekType(req, res, next, 'Commission');
};
/*
module.exports.chekBinome = (req, res, next) => {
    this.chekType(req, res, next, 'Binome');
};*/