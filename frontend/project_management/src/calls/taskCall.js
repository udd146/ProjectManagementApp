import axios from "axios";
import { API_BASE_URL } from "./config";


const api = axios.create({
    baseURL:API_BASE_URL,
    withCredentials:true
})

export const getTaskByProject = async (projectId)=>{
    try{
       
        const response = await api.get(`/api/task/getTaskByProject/${projectId}`)
        return response?.data
    }
    catch(e){
        console.log(e)
      }
}