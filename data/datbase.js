import mongoose from "mongoose";

export const connectDB = ()=>mongoose.connect(process.env.dBURI,{
    dbName:"backendapi"
    }).then(()=>console.log("Database Connected"))
    .catch((e)=>console.log(e));