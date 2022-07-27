const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const app = express();
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
require('./database');
require('./passport/local-auth');
//-----------------------------------------------------------configuracion--------------------------------------------------------------
const port = process.env.PORT || 3000;
//--Ejs
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');
//-------------------------------------------------------Middlewares--------------------------------------------------------------------------
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'CuentameloCuentameloTODO',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    //app.locals.signinMessage = req.flash('signinMessage');
    app.locals.CorreoExistente = req.flash('CorreoExistente');
    app.locals.CorreoNoEncontrado = req.flash('CorreoNoEncontrado');
    app.locals.Contraseña = req.flash('Contraseña');

    //app.locals.user = req.user;
    //console.log(app.locals)
    next();
  });

//-------------------------------------------------------Rutas--------------------------------------------------------------------------
app.use('/',require('./routes/index'));

//-----------------------------------------------------------iniciar servidor-----------------------------------------------------------
app.listen(port,()=>{console.log("Se inicio el servidor en el puerto " + port )});