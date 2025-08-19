import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:[true,"please provide username"],
            unique:true
        },
        email:{
            type:String,
            required:[true,"please provide email"],
            unique:true
        },
        password:{
            type:String,
            required:[true,"please provide username"]
        },
        isVerified:{
            type:Boolean,
            default:false
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        forgotPasswordToken:String,
        forgotPasswordTokenExpiry:Date,
        verifyToken:String,
        verifyTokenExpiry:Date,


    },{timestamps:true}
)

const User = mongoose.models.users || mongoose.model("users",userSchema)


export default User