const { use } = require('passport');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../Modelos/modelos');

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
        newUser.email = email;
        //user.password = password;
        newUser.password = newUser.encryptPassword(password);
        newUser.activo = 0;
        await newUser.save();
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