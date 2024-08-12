import express from "express"
import cors from 'cors'
import adminRoutes from './routes/adminRoutes.js'
import userRoutes from './routes/userRoutes.js'
import prisma from './prismaclient/prismClient.js'
import config from './config/db.js'
const app = express();
const port = config.port
app.use('/*' , cors())


app.use(express.json());
app.use('/api/v1/',userRoutes)
app.use('/api/v1/',adminRoutes)



app.listen(port,()=>{
  console.log("Server is running at localhost",port)
})