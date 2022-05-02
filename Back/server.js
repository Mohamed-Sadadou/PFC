// les declarations 
const express = require('express');
const bodyparser = require('body-parser');
const cookieparser =  require('cookie-parser');
const cors = require('cors');
const use = require('./Controller/Utilisateur.Controller')
const userRoutes = require("./Routes/User.routes");
const PORT = 5000;
const app = express();

//const http= require('http');
//const server = http.createServer(app);

require('./Models/BD');


const corsOptions={
    origin: 'http://localhost:3000',
    credentials:true,
    'allowedHeaders':['sessionId','Content-Type'],
    'exposedHeaders':['sessionId'],
    'methods':'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue':false
}


app.use(cors(corsOptions));
app.use(bodyparser.json());
app.use(cookieparser()); 
app.use(bodyparser.urlencoded({extended: true}));

// routeur

app.use('/Utilisateur', userRoutes)

// on lance l'app

//use.CreeCompte1();
app.listen(PORT,()=>{
    console.log('on ecoute le port :', PORT);
});