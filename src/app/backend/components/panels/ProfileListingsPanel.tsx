import React from 'react';

import { RotateCcw, Star } from 'lucide-react';

interface Props {
  handle: string;
}

const ProfileListings: React.FC<Props> = ({ handle }) => {
  return (
    <section id="listings" className="w-full flex flex-row justify-between bg-white rounded-sm p-4 gap-4 filter drop-shadow-2xl">
      <div className="flex flex-row gap-4 items-center">
      <h6 className="text-gray-800 font-regular text-xs leading-4">Listings by @{handle}</h6>
      <h6 className="text-gray-800 font-regular text-xs leading-4">View all</h6>
      </div>

      <div className="flex flex-row gap-2 items-center">
      <div>
        <div className="flex flex-row gap-1 items-center justify-center px-1">
        <RotateCcw className="opacity-70" color="black" size={12} strokeWidth={3} />
        <h6 className="text-gray-800 font-regular text-xs leading-3">Recent</h6>
        </div>
        <div className="relative">
        <div className="absolute bottom-[-1.1rem] w-full h-[5px] bg-gray-800"></div>
        </div>
      </div>
      
      <div className="flex flex-row gap-2 items-center justify-center px-1">
        <Star className="opacity-70" color="black" size={12} strokeWidth={3} />
        <h6 className="text-gray-800 font-regular text-xs leading-3">Popular</h6>
      </div>
      </div>
    </section>
  );
};

export default ProfileListings;