const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
//const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
require('./Database/database');
require('./Passport/passport')
const uri ="mongodb+srv://TBBLuxari:DMc53jwH5CIQAryP@prueba-puntos.veb9sop.mongodb.net/?retryWrites=true&w=majority"
//-------------------------------------------------------------------Middleware--------------------------
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
//app.use(cookieParser());
//---------------------------
app.use(session({
    secret: 'CuentameloCuentameloTODO',
    resave: false,
    saveUninitialized: false
}));
//---------------------------
app.use(passport.initialize());
app.use(passport.session());
//-------------------------------------------------------Rutas--------------------------------------------------------------------------
app.use('/',require('./Rutas/index'));

//-----------------------------------------------------------iniciar servidor-----------------------------------------------------------
app.listen(port,()=>{console.log("Se inicio el servidor en el puerto " + port )});