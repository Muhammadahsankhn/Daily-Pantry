// import mongoose from 'mongoose'
// import { DB_NAME } from '../constant.js'
// import express from 'express'

// const app=express()


// const connectDb=async()=>{
//     try {

//         const connectInstance=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        
//             console.log(`Mongo DB connected  !! Db Host :::${connectInstance.connection.host}`)
        

//         app.listen(process.env.PORT,()=>{
//             console.log(`App is Listening  on Port ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.log("Mongoo DB Connection Error  :::",error)
//         process.exit(1)
//     }
// }
    

// export default connectDb


import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDb = async () => {
  try {
    const connectInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );

    console.log(
      `Mongo DB connected !! Host: ${connectInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDb;
