import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../utility/Notification";
import { login } from "../calls/authCall";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    success: true,
  });
 const navigate = useNavigate()
 const dispatch = useDispatch()

 // form data handling
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // login submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email == "") {
      setNotification({
        show: true,
        message: "Please enter the email Id",
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
    const data  = {
            email:formData.email,
            password:formData.password
        }
        try{
          const response = await login(data)
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
              
              dispatch(setUser(response?.data))
              navigate('/dashboard')
          }
        }
        catch(e)
        {
            console.log(e)
        }

  };
  

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-xl mb-4">
            <span className="text-white text-2xl font-bold">P</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to manage your projects
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-7">

          <form onSubmit={handleSubmit} className="space-y-5">

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
                outline-none focus:ring-2 focus:ring-blue-500
                focus:border-blue-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300
                  rounded-lg outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-blue-500 transition"
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

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700
              text-white font-semibold py-3 rounded-lg
              transition duration-200 shadow-sm"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Create account
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

export default Login;