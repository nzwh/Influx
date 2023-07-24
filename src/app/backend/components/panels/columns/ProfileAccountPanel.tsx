import React, { useState } from 'react';
import Image from 'next/image';

import UpdateProfilePopup from '@/src/app/backend/components/dialogs/UpdateProfilePopup';
import Panel from '@/src/app/backend/components/template/PanelTemplate';
import { Banknote, CreditCard, Map, MoveUpRight, Package, Package2, Repeat2, Star } from 'lucide-react';

const ProfileAccount: React.FC = () => {

  let user = require('@/json/active.json'); // TODO: Load user info dynamically through auth
  
  // Handles editing the user's profile.
	// const [formData, setFormData] = useState<any>(null);
	// const handleFormSubmit = (data: any) => {
  //   setFormData(data);
	// 	onPostRecieve(data);
  // };

  // Handles updating the user's profile.
  // TODO: Relocate to own modal
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);

  const handleProfileEditOpen = () => {
    setIsProfileEditOpen(true);
  };
  const handleProfileEditClose = () => {
    setIsProfileEditOpen(false);
  };

  return (
		<main>
      <Panel classes="flex-col relative">

        {/* Header */}
        <div className="absolute z-[0] bg-[url('/root/login.png')] bg-cover w-full h-20 rounded-sm" />
        <div className="absolute z-[1] bg-[url('/root/profile_dent.svg')] bg-contain w-full h-14 rounded-sm top-10 bg-no-repeat" />

        {/* Account */}
        <div className="z-[2] flex flex-col gap-2 p-4">

          {/* Padder */}
          <div className="h-4"></div>

          {/* Profile */}
          <div className="flex flex-row justify-between items-center gap-2 p-2">
          <div className="flex flex-row items-center gap-2 w-full">

            {/* Author Avatar */}
            <Image className="rounded-full" src={user?.icon || ""} alt="User Icon" width={36} height={36} />

            <div className="flex flex-col justify-center w-full">
              <div className="flex flex-row gap-0.5 items-center">

                {/* Author Name */}
                <h6 className="text-gray-800 font-medium text-base leading-3 tracking-tight">
                  {`${user?.first_name} ${user?.last_name}`}
                </h6>

                {/* Verified Status */}
                { user?.is_verified ? (
                  <Image src="/root/verified.svg" width={18} height={18} alt="Verified" />
                ) : (
                  <div className="w-1"></div>
                )}

              </div>

              {/* Author Handle */}
              <h6 className="text-gray-500 font-light text-[0.65rem] leading-4">{`@${user?.handle}`}</h6>

            </div>
          </div>

          {/* Edit Profile */}
          <button className="flex flex-row items-center gap-1 bg-gray-100 hover:bg-gray-200 rounded-full px-2 py-0.5 w-fit text-gray-800 font-regular text-[0.625rem] leading-3 transition-colors duration-200" onClick={handleProfileEditOpen}>
            Edit
          </button>

          </div>

          {/* Biography */}
          <p className="text-gray-800 font-light text-[0.625rem] leading-[0.78125rem]">
            For questions or actual photos of the products, please DM us. Thanks!
          </p>
          
          <div className="flex flex-wrap items-center gap-2">

          {/* Location */}
          <div className="flex flex-row items-center gap-1">
            <Map className="opacity-70" color="black" size={12} />
            <h6 className="text-gray-800 font-regular text-[0.625rem] leading-3">{user.location}</h6>
          </div>

          {/* Postcount */}
          <div className="flex flex-row items-center gap-1">
            <Repeat2 className="opacity-70" color="black" size={12} />
            <h6 className="text-gray-800 font-regular text-[0.625rem] leading-3">{user.posts.length} Posts</h6>
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
            <div className="w-7">
              <Image className="rounded-sm" src="/minicards/pm_paypal.svg" alt="Paypal" width={1000} height={2000} />
            </div>
            <div className="w-7">
              <Image className="rounded-sm" src="/minicards/pm_card.svg" alt="Card" width={1000} height={2000} />
            </div>
            <div className="w-7">
              <Image className="rounded-sm" src="/minicards/pm_cash.svg" alt="Cash" width={1000} height={2000} />
            </div>
          </div>
          </div>

          {/* Delivery Methods */}
          <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-1">
            <Package2 className="opacity-70" color="black" size={12} />
            <h6 className="text-gray-800 font-regular text-[0.625rem] leading-3">Delivery Methods</h6>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <div className="w-7">
              <Image className="rounded-sm" src="/minicards/dm_spx.svg" alt="Paypal" width={1000} height={2000} />
            </div>
            <div className="w-7">
              <Image className="rounded-sm" src="/minicards/dm_meetup.svg" alt="Card" width={1000} height={2000} />
            </div>
          </div>
          </div>

          </div>
        </div>
      </Panel>

      {isProfileEditOpen && (
        <UpdateProfilePopup isOpen={isProfileEditOpen} onClose={handleProfileEditClose} />
      )}
		</main>
  );
};

export default ProfileAccount;