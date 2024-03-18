const express = require('express')
const router = express.Router();
const BookController = require('../controller/BookController.js');
const { authandicate } = require('../middleware/authendication.js');
const { isAuthorization } = require('../middleware/isAuthorization.js');


router.post('/createBook',authandicate,isAuthorization('Admin'),BookController.createBook)
router.get('/getAllBooks',authandicate,isAuthorization('Admin','staff', 'reader'),BookController.getAllBooks)
router.get('/getBookByName',BookController.getAllBookByName)
router.delete('/deleteBookById/:id',authandicate,isAuthorization('Admin'),BookController.deleteBookById)
router.put('/updateBookById/:id',authandicate,isAuthorization('Admin','staff'),BookController.updateBookById)


//Users 
// router.post('/createUser',UserController.createUser)
// router.post('/userLogin',UserController.userLogin)


module.exports = router ;