const mongoose=require("mongoose");
const UserVerificationSchema=new mongoose.Schema({
    userId: String,
    uniqueString: String,
    createdAt: Date, 
    expiresdAt: Date, 

},
);
module.exports=mongoose.model("UserVerification",UserVerificationSchema);