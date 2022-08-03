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

    res.send("1");   
});
//-----------------------------------------------------------
router.post('/Profile', passport.authenticate('local-signin'),(req, res , next)=> 
{
    const ObtenerDato = async()=>{
        var dato = await Usuario.findOne({email: req.body.email});
        res.send({nombre :dato.nombre , puntos:dato.puntos}); 
    }
    ObtenerDato();
    //res.send("Profile No dato "); 
});
//-----------------------------------------------------------
router.post('/Logout',passport.authenticate('local-signin'),(req, res, next) =>{

    req.logout((err)=>{

        if (err) 
        { 
            return next(err); 
        }

        const actualizarEstado2 = async()=>{
            const usuario = await Usuario.updateOne({email: req.body.email},{activo:0})
        }
        actualizarEstado2(); 
    });
    res.send("0")
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
