const db = require('../Connection/db_config.js')
const hashedPassword =require('../middleware/hashPassword.js')
const userValidation = require('../validation/userValidation.js')
const jwt = require('jsonwebtoken');


async function createUser(reqBody){
    try {
      const pass  =   await hashedPassword.hashPassword(reqBody.password)
      const  response =  await new Promise((resolve, reject) => {
            const myQuery = `insert into Users (userId, userName ,role, email, password ) values
            (?, ?, ?, ?, ?)`
            db.query(myQuery,[reqBody.userId, reqBody.userName,reqBody.role, reqBody.email , pass],(err,data)=>{
                if(err){
                    reject(err);
                }
                else{
                    console.log("data"+data);
                    resolve(JSON.parse(JSON.stringify(data)))
                }
            })
        })
        console.log("RESPONSE"+response);
    return response

    } catch (err) {
     
     throw err ;
    }
 }

 async function userLogin(email,password){
    try {
       const userMail = await userValidation.mailValidation(email,password)
       if(userMail.length==0){
         return ('user not found')
       }
       const validPassword = await userValidation.comparePasswords(password,userMail[0]?.password)
       if(validPassword){
                // const token = jwt.sign({ role: email.role }, process.env.TOKEN_SEC,{ expiresIn: '1h' });
                const token = jwt.sign({ role: userMail[0].role }, process.env.TOKEN_SEC, { expiresIn: '1h' });
                return token ;
       }

       if(!validPassword){
        return ('invalid password') ;
       }
       return 'logged in'  
        
    } catch (err) {
        throw err ;
    }
 }


module.exports= {createUser,userLogin}
