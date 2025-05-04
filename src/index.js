  
import dotenv from 'dotenv';
import {app} from './app.js';
 
import connectDB from "./db/index.js";

dotenv.config({
    path: "./env"
});

connectDB()
.then(()=>{

    const port = process.env.PORT || 5000;

     app.listen(port, () => {
        console.log(`SERVER RUNNING ON PORT ${port}`);
    });

    

}).catch((error)=>{
    console.log("Error connecting to DB", error);
    process.exit(1);
});