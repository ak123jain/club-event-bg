import mongoose, { Schema } from "mongoose";
 

const clubschema = new Schema({
    name :{
        type : String,
        required : true
    },
    admin :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    description:{
        type : String,
        required : true
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      }],      
    clubphoto:{
        type : String,
        required : true
    },
    sociallink: [{
        type : String,
        required : true
    }],
} , {
    timestamps: true,
});

 
export const Club = mongoose.model("Club" ,  clubschema)