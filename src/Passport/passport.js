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
        newNoti.NA1={TNA1:"1" ,MNA1:"2" ,LNA1:"3"};
        newNoti.NA2={TNA2:"4" ,MNA2:"5" ,LNA2:"6"};
        newNoti.NA3={TNA3:"7" ,MNA3:"8" ,LNA3:"9"};
        newNoti.NA4={TNA4:"10" ,MNA4:"11" ,LNA4:"12"};
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