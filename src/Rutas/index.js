const express = require('express');
const router = express.Router();
const passport = require('passport');
const Usuario = require('../Modelos/modelos');
//-----------------------------------------------------------
router.get('/', (req, res ,next)=> {
    res.send("Hola")
});
//-----------------------------------------------------------
router.post('/Register', passport.authenticate('local-singup') , (req, res, next)=> {
    res.send("Registrado");
});
//-----------------------------------------------------------
router.post('/Login', passport.authenticate('local-signin') , (req, res, next)=> {
    
    const actualizarEstado = async()=>{
        const usuario = await Usuario.updateOne({email: req.body.email},{activo:1})
    }
    actualizarEstado();
    res.send("Login correcto ");   
});
//-----------------------------------------------------------
router.get('/Profile',isAuthenticated, (req, res , next)=> 
{
     res.send("Para ver este mensaje tiene que haber iniciado sesion ")
});
//-----------------------------------------------------------
router.post('/Logout',isAuthenticated,(req, res, next) =>{

    req.logout((err)=>{

        if (err) 
        { 
            return next(err); 
        }

        const actualizarEstado = async()=>{
            const usuario = await Usuario.updateOne({email: req.body.email},{activo:0})
        }
        actualizarEstado();   
    });
    res.send("Sesion finalizada")
  });
//-----------------------------------------------------------
function isAuthenticated(req, res, next) 
{
    if(req.isAuthenticated()) 
    {
        return next();
    }
    res.send("Necesita iniciar sesion")
    //res.redirect('/')
}
//------------------------------------------------------------------------------------------------
module.exports = router;
