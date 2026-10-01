import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TaskBoard from "../components/TaskBoard";
import { getProjectByUser } from "../calls/projectCall";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, userLogout } from "../calls/authCall";
import { clearUser, setUser } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { getTaskByProject } from "../calls/taskCall";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [task,setTask] = useState([])
  const user = useSelector(state=> state.user.userData)
  const [users,setUsers] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  useEffect(() => {
    if (user?._id) {
      getproject();
    }
  }, [user]);
  useEffect(()=>{
    getAllUsers()
   },[])
   
   const getAllUsers = async()=>{
     const response = await getAllUser()
     const data = response.data
     console.log(data,"users data")
     setUsers(data)
     
   }
  const getproject = async () => {
    try {
      const response = await getProjectByUser(user._id);
      setProjects(response.data);
  
      // Select first project after projects are fetched
      if (response.data.length > 0) {
        setSelectedProject(response.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleProjectSelect = (project) => {
     
     console.log(project,"project data")
    setSelectedProject(project);
    getTasks(project._id)

  };
  const OnProjectCreated = (project) => {
     getproject();
     console.log(project,"project data")
};
  const getTasks = async (id)=>{
    try {
        const response = await getTaskByProject('6abcc2df13ae685239a8edfa');
        // console.log(response)
        setTask(response.data)
      } catch (error) {
        console.log(error);
      }
  }

  const handleLogout = async () => {
    try
    {
     const response = await userLogout()
    
     if(response.success == true)
     {
       dispatch(clearUser())
       navigate('/login')
       
     }
    }
    catch(e)
    {
     console.log(e)
    }
 }

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <Header onLogout={handleLogout} user={user} />

      {/* Sidebar + TaskList */}
      <div className="flex">
        
        <Sidebar
          projects={projects}
          selectedProject={selectedProject}
          onProjectSelect={handleProjectSelect}
          users={users}
          onProjectCreated={OnProjectCreated}
        />

        <main className="flex-1 p-6">
          {selectedProject ? (
            <TaskBoard project={selectedProject}
             task={task}
            />
          ) : (
            <div className="text-gray-500">
              Select a project
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default Dashboard;