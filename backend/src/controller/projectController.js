const projectModel = require("../models/projectModel")
const getproject = async(req,res) =>{
    try{
         const projectId = req.params.id
         const project = await projectModel.findById(projectId)
         res.status(200).json({
            "success":true,
            "data":project
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

const getProjectsByUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      
     const projects = await projectModel
     .find({ users: userId })
     .populate("users");
  
      return res.status(200).json({
        success: true,
        data: projects
      });
  
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong !!"
      });
    }
  };
  const updateProject = async (req,res)=>{
    try
    {
    
        const projectId = req.body._id
        const project = await projectModel.findByIdAndUpdate(projectId,req.body)

        res.status(200).json({
            "success":true,
            "message":"Project Updated Successfully",
            "data":project
        })
    }
    catch(e)
    {
        res.status(200).json({
            "success":false,
            "message":"Not able to update Project , Something went wrong!!"
         })
    }
}

const createproject = async (req,res)=>{
    try{
         
      const project = new projectModel(req.body)
      await project.save()
      res.status(200).json({
        "success":true,
        "message":"project created Successfully",
        "data":project
    })
    }
    catch(e)
    {
        res.status(200).json({
            "success":e,
            "message":"Not able to create project!!"
         })
    }
}


module.exports = {getproject,createproject,getProjectsByUser,updateProject}