
//packages
import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import mongoose from "mongoose"

//router
import router from './routes/RouteManager/RouteManager'

dotenv.config();  // configuration for dotenv

const app: Express = express(); // creating an express app

app.use(cors())
app.use(express.json())     // configuring the app
app.use(express.urlencoded({extended : false}))
app.use(router)

if(process.env.MONGODB_URL)
  mongoose.connect(process.env.MONGODB_URL)
  .then(()=>{                                             // connecting to mongodb
    console.log("Connection to mongodb is successfull")
  })

app.listen(process.env.PORT, () => {
  const {PORT} = process.env              
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

