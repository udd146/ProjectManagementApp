 
const {createTask,getTask, getTaskByProject} = require('../controller/taskController')

const express = require('express')

const taskRouter = express.Router()

taskRouter.post('/createTask',createTask)

taskRouter.get('/getTask',getTask)

taskRouter.get('/getTaskByProject/:projectId',getTaskByProject)


module.exports = taskRouter