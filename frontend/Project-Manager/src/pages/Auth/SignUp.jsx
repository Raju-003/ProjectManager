import React, { useState, useContext } from 'react';
import AuthLayout from '../../components/AuthLayout';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/UserContext'; 
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import Input from '../../components/Inputs/Input';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadimage'; 

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminInviteToken, setAdminInviteToken] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext); // Assuming you have a UserContext to manage user state
  // Handle SignUp form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
     
    let profileImageUrl = '';

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

  setError('');
  // SignUp API call
  try {

    //Upload image if present
    if (profilePic) {
      const imgUploadRes = await uploadImage(profilePic);
      profileImageUrl = imgUploadRes.imageUrl ||"";
    }
    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
      name: fullName,
      email,  
      password,
      profileImageUrl,
      adminInviteToken,
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
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by creating your details below.
        </p>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Add your form inputs here */}
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              required
            />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password with min 8 characters"
              minLength={8}
              required
            />
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full p-2 border rounded"
              required
            />
            <Input
              type="text"
              value={adminInviteToken}
              onChange={(e) => setAdminInviteToken(e.target.value)}
              placeholder="Admin Invite Token (if any with 6-Digit Code) "
            
            />

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700 transition-colors"
          >
            SIGN UP
          </button>
          <p className='text-[18px] text-slate-700 mt-4'>
            Already have an account?{' '}
           <Link to="/login" className='text-blue-600 hover:underline'>
             Login
             </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;