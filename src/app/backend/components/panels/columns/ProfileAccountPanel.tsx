// 'use server'

import React, { useState } from 'react';
import Image from 'next/image';

// Layouts
import Wrapper from '@/src/app/backend/components/layouts/WrapperLayout';
import Panel from '@/src/app/backend/components/layouts/PanelLayout';

// Panels, Popovers & Popups
import UpdateProfile from '@/src/app/backend/components/dialogs/UpdateProfilePopup';

// Hooks & Classes
import { UserClass } from '@/libraries/structures';
import { useGlobalContext } from '@/src/app/backend/hooks/context/useGlobalContext';
import { useToTitleCase } from '@/src/app/backend/hooks/useToConvert'

// Icons
import { Banknote, CreditCard, Map,  Package2, Settings2 } from 'lucide-react';

const ProfileAccountPanel: React.FC<{ user: UserClass }> = ({ user }) => {

    const { user: active } = useGlobalContext();

  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const handleProfileEditOpen = () => {
    setIsProfileEditOpen(true);
  };
  const handleProfileEditClose = () => {
    setIsProfileEditOpen(false);
  };

  return (
		<main>
      <Panel classes="flex-col relative z-[1]">

        {/* Header */}
        <Image className="absolute w-full h-24 rounded-sm object-cover" src={user.banner} alt="" width={1000} height={1000} />
        <div className="absolute z-[0] bg-[url('/root/profile_dent.svg')] bg-contain w-full h-14 rounded-sm top-14 bg-no-repeat" />

        {/* Account */}
        <div className="z-[1] flex flex-col gap-2 p-4">

          {/* Padder */}
          <div className="h-8"></div>

          {/* Profile */}
          <div className="flex flex-row justify-between items-center gap-2 p-2 mt-1">
          <div className="flex flex-row items-center gap-2 w-full">
            
            {/* Icon */}
            <Image className="rounded-full w-9 h-9 object-cover" src={user.icon} alt="User Icon" width={36} height={36} />

            {/* Name */}
            <Wrapper className="flex flex-col justify-center h-full pb-1">
              <h6 className="flex flex-row gap-0.5 items-start flex-wrap text-gray-800 font-medium text-sm leading-5 tracking-tight w-full">
                <span>
                  {user.first_name}
                </span>
                { user.is_verified ? (
                <span className="inline-block w-4 h-4 relative top-[0.125rem]"> 
                  <Image src="/root/verified.svg" alt="verified" width={16} height={16} />
                </span>
                ) : null }
              </h6>
              <h6 className="text-gray-500 font-regular text-[0.625rem] leading-3">
                {`@${user.handle}`}
              </h6>
            </Wrapper>
            
          </div>

          {/* Edit Profile */}
          {(user.uuid === active.uuid) ? (
            <button className="flex flex-row items-center gap-1 bg-gray-100 hover:bg-gray-200 p-1 w-fit text-gray-800 font-regular text-[0.625rem] leading-3 transition-colors duration-200 mr-2" onClick={handleProfileEditOpen}>
              <Settings2 className="opacity-70" color="black" size={12} />
            </button>
          ) : null }

          </div>

          {/* Biography */}
          <p className="text-gray-800 font-light text-[0.625rem] leading-[0.78125rem]">
            {user.biography}
          </p>
          
          <div className="flex flex-wrap items-center gap-2">

          {/* Location */}
          <div className="flex flex-row items-center gap-1">
            <Map className="opacity-70" color="black" size={12} />
            <h6 className="text-gray-800 font-regular text-[0.625rem] leading-3">{user.location}</h6>
          </div>

          </div>
          
          {/* Divider */}
          <div className="py-1">
            <hr/>
          </div>
          
          <div className="flex flex-wrap gap-4">

          {/* Payment Methods */}
          <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-1">
            <Banknote className="opacity-70" color="black" size={12} />
            <h6 className="text-gray-800 font-regular text-[0.625rem] leading-3">Payment Methods</h6>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            {user.payment_methods.map((method: any) => (
              <div className="flex flex-row items-center gap-1">
                <CreditCard className="opacity-70" color="black" size={12} />
                <h6 className="text-gray-800 font-regular text-[0.625rem] leading-3">{useToTitleCase(method)}</h6>
              </div>
            ))}
          </div>
          </div>

          {/* Delivery Methods */}
          <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-1">
            <Package2 className="opacity-70" color="black" size={12} />
            <h6 className="text-gray-800 font-regular text-[0.625rem] leading-3">Delivery Methods</h6>
          </div>
          <div className="flex flex-wrap items-center gap-1">
          {user.delivery_methods.map((method: any) => (
              <div className="flex flex-row items-center gap-1">
                <CreditCard className="opacity-70" color="black" size={12} />
                <h6 className="text-gray-800 font-regular text-[0.625rem] leading-3">{useToTitleCase(method)}</h6>
              </div>
            ))}
          </div>
          </div>

          </div>
        </div>
      </Panel>

      {isProfileEditOpen && (
        <UpdateProfile onClose={handleProfileEditClose} />
      )}
		</main>
  );
};

export default ProfileAccountPanel;