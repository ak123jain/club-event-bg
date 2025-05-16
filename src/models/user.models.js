import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    fullname :{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    avatar:{
        type : String,
        default : null
    },
    refreshToken:{
        type : String,
        default : null
    },
    mobile:{
        type : String,
        required : false,
    },
    bio:{
        type : String,
        default : null,
        required : false
    },
    Role:{
        type : String,
        enum : ["user" , "admin"],
        default : "user"
    },
    club:{
      type : mongoose.Schema.Types.ObjectId,
      ref : "Club"
    },
    event: [{
      type : mongoose.Schema.Types.ObjectId,
      ref : "Event"
    }],
    college:{
      type : String,
    }
} , {
    timestamps: true,
});

userSchema.pre("save" , async function (next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password , this.password)
}

userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
             {
                id : this._id,
                email : this.email,
                username : this.username,
                fullname : this.fullname,
             },
             process.env.ACCESS_TOKEN_SECRET,
             {
                expiresIn : process.env.ACCESS_TOKEN_EXPIRY
             }
    )
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
             {
                id : this._id,
                email : this.email,
                username : this.username,
                fullname : this.fullname,
             },
             process.env.REFRESH_TOKEN_SECRET,
             {
                expiresIn : process.env.REFRESH_TOKEN_EXPIRY
             }
    )
}

export const User = mongoose.model("User" , userSchema)