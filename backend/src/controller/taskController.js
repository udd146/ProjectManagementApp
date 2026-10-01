const taskModel = require("../models/taskModel")
const getTask = async(req,res) =>{
    try{
         const taskId = req.params.id
         const task = await taskModel.findById(taskId)
         res.status(200).json({
            "success":true,
            "data":task
         })
    }
    catch(e)
    {
        res.status(200).json({
            "success":false,
            "message":"Something went wrong !!"
         })
    }
}

const createTask = async (req,res)=>{
    try{
         
      const task = new taskModel(req.body)
      await task.save()
      res.status(200).json({
        "success":true,
        "message":"task created Successfully",
        "data":task
    })
    }
    catch(e)
    {
        res.status(200).json({
            "success":false,
            "message":"Not able to create task!!",
           

         })
    }
}

const getTaskByProject = async (req, res) => {
    try {
      const projectId = req.params.projectId;
    
      const task = await taskModel.find({
        project:projectId
      });
  
      return res.status(200).json({
        success: true,
        data: task
      });
  
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong !!"
      });
    }
  };
module.exports = {getTask,createTask,getTaskByProject}