const mongoose = require('mongoose');

const roleSchema = require("./Role.Schema");


const BinomeSchema = new mongoose.Schema(
    {
        idf:{
             type:String,
             unique:true
        },
        Etudiant1:mongoose.Schema.Types.ObjectID,
        Etudiant2:mongoose.Schema.Types.ObjectID,
        sujet:mongoose.Schema.Types.ObjectID,
        specialite:String,
        aSujet:Boolean,
        valide:Boolean,
        niveau:String,
        Postule:[mongoose.Schema.Types.ObjectID],
        SujetAcc:[mongoose.Schema.Types.ObjectID]

    }
);



module.exports = mongoose.model('BinomeSchema',BinomeSchema);