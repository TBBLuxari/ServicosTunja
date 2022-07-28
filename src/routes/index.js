const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/', (req, res ,next)=> {res.render('singin')});
//------------------------------------------------------------------------------------------------

router.post('/singin', passport.authenticate('local-signin' ,{
    successRedirect:'/profile',
    failureRedirect:'/singin',
    passReqToCallback:true
}));
//------------------------------------------------------------------------------------------------
router.get('/logout',(req, res, next) =>{
  req.logout((err)=>{if (err) { return next(err); }});
  res.redirect('/');
});
//------------------------------------------------------------------------------------------------
router.get('/profile',isAuthenticated, (req, res , next)=> 
{
   res.send("Melo")
   print("Melo")
   console.Log("Melo")
});
//------------------------------------------------------------------------------------------------
function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/')
  }
//------------------------------------------------------------------------------------------------
module.exports = router;
