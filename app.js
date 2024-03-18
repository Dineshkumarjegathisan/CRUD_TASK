const express = require('express')
require('dotenv').config();
const app = express();
require('./Connection/db_config.js')
const router = require('./router/bookRoutes.js')
const userRouter = require('./router/userRoutes.js')
let bodyParser = require('body-parser');

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/',router)
app.use('/',userRouter)

const port = process.env.SERVERPORT || 8000
app.listen(port,()=>{
    console.log(`Server is rtunning on ${port}`);
})