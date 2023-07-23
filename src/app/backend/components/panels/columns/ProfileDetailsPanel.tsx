import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import UpdateProfilePopup from '@/src/app/backend/components/dialogs/UpdateProfilePopup';
import { CreditCard, Map, MoveUpRight, Package, Star } from 'lucide-react';

const ProfileDetails: React.FC = () => {

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
      <aside onClick={handleProfileEditOpen} className="w-full flex flex-col bg-white rounded-sm p-4 gap-4 cursor-pointer filter drop-shadow-2xl">
        <div className="flex flex-row justify-between items-start">
          <Link href="/profile">
            <div className="flex flex-row items-center gap-2">
              <Image className="rounded-full" src={user.icon} alt="User Icon" width={36} height={36} />
              <div className="flex flex-col justify-center">
                <h6 className="text-gray-800 font-medium text-md leading-4 tracking-tight">{`${user.first_name} ${user.last_name}`}</h6>
                <h6 className="text-gray-500 font-regular text-xs leading-4">{user.handle}<span className="text-gray-600 bg-gray-200 font-regular text-[0.5rem] relative top-[-0.1rem] tracking-wider rounded-xl px-1.5 py-0.5 ml-2">VERIFIED</span></h6>
            </div>
          </div>
          </Link>
          <MoveUpRight color="black" size={12}/>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-row items-center gap-2">
            <Map className="opacity-70" color="black" size={12} />
            <h6 className="text-gray-800 font-regular text-xs leading-3">Manila, Philippines</h6>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Star className="opacity-70" color="black" size={12} />
            <h6 className="text-gray-800 font-regular text-xs leading-3">4.2/5 Rating</h6>
          </div>
        </div>

        <p className="text-gray-800 font-light text-xs leading-4">
          For questions or actual photos of the products, please DM us. Thanks!
        </p>

        <div className="flex flex-col justify-center gap-2">
          <div className="flex flex-row items-center gap-2">
            <CreditCard className="opacity-70" color="black" size={12} strokeWidth={3} />
            <h6 className="text-gray-800 font-regular text-xs leading-3">Payment Methods</h6>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-row items-center gap-2">
              <Image className="rounded-sm" src="/icons/b-paypal.svg" alt="PayPal" width={24} height={12} />
              <h6 className="text-gray-800 font-regular text-xs">PayPal</h6>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Image className="rounded-sm" src="/icons/b-credit.svg" alt="Credit Card" width={24} height={12} />
              <h6 className="text-gray-800 font-regular text-xs">Card</h6>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Image className="rounded-sm" src="/icons/b-cash.svg" alt="Cash" width={24} height={12} />
              <h6 className="text-gray-800 font-regular text-xs">Cash</h6>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2">
          <div className="flex flex-row items-center gap-2">
            <Package className="opacity-70" color="black" size={12} strokeWidth={3} />
            <h6 className="text-gray-800 font-regular text-xs">Delivery Methods</h6>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-row items-center gap-2">
              <Image className="rounded-sm" src="/icons/b-shopee.svg" alt="Shopee Checkout" width={24} height={12} />
              <h6 className="text-gray-950 font-regular text-xs">Shopee Checkout</h6>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Image className="rounded-sm" src="/icons/b-meetup.svg" alt="Meetup" width={24} height={12} />
              <h6 className="text-gray-800 font-regular text-xs">Meetup</h6>
            </div>
          </div>
        </div>
      </aside>

      {isProfileEditOpen && (
        <UpdateProfilePopup isOpen={isProfileEditOpen} onClose={handleProfileEditClose} />
      )}
		</main>
  );
};

export default ProfileDetails;