require('dotenv').config();
const mysql = require('mysql')
console.log(process.env.DBUSER);
const connection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.DBUSER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port: process.env.PORT
})

connection.connect((err)=>{
    if(err){
        console.log('Db Error ', err);
    }
    else{
        console.log("Database connected..!");
    }
})



module.exports = connection ;