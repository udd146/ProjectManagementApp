const  {createproject,getproject, getProjectsByUser, updateProject} = require('../controller/projectController')

const express = require('express')

const projectRouter = express.Router()

projectRouter.post('/createProject',createproject)

projectRouter.get('/getProject',getproject)

projectRouter.get('/getProjectByUser/:userId',getProjectsByUser)

projectRouter.post('/updateProject',updateProject)

 

 


module.exports = projectRouter