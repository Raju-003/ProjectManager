import React, { useState,useContext } from 'react';
import AuthLayout from '../../components/AuthLayout';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import SignUp from './SignUp';
import { UserContext } from '../../context/UserContext';
import { API_PATHS } from '../../utils/apiPaths';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 
  const { updateUser } = useContext(UserContext); // Assuming you have a UserContext to manage user state
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form submitted"); 
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    setError('');
  // Login API Call
try {
  console.log("Calling:", API_PATHS.AUTH.LOGIN); 
  const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
    email,
    password,
  });

  const { token, role } = response.data;

  if (token) {
    localStorage.setItem("token", token);
    updateUser(response.data); // Assuming updateUser is a function to set user data in context
    // Redirect based on role
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  }
} catch (error) {
  if (error.response && error.response.data.message) {
    setError(error.response.data.message);
  } else {
    setError("Something went wrong. Please try again.");
  }
  }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-2xl font-semibold text-black">Welcome Back</h3>
        <p className="text-s text-slate-700 mt-[5px] mb-6">
          Please enter your credentials to access your account.
        </p>

        {error && <div className="text-red-500 text-s mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="Enter your email address"
            type="email"
            required
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter your password"
            type="password"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
          <p className="text-s text-slate-700 mt-4">
            Don't have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer underline"
              onClick={() => navigate('/SignUp')}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
