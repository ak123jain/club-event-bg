 import mongoose, { Schema } from "mongoose";
  
 
 const eventschema = new Schema({
     name :{
         type : String,
         required : true
     },
     club :{
         type : mongoose.Schema.Types.ObjectId,
         ref : "Club",
         required : true
     },
       
     description: {
         type: String,
         required: true,
       },
     eventphoto:{
         type : String,
         required : true
     },
     startdate:{
         type : Date,
         required : true
     },
     enddate:{
         type : Date,
         required : true
     },
     location:{
         type : String,
         required : true
     },
     eventtype:{
         type : String,
         required : true
     },
     participant: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
     }],
 
 } , {
     timestamps: true,
 });
 
  
 
 export const Event = mongoose.model("Event" ,  eventschema)