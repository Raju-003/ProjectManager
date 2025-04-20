import React from 'react';
import UI_IMG from '../assets/images/auth.png';

const AuthLayout = ({ children }) => {
  return (
    <div className='flex min-h-screen bg-white'>
      {/* Content Section */}
      <div className='w-full md:w-[60%] px-6 sm:px-12 pt-8 pb-12 overflow-y-auto'>
        <h2 className='text-lg font-medium text-black mb-8'>Project Manager</h2>
        {children}
      </div>

      {/* Image Section */}
      <div className='hidden md:flex w-[40%] bg-gray-50 justify-center items-center p-8'>
        <div className='relative w-full h-full flex justify-center items-center'>
          <img 
            src={UI_IMG} 
            alt="Authentication illustration" 
            className='max-w-full max-h-[80vh] object-contain'
            loading='lazy'
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;