
const jwt =require('jsonwebtoken')

const validateUser = (req,res,next)=>{
    try
    {
        const token = req.cookies.jsonToken
         
        const validate = jwt.verify(token,process.env.JSON_TOKEN)
        req.user_id = validate.user_id
        next()
    }
    catch(e)
    {
       res.status(401).json({
        success:false,
        message:"Token Invalid"
       }) 
    }
}


module.exports = {validateUser}