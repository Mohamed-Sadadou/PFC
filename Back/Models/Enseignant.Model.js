const mongoose = require('mongoose');
const { isEmail } = require('validator');
const roleSchema = require("./Role.Schema");


const EnseignantSchema = new mongoose.Schema(
    {
        grade:{
            type:String,
            required: true,
            trim: true

        },

        specialite:{
            type:String,
            required: true,
            trim: true

        },

        numero:{
            type:String,
            required: true,
            unique: true,
            trim: true

        },
     
        email:{
             type: String,
             required:true,
             validate: [isEmail],
             lowercase: true,
             trim:true
        },
         
        etablissement:{
           type:String,
           required:true,
           trim:true
        },
        roles:[roleSchema]

    }
);



module.exports = mongoose.model('EnseignantSchema',EnseignantSchema);