const mongoose = require('mongoose');
const UserRole = require("./RoleUser.Schema");
const bcrypt = require('bcrypt');

const UtilisateurSchema = new mongoose.Schema(
    {
        idf:{
            type:String,
            required: true,
            unique: true,
            trim: true

        },

        mdp:{
            type:String,
            required: true
            

        },

        nomUtilisateur:{
            type:String,
            required: true,
            trim: true

        },

        role:UserRole

    }
);



module.exports = mongoose.model('UtilisateurSchema',UtilisateurSchema);