// import app from "./App.js"
// import connectdb from "./Db/Index.js"
// import dotenv from 'dotenv'

// dotenv.config({path:'./.env'})
// connectdb()
// .then(()=>{
//     app.listen(process.env.PORT || 8000 ,()=>{
//         console.log(`Server Is Running  ::: ${process.env.PORT}`)
//     }) 
// })
// .catch((err)=>{
//     console.log("Mongo db connection failed !!!!",err)
// })


import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import app from "./App.js";
import connectDb from "./Db/index.js";

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
})();
