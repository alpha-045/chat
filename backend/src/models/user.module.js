import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        require:true,
    },  
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    profilepic:{
        type:String,
        default:''
    }},
    {timestamps:true}
)

export const  User = mongoose.model("users",userSchema);