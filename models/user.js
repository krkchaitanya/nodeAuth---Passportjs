var mongoose=require("mongoose");
var bcrypt=require("bcryptjs");


// user schema
var UserSchema=mongoose.Schema({
  username:{
    type:String,
    index:true
  },
  password:{
    type:String
  },
  email:{
    type:String
  },
  name:{
    type:String
  }
});

var User=mongoose.model("User",UserSchema);
module.exports=User;

module.exports.createUser=function(newUser,callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password=hash;
        newUser.save(callback);
    });
});
};
