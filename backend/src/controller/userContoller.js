const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userRegister = async (req,res)=>{
  console.log(req.body,"request body")
  const {email,password,name,role} = req.body

 try
 {
    const isEmailExist = await userModel.findOne({email:email})
    if(isEmailExist)
    {
        res.status(200).json({
            success:false,
            message:"User Already exist"
        })
    }
    else
    {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, function(err, hash) {
            const data = {
                name:name,
                email:email,
                password:hash,
                role:role
            }
            console.log(data)
           const newUser = new userModel(data)
           newUser.save()
          res.status(200).json({
            success:true,
            message:"User Created Successfully",
            data:newUser
          })    
        });  

    }
 }
 catch(e)
 {
    res.status(400).json({
      success:false,  
      message:e
    })
 }
}


const userLogin = async (req,res)=>{
    
const {email,password}  = req.body
console.log("Login function")
// check if the email exist or not
// then compare the password using bcrpt password , if matches then login the user
 
try
{
    const userdata = await userModel.findOne({ email });

    if (!userdata) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    
    const match = await bcrypt.compare(password, userdata.password);
    
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Password does not match",
      });
    }
    let token = jwt.sign({ user_id: userdata._id },process.env.JSON_TOKEN,
      {expiresIn:'1d'}
    );
    res.cookie('jsonToken',token,{httpOnly:true})

    return res.status(200).json({
      success: true,
      message: "User Logged In !!",
      data:userdata
    });
}
catch(e)
{
   console.log(e)
    res.status(500).json({
        success:false,
        message:e
    })
}
}

const userLogout = (req,res)=>{
  try
  {
    res.clearCookie("jsonToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  }
  catch(e)
  {
    console.log(e)
    res.status(500).json({
      success: true,
      message: "Something went wrong, user can't logout",
    });
  }
 
}

const getAllUser = async (req,res)=>{
  try
  {
     const user = await userModel.find()
  
    res.status(200).json({
      success: true,
      message: "fetched data successfully",
      data:user
    });
  }
  catch(e)
  {
     
    res.status(500).json({
      success: true,
      message: "Something went wrong, user can't logout",
    });
  }
 
}
// router.post("/logout", );


module.exports ={userRegister, userLogin,userLogout,getAllUser}