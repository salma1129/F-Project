const mongoose=require("mongoose");
const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:["admin","user","employee","manager"],default:"user"},
    phone:{type:String},
    address:{type:String},
    department:{type:String},
    position:{type:String},
    profileImage:{type:String},
    resetPasswordToken: String,
    resetPasswordExpires: Date
},
{timestamps:true}
);
module.exports=mongoose.model("User",UserSchema);