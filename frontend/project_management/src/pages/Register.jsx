import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../calls/authCall";
import Notification from "../utility/Notification";

const Register = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    success: true,
  });


//handle data change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();
     
    if (formData.name == "") {
      setNotification({
        show: true,
        message: "Please enter the name",
        success: false,
      });
      return;
    } else if (formData.email == "") {
      setNotification({
        show: true,
        message: "Please enter the email",
        success: false,
      });
      return;
    } else if (formData.password == "") {
      setNotification({
        show: true,
        message: "Please enter the password",
        success: false,
      });
      return;
    }
    else if (formData.password !== formData.confirmPassword) {
        setNotification({
          show: true,
          message: "Passwords do not match",
          success: false,
        });
        return;
      }

    const data  = {
        name:formData.name,
        email:formData.email,
        password:formData.password,
        role:formData.role
    }
    try{
      const response = await register(data)
      console.log(response,"response msg")
      if(!response.success)
      {
        setNotification({
            show: true,
            message: response.message ,
            success: false,
          });
      }
      else
      {
        setNotification({
            show: true,
            message: response.message ,
            success: true,
          });
      }
       
    }
    catch(e)
    {
        console.log(e)
    }

  };
   

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-xl mb-4">
            <span className="text-white text-2xl font-bold">P</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Create an account
          </h1>

          <p className="text-gray-500 mt-2">
            Start managing your projects efficiently
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-lg p-7">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg
                  outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                  text-gray-500 hover:text-blue-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg
                  outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2
                  text-gray-500 hover:text-blue-600"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                bg-white transition"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700
              text-white font-semibold py-3 rounded-lg
              transition duration-200 shadow-sm"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
        
      </div>
      <Notification
        show={notification.show}
        message={notification.message}
        success={notification.success}
        onClose={() =>
          setNotification((prev) => ({
            ...prev,
            show: false,
          }))
        }
      />
      </div>
  );
};

export default Register;