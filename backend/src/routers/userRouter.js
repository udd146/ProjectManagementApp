const express = require('express')
const {userRegister, userLogin, userLogout, getAllUser}= require('../controller/userContoller')
const { validateUser } = require('../controller/authController')
const userModel = require('../models/userModel')

const userRouter = express.Router()

userRouter.post('/register',userRegister)

userRouter.post('/login',userLogin)
userRouter.post('/logout',userLogout)
userRouter.get('/getAllUser',getAllUser)

userRouter.get('/current-user',validateUser,async (req,res)=>{
   try
    {
    const user_id = req.user_id
     
    const user = await userModel.findById(user_id).select('-password')

    res.status(200).json({
        Success:true,
        data:user
    })
   }
   catch(e)
   {
    res.status(500).json({
        Success:false,
        message:"Something went wrong"
    })
   }
    
})



module.exports = {userRouter}