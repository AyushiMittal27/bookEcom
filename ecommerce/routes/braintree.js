const express = require('express')
const { requireSignin, isAuth } = require('../controllers/auth')
const { userById } = require('../controllers/user')
const { generateToken, processPayment } = require('../controllers/braintree')
const router = express.Router()


router.get('/brainTree/getToken/:userId' ,requireSignin , generateToken )
router.post('/brainTree/payment/:userId' , requireSignin, processPayment )

router.param('userId' ,(req,res, next)=>{
    const id = req.params.userId
    console.log(id , "  Id")
    next()
} ,userById)



module.exports = router