const express = require('express');
const router = express.Router();

router.get("/",ensureAuthenticated,(req,res)=>{
  res.render('index');
});

// ....Middleware functionality...
// ....secure path to dashboard... 
function ensureAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }else{
    //req.flash("error_msg","you are not logged in");
    res.redirect('/users/login');
  }
};

module.exports=router;
