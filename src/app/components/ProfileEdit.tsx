import { AlignJustify, AtSign, ChevronRight, CreditCard, FormInput, Mail, Package, Phone, SquareAsterisk, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface ProfileDialogProps {
  onClose: () => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({ onClose }) => {
	return (
		<main className="text-gray-800 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"> 
		  <div className="bg-white rounded-sm p-6 flex flex-col h-[41rem] w-[32rem] gap-2">
				
				<div className="flex flex-row items-center justify-between cursor-pointer" onClick={onClose}>
					<div className="flex flex-row gap-2 items-center">
						<h6 className="font-medium text-xs h-full">Return to profile</h6>
						<ChevronRight className="opacity-70" color="black" size={14} strokeWidth={3}/>
					</div>
					<X className="opacity-70" color="black" size={14} strokeWidth={3}/>
				</div>

				<div className="flex flex-row gap-6 w-full items-start">
					<Image className="rounded-full mt-6" src="/avatars/temp.jpg" alt="User Icon" width={110} height={110} />
					<form className="flex flex-col w-full">
							<div className="flex flex-row gap-4 w-full items-center pt-3">
                <div className="flex flex-col w-full">
                <label htmlFor="firstname" className="text-gray-800 font-regular text-xs leading-8">First name</label>
                <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
                  <div className="h-full aspect-square flex items-center justify-center">
                    <FormInput className="opacity-50" color="black" strokeWidth={3} size={14}/>
                  </div>
                  <input id="firstname" type="text" placeholder="Influx" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2 italic" required></input>
                </div>
                </div>

                <div className="flex flex-col w-full">
                <label htmlFor="lastname" className="text-gray-800 font-regular text-xs leading-8">Last name</label>
                <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
                  <div className="h-full aspect-square flex items-center justify-center">
                    <FormInput className="opacity-50" color="black" strokeWidth={3} size={14}/>
                  </div>
                  <input id="lastname" type="text" placeholder="IO" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2 italic" required></input>
                </div>
                </div>
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="username" className="text-gray-800 font-regular text-xs leading-8">Username</label>
                <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
                  <div className="h-full aspect-square flex items-center justify-center">
                    <AtSign className="opacity-50" color="black" strokeWidth={3} size={14}/>
                  </div>
                  <input id="username" type="text" placeholder="@influx.io" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2 italic" required></input>
                </div>
              </div>
						
							<div className="flex flex-col w-full">
                <label htmlFor="email" className="text-gray-800 font-regular text-xs leading-8">Email Address</label>
                <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
                  <div className="h-full aspect-square flex items-center justify-center">
                    <Mail className="opacity-50" color="black" strokeWidth={3} size={14}/>
                  </div>
                  <input id="email" type="email" placeholder="hq@influx.org" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2 italic" required></input>
                </div>
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="password" className="text-gray-800 font-regular text-xs leading-8">Password</label>
                <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
                  <div className="h-full aspect-square flex items-center justify-center">
                    <SquareAsterisk className="opacity-50" color="black" strokeWidth={3} size={14}/>
                  </div>
                  <input id="password" type="password" placeholder="********" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2 italic" required></input>
                </div>
              </div>

							<div className="flex flex-col w-full">
                <label htmlFor="phnumber" className="text-gray-800 font-regular text-xs leading-8">Phone Number</label>
                <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
                  <div className="h-full aspect-square flex items-center justify-center">
                    <Phone className="opacity-50" color="black" strokeWidth={3} size={14}/>
                  </div>
                  <input id="phnumber" type="text" placeholder="+63" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2 italic"></input>
                </div>
              </div>

							<div className="flex flex-col w-full">
                <label htmlFor="bio" className="text-gray-800 font-regular text-xs leading-8">Biography</label>
                <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
                  <div className="h-full aspect-square flex items-center justify-center">
                    <AlignJustify className="opacity-50" color="black" strokeWidth={3} size={14}/>
                  </div>
                  <input id="bio" type="text" placeholder="Welcome to Influx!" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2 italic"></input>
                </div>
              </div>

							<div className="flex flex-col w-full">
                <label htmlFor="pmethod" className="text-gray-800 font-regular text-xs leading-8">Payment Methods</label>
                <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
                  <div className="h-full aspect-square flex items-center justify-center">
                    <CreditCard className="opacity-50" color="black" strokeWidth={3} size={14}/>
                  </div>
                  <input id="pmethod" type="text" placeholder="Mastercard, VISA" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2 italic"></input>
                </div>
              </div>

							<div className="flex flex-col w-full">
                <label htmlFor="dmethod" className="text-gray-800 font-regular text-xs leading-8">Delivery Methods</label>
                <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
                  <div className="h-full aspect-square flex items-center justify-center">
                    <Package className="opacity-50" color="black" strokeWidth={3} size={14}/>
                  </div>
                  <input id="dmethod" type="text" placeholder="J&T, GOGO, SPX" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2 italic"></input>
                </div>
              </div>
					</form>
				</div>

				<div className="flex flex-row items-center justify-end gap-2 pt-6">
					<button onClick={onClose} className="px-4 flex flex-row rounded-2xl items-center justify-center cursor-pointer gap-2">
						<h6 className="text-gray-800 font-light text-xs h-full cursor-pointer py-1.5">Cancel</h6>
					</button>
					<button type="submit" className="px-4 flex flex-row bg-slate-900 rounded-2xl items-center justify-center cursor-pointer gap-2">
						<h6 className="text-violet-300 font-light text-xs h-full cursor-pointer py-1.5">Save changes</h6>
					</button>
				</div>

			</div>
		</main>
	);
};
  
export default ProfileDialog;