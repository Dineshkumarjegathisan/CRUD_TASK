const db = require('./Connection/db_config')


async function checkValidation(values){
    try {
        console.log('*****)',values);
        const valid = await new Promise((resolve, reject) => {
            const myQuery = `select userName , email,  password from Users where userName = '${values['userName']}' and email = '${values.email}' and password = '${values.password}'`
            db.query(myQuery,(err,data)=>{
                if(err)
                {
                    reject (err)
                }
                else{
                    if(data.length >0)
                    {
                        console.log('@@@@@@@@',data);
                        resolve('provide correct credentials')
                    }
                    else{
                        console.log('===>)))',data);
                        resolve ('logged in ')
                    }
                }
            })
        })
        return valid ;
        
    } catch (err) {
        throw err ;
    }
}

module.exports = checkValidation ;