import dotenv from "dotenv";
import { pool } from "./app.js";
import app from './app.js';
dotenv.config({
  path: "./.env",
});
// database connection
pool.connect().then(()=>{
    console.log("Successfuly connected to database");
    app.listen(process.env.PORT,()=>{
        console.log(`The server is running in port ${process.env.PORT}`);
    })
}).catch(err=>{
    console.log("Error while connecting to database", err);
})

