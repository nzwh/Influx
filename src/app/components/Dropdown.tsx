import React from 'react';

const Dropdown: React.FC = () => {
  return (
    <div className='font-regular leading-7 absolute bg-white border-b-2 right-[10%] px-[3%] top-[7%]'>
      <div className='border-b-2 text-gray-600 '> <a href="/profile">Profile</a> </div>
      <div className='border-b-2 text-gray-600'> <a>Settings</a> </div>
      <div className='border-b-2 text-gray-600'> <a>Log Out</a> </div>
    </div>
  )
}

export default Dropdown;