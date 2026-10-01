const express = require('express')
const connectDb = require('./dbConfig')
const app = express()
const {userRouter} = require('./routers/userRouter')
const projectRouter = require('./routers/projectRouter')
const taskRouter = require('./routers/taskRouter')

const dotEnv  = require('dotenv')
const cors =require('cors')
const cookieParser = require('cookie-parser');
 

// const cookie = require('cookies')
 
app.use(cors({
    origin: true,
    credentials: true,
    
}));
// app.use('/',(req,res)=>{
//     res.send("server is working fine")
// })

dotEnv.config()
app.use(express.json())
//by using credentail we are verifying server to pass the cookies

app.use(cookieParser());
// app.use(cookie())
 
 
app.use('/api/v1',userRouter)
app.use('/api/project',projectRouter)
app.use('/api/task',taskRouter)

app.listen(8081,(req,res)=>{
    console.log("Server started at port 8081")
})


connectDb()


