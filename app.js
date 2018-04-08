const express = require('express');
var path = require('path');
var cookieParser=require("cookie-parser");
var bodyParser=require("body-parser");
var exphbs=require("express-handlebars");
var expressValidator=require("express-validator");
var flash=require("connect-flash");
const session = require('express-session');
var passport=require("passport");
var LocalStrategy=require("passport-local").Strategy;
var mongo=require("mongodb");
var cors=require("cors");
const config=require("./config/database");

// mongoose database createConnection
var mongoose=require("mongoose");
mongoose.connect(config.database);

// on Connection
mongoose.connection.on('connected',()=>{
  console.log("Connected to Database"+ config.database);
});

// on error
mongoose.connection.on('error',(err)=>{
  console.log("DB Conncetion ERROR:"+err);
})



// mongoose.connect("mongodb://localhost/loginapp");
// var db=mongoose.connection;

var routes=require("./routes/index");
var users=require("./routes/users");

var app=express();

// view engine
app.set("views",path.join(__dirname,"views"));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

// body-parser middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname,"public")));

// express session
app.use(session({
  secret:'secret',
  saveUninitialized:true,
  resave:true
}));

// passpot initialize
app.use(passport.initialize());
app.use(passport.session());

// expressValidator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// connect flash
app.use(flash());

// global var
app.use(function(req,res,next){
  res.locals.success_msg=req.flash('success_msg');
  res.locals.error_msg=req.flash('error_msg');
  res.locals.error=req.flash('error');
  res.locals.user=req.user||null;
  next();
});



app.use("/",routes);
app.use("/users",users);

// set port
var port=process.env.PORT||3004;
app.listen(port,()=>{
  console.log(`app running on port ${port}`);
});
