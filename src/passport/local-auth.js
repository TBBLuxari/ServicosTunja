const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser(async(id,done) => {
   const user = await User.findById(id);
   done(null,user);
});

passport.use('local-singup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},async(req,email,password,done)=>{

    //Preguntar si ya existe 
    const user = await User.findOne({'email': email})
    //console.log(user)

    if(user) 
    {
        return done(null, false, req.flash('CorreoExistente', 'Este correo ya esta en uso \n por favor intentelo de nuevo'));
    }
    else
    {
        //Ingresar usuario nuevo
        const newUser = new User();
        newUser.email = email;
        //user.password = password;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null,newUser);
    }
}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {

    const user = await User.findOne({email: email});

    if(!user) 
    {
      return done(null, false, req.flash('CorreoNoEncontrado', 'No se econtro el correo'));
    }
    if(!user.comparePassword(password)) 
    {
      return done(null, false, req.flash('Contraseña', 'Contraseña incorrecta'));
    }
    //console.log('user');
    return done(null, user);

  }));