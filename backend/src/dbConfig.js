const moongoose = require('mongoose')


const  connectDb =  async ()=>{
try
{
   await moongoose.connect(process.env.MONGODB_URL)
   console.log("DB Connected Successfully")
}
catch(e)
{
 console.log("Error in Connecting with Db",e)
}
}

module.exports = connectDb


