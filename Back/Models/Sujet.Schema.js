const mongoose = require('mongoose');
const FicheEvaluation = require("./FicheEvaluation.Schema");
const FicheValidation = require("./FicheValidation.Schema");
const SujetSchema = new mongoose.Schema(
    {
        code:{
            type:String,
            required:true,
            unique:true
        },
        titre:{
            type:String,
            required: true,
           

        },

        theme:{
            type:String,
            required: true,
            
            lowercase: true,
            trim: true

        },

        description:{
            type:String

        },

        tauxAvancement:{
            type:Number            
            
        },
        rapportURL:{
            type:String
        },
        typeSujet:{
            type:String
        },
        niveau:String,
        pris:Boolean,
        note:Number,
        ficheEvaluations:[FicheEvaluation],
        ficheValidations:[FicheValidation],
        postulant:[String],
        Binome:String,
        Specialite:String,
        Valide:Boolean


    }
);

module.exports = SujetSchema;
//module.exports = mongoose.model('Sujet',SujetSchema);