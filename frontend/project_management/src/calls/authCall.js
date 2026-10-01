import axios from "axios";
import { API_BASE_URL } from "./config";


const api = axios.create({
    baseURL:API_BASE_URL,
    withCredentials:true
})

export const register = async (value)=>{
try{
    console.log(value,"req value")
    const response = await api.post('/api/v1/register',value)
    return response?.data
}
catch(e){
    console.log(e)
  }
   
}

export const login = async (value) =>{
    try
    {
        const response = await api.post('/api/v1/login',value)
        return response?.data
    }
    catch(e)
    {
     console.log(e)
    }
}

export const getCurrentUser = async () =>{
    try
    {
        const response = await api.get('/api/v1/current-user',{withCredentials:true})
        return response?.data
    }
    catch(e)
    {
     console.log(e)
    }
}

export const userLogout = async ()=>{
    try
    {
        const response = await api.post('/api/v1/logout')
        return response?.data
    }
    catch(e)
    {
     console.log(e)
    }
}


export const getAllUser = async ()=>{
    try
    {
        const response = await api.get('/api/v1/getAllUser')
        return response?.data
    }
    catch(e)
    {
     console.log(e)
    }
}


