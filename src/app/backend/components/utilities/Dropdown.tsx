import React from 'react';
import { UserCircle2, Cog, LogOut } from 'lucide-react';

const Dropdown: React.FC = () => {
  return (
    <div className='cursor-pointer shadow-lg font-regular leading-7 absolute bg-white border-b-2 right-[10%] px-[3%] top-[105%]'>
      <a href="/profile">
      <div className='border-b-2 text-gray-600 display: flex h-8 pt-0.5'> 
        <UserCircle2 className='pt-0.5'/> &nbsp;&nbsp;Profile
        </div>
      </a>
      <a>
      <div className='border-b-2 text-gray-600 display: flex h-8 pt-0.5'>
       <Cog className='pt-0.5'/>&nbsp;&nbsp;Settings</div>
      </a>  
      <a>
      <div className='text-gray-600 display: flex h-8 pt-0.5'>
        <LogOut className='pt-0.5'/>&nbsp;&nbsp;Log Out</div>
      </a>
    </div>
  )
}

export default Dropdown;