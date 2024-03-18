const db = require('../Connection/db_config.js');
const bcrypt = require('bcrypt');
const hashedPassword = require('../middleware/hashPassword.js')

async function mailValidation(email) {
    try {
        const user = await new Promise((resolve, reject) => {
            const myQuery = `select email, password , role from Users where  email = '${email}'`;
            db.query(myQuery, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(JSON.stringify(data)))
                } 
            });
        });
        return user;
    } catch (err) {
        console.error('Error in validateUser:', err);
        throw err;
    }
}

async function comparePasswords(password,hashedPassword) {
    try {
        const res  =   bcrypt.compare(password,hashedPassword);
        return res ;
    } catch (err) {
        throw err ;
    } 
} 
// module.exports = { mailValidation,validPass}; 

module.exports = { mailValidation,comparePasswords}; 