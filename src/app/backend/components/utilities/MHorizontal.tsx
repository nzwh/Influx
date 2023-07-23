import React from 'react';
import { UserCircle2, Cog, LogOut } from 'lucide-react';

const MHorizontal: React.FC = () => {
  return (
    <div className='text-gray-600 text-sm shadow-lg bg-gray-50 absolute cursor-pointer font-regular top-[37%] px-2 right-[2%] leading-7 w-20 z-50'>
      <div className='border-b-2 text-gray-600 flex justify-center h-8 pt-0.5'>Edit</div>
      <div className='text-gray-600 flex justify-center h-8 pt-0.5'>Delete</div>
    </div>
  )
}
export default MHorizontal;