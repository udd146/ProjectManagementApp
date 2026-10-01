import axios from "axios";
import { API_BASE_URL } from "./config";


const api = axios.create({
    baseURL:API_BASE_URL,
    withCredentials:true
})

export const getProjectByUser = async (userId)=>{
    try{
       
        const response = await api.get(`/api/project/getProjectByUser/${userId}`)
        return response?.data
    }
    catch(e){
        console.log(e)
      }
}

export const createProject = async (projectData)=>{
    try{
       
        const response = await api.post(`api/project/createProject`,projectData)
        return response?.data
    }
    catch(e){
        console.log(e)
      }
}

export const getProject = async (projectId)=>{
    try{
       
        const response = await api.get(`/api/project/getProject/${projectId}`)
        return response?.data
    }
    catch(e){
        console.log(e)
      }
}