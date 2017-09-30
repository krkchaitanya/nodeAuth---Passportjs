const express = require('express');
const router = express.Router();
var User=require("../models/user");

router.get("/register",(req,res)=>{
  res.render('register');
});

router.get("/login",(req,res)=>{
  res.render('login');
});

router.post("/register",(req,res)=>{
  var name=req.body.name;
  var email=req.body.email;
  var username=req.body.username;
  var password=req.body.password;
  var password2=req.body.password2;

req.checkBody('name','name is required').notEmpty();
req.checkBody('email','email is required').notEmpty();
req.checkBody('email','email is not valid').isEmail();
req.checkBody('username','username is required').notEmpty();
req.checkBody('password','password is required').notEmpty();
req.checkBody('password2','passwords donot match').equals(req.body.password);

var errors=req.validationErrors();
if(errors){
  res.render('register',{
    errors:errors
  });
}else{
  var newUser=new User({
    name:name,
    email:email,
    username:username,
    password:password
  });
  User.createUser(newUser,function(err,user){
    if(err) throw err;
    console.log(user);
  });
  req.flash("success_msg","You are registered and can now login");
  res.redirect('/users/login');
}
})
module.exports=router;
