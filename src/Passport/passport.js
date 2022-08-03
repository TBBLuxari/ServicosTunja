const { use } = require('passport');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../Modelos/modelos');
const Notificacion= require('../Modelos/notificacion');

passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser(async(id,done) => {
   const user = await Usuario.findById(id);
   done(null,user);
});

passport.use('local-singup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},async(req,email,password,done)=>{

    //Preguntar si ya existe 
    const user = await Usuario.findOne({'email': email})
    //console.log(user)

    if(user) // si exsite 
    {
        return done(null, false, {message:"Este correo ya esta en uso"});
    }
    else
    {
        //Ingresar usuario nuevo
        const newUser = new Usuario();
        const newNoti = new Notificacion();
        newUser.email = email;
        //user.password = password;
        newUser.password = newUser.encryptPassword(password);
        newUser.activo = 0;
        newUser.nombre = req.body.nombre;
        newUser.puntos = 0;
        newNoti.correo = req.body.email;
        newNoti.titulo  ="Titulo";
        newNoti.mensaje ="Mensaje";
        newNoti.link ="Link";
        await newUser.save();
        await newNoti.save();
        done(null,newUser);
    }
}));


passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {

    const user = await Usuario.findOne({email: email});

    if(!user) 
    {
      return done(null, false, { message: 'No se econtro el correo'});
    }
    if(!user.comparePassword(password)) 
    {
      return done(null, false, { message:'Contraseña incorrecta'});
    }
 
    return done(null, user);

  }));