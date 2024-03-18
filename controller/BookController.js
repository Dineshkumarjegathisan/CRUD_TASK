const BookService = require('../service/BookService.js')
const  uuidv4  = require('uuid')
const errorCode = require('../errorCode.js');
const db = require('../Connection/db_config.js')


async function createBook(req,res){
    try {
        const role = req.userMail.role ;
        const reqBody = {
            bookId :uuidv4.v4(),
            bookName: req.body.bookName,
            bookPrice : req.body.bookPrice,
            publishYear :req.body.publishYear,
            stock : req.body.stock,
            category : req.body.category,
            createdBy :role
            }
            console.log('reqBody:',reqBody,role);
        const response = await BookService.createBook(reqBody,role)
        res.status(201)
        .json({
            response
        })
            
    } catch (err) {
        throw err ;
    }
}

async function getAllBooks(req,res){
    try {
    const limit = req.query.limit || 5;
    const offset = req.query.offset || 0
    const response = await BookService.getAllBooks(limit,offset);
    res.status(200)
    .json({
        response
        })
    } catch (err) {
        throw err ;
    }
}

async function deleteBookById(req,res){
    try {
    const response = await BookService.deleteBookById(req.params.id)
    res.status(200)
    .json({
         response
        })
    } catch (err) {
        if(err.message === errorCode.USER_ID_NOT_FOUND_ERROR)
        {
            res.status(errorCode.USER_ID_NOT_FOUND_ERROR.status)
            .send(errorCode.USER_ID_NOT_FOUND_ERROR)
        }
    }
}


async function updateBookById (req,res){
    try {
        const reqBody={
            bookId :req.params.id,
            stock : req.body.stock
                    }
    const response = await BookService.updateBookById(reqBody)
    res.status(200).send(response)
    // .json({
    //     result
    //     })
    } catch (err) {
        throw err
    }
}

async function getAllBookByName(req,res){
    try {
        const search = req.query.search 
        const response = await BookService.getAllBookByName(search);
        res.status(200)
        .json({
            response
        })
        
    } catch (err) {
        throw err ;
    }
}

module.exports = {createBook,getAllBooks,getAllBookByName,deleteBookById,updateBookById}