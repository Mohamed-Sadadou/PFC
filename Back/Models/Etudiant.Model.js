const mongoose = require('mongoose');
const { isEmail } = require('validator');
const roleSchema = require("./Role.Schema");


const EtudiantSchema = new mongoose.Schema(
    {
        section:{
            type:String,
            required: true,
            trim: true

        },

        specialite:{
            type:String,
            required: true,
            trim: true

        },

        groupe:{
            type:String,
            required: true,
            trim: true

        },
     
        email:{
             type: String,
             required:true,
             validate: [isEmail],
             lowercase: true,
             trim:true
        },
         
        niveau:{
           type:String,
           required:true,
           trim:true
        },
        date:Date,
        aBinome:Boolean,
        compteBinome:mongoose.Schema.Types.ObjectID

    }
);



module.exports = mongoose.model('EtudiantSchema',EtudiantSchema);