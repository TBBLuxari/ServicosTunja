const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/', (req, res ,next)=> {res.render('singin')});
//------------------------------------------------------------------------------------------------

router.post('/singin', passport.authenticate('local-signin') ,
  function (req, res, next) {
    res.send("Entro");
  }
);
//------------------------------------------------------------------------------------------------
router.get('/logout',(req, res, next) =>{
  req.logout((err)=>{if (err) { return next(err); }});
  res.send("Sesion finalizada");
});
//------------------------------------------------------------------------------------------------
router.get('/profile',isAuthenticated, (req, res , next)=> 
{
   res.send("Melo")
   print("Melo")
   console.log("Melo")
});
//------------------------------------------------------------------------------------------------
function isAuthenticated(req, res, next) 
{
    if(req.isAuthenticated()) 
    {
      return next();
    }
  
    //res.redirect('/')
    res.send("No se ha iniciado sesion");
  }
//------------------------------------------------------------------------------------------------
module.exports = router;
