const db = require('../Connection/db_config.js')
const errorCode = require('../errorCode.js');

async function createBook(reqBody,role){
    try {
        const response = await new Promise((resolve, reject) => {
            const myQuery = `insert into Books (bookId,bookName, bookPrice, publishYear, stock, category, createdBY) values (?, ?, ?, ?, ?, ?, ?)`
            db.query(myQuery, [reqBody.bookId,reqBody.bookName, reqBody.bookPrice, reqBody.publishYear, reqBody.stock, reqBody.category, role],(err,data)=>{
                if(err)
                {
                   reject(err)
                }
                else{
                
                  resolve(data)
                }
            });
        })
        return response
    } catch (err) {
        throw err ;
    }
}

async function getAllBooks(limit,offset){
    try {

    const result =  new Promise((resolve, reject) => {
        if (typeof limit === 'string' && typeof offset === 'string') {
                 limit = parseInt(limit)
                 offset = parseInt(offset)
            if (isNaN(limit) || isNaN(offset)) {
                     resolve('in valid limit and offset')
                     }
            }
            const demoObj = {
                total_items:0,
                response:[],
                total_pages:0,
                current_page:0,
                hasMore: false,
                     };
    const myQuery = 'select * from Books limit ? offset ?'
    db.query(myQuery,[limit,offset],(err,data)=>{
            if(err){
                reject(err)
                }
            else{
                    const count = data.length;
                   // console.log(count);
                    demoObj.total_items = count ;
                    demoObj.total_pages = (count/limit)
                    demoObj.current_page = offset+1 
                    demoObj.hasMore = (demoObj.total_pages)-(demoObj.current_page)>0?true:false
                    demoObj.response.push(data);
                    resolve(demoObj)
            }
        
         })
     })
     return result ;
    } catch (err) {
        throw err ;
    }
}

async function deleteBookById(bookId){
    try {
    const result = new Promise((resolve, reject) => {
    const myQuery = 'DELETE FROM Books WHERE bookId = ?'
    db.query(myQuery,[bookId],(err,data)=>{
        if(err)
        {
           
            reject(err)
        }
        else{
            resolve(data)
        }
    })
         });
    return errorCode.DELETE_SUCESS ;
    } catch (err) {
      throw err ;
    }
}

async function updateBookById(reqBody){
    try {
    const response = await new Promise((resolve, reject) => {
    const myQuery = `update Books set stock = ? where bookId = ?`
    db.query(myQuery,[reqBody.stock,reqBody.bookId],(err,data)=>{
        if(err){
            reject(err)
        }
        else{
            resolve(data)
        }
    })
      })
    return errorCode.UPDATE_SUCESS ;
    } catch (err) {
    throw err ;
    }
}

async function getAllBookByName(search){
    try {
      const response = await new Promise((resolve, reject) => {
            const myQuery = 'select * from Books where bookName = ?'
            db.query(myQuery,[search],(err,data)=>{
                if(err)
                {
                    reject(err)
                }
                else{
                    resolve(data)
                }
            })
        }) 
        return response ;  
    } catch (err) {
        throw err ;
    }
}

module.exports = {createBook,getAllBooks,getAllBookByName,deleteBookById,updateBookById};

