import { useState ,useEffect} from 'react'
import Register from './pages/Register'
import TaskBoard from './components/TaskBoard'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import { getCurrentUser } from "./calls/authCall";
import { clearUser, setUser } from "./store/userSlice";
import { useDispatch } from "react-redux";
 

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await getCurrentUser();
      console.log(res.data,"user data")
      dispatch(setUser(res.data));
    } catch (err) {
      dispatch(clearUser());
    }
  };

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          <Login />} 
          />
         <Route path="/register" element={
          <Register />} 
          />
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          
      {/* <Route path="*" element={<RedirectRoute />}/> */}
      </Routes>
      
    </BrowserRouter>
   </>
  )
}

export default App
