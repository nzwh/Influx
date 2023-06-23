import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

interface ProfileDialogProps {
  onClose: () => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({ onClose }) => {
	return (
		<main className="text-gray-950 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"> 
		  <div className="bg-white rounded-lg p-0 flex flex-row h-[36rem] w-[30rem]">
				
				<div id="return1" className="p-10 h-[32rem] w-[95rem]">
					<div className="flex flex-row pb-4 gap-[0.25rem] items-center justify-between" onClick={onClose}>
						<div className="flex flex-row gap-[0.25rem] items-center">
							<h6 className="font-bold text-[0.6rem] h-full cursor-pointer">Return to profile.</h6>
							<Image className="flex cursor-pointer" src="/icons/b-arrowr.svg" alt="Right Arrow Icon" width={12} height={12} />
						</div>
						<div className="flex flex-row gap-[0.25rem] items-center">
							<Image className="flex cursor-pointer" src="/icons/b-x.svg" alt="X Icon" width={12} height={12} />
						</div>
					</div>

					<div className="flex flex-row gap-4 w-full">
						<div className="flex flex-col">
							<Image className="rounded-full pt-2" src="/avatars/temp.jpg" alt="User Icon" width={110} height={110} />
						</div>

						<div className="flex flex-col w-full">

							<div className="flex flex-row gap-3 w-full items-center">
								<div className="flex flex-col w-full">
									<h6 className="text-black font-medium text-[0.7rem] tracking-tighter leading-4 pt-2">First Name</h6>
									<div className="flex flex-row bg-white rounded-[0.25rem] pt-1 h-8">
										<Image className="w-7 bg-gray-300 rounded-l-[0.25rem] p-2" src="/icons/b-term.svg" alt="Input Icon" width={10} height={10} />
										<input type="text" placeholder="Enter first name" className="w-full text-[0.7rem] bg-gray-100 rounded-r-[0.25rem] p-2 tracking-tighter"></input>
									</div>
								</div>

								<div className="flex flex-col w-full">
									<h6 className="text-black font-medium text-[0.7rem] tracking-tighter leading-4 pt-2">Last Name</h6>
									<div className="flex flex-row bg-white rounded-[0.25rem] pt-1 h-8">
										<Image className="w-7 bg-gray-300 rounded-l-[0.25rem] p-2" src="/icons/b-term.svg" alt="Input Icon" width={10} height={10} />
										<input type="text" placeholder="Enter last name" className="w-full text-[0.7rem] bg-gray-100 rounded-r-[0.25rem] p-2 tracking-tighter"></input>
									</div>
								</div>
							</div>
							
							<h6 className="text-black font-medium text-[0.7rem] tracking-tighter leading-4 pt-3">Username</h6>
							<div className="flex flex-row bg-white rounded-[0.25rem] pt-1 h-8">
								<Image className="w-7 bg-gray-300 rounded-l-[0.25rem] p-2" src="/icons/b-at.svg" alt="At Icon" width={10} height={10} />
								<input type="text" placeholder="Enter username" className="w-full text-[0.7rem] bg-gray-100 rounded-r-[0.25rem] p-2 tracking-tighter"></input>
							</div>

							<h6 className="text-black font-medium text-[0.7rem] tracking-tighter leading-4 pt-3">Email Address</h6>
							<div className="flex flex-row bg-white rounded-[0.25rem] pt-1 h-8">
								<Image className="w-7 bg-gray-300 rounded-l-[0.25rem] p-2" src="/icons/b-mail.svg" alt="Mail Icon" width={10} height={10} />
								<input type="text" placeholder="Enter email address" className="w-full text-[0.7rem] bg-gray-100 rounded-r-[0.25rem] p-2 tracking-tighter"></input>
							</div>

							<h6 className="text-black font-medium text-[0.7rem] tracking-tighter leading-4 pt-3">Contact Number</h6>
							<div className="flex flex-row bg-white rounded-[0.25rem] pt-1 h-8">
								<Image className="w-7 bg-gray-300 rounded-l-[0.25rem] p-2" src="/icons/b-phone.svg" alt="Phone Icon" width={10} height={10} />
								<input type="text" placeholder="Enter contact number" className="w-full text-[0.7rem] bg-gray-100 rounded-r-[0.25rem] p-2 tracking-tighter"></input>
							</div>

							<h6 className="text-black font-medium text-[0.7rem] tracking-tighter leading-4 pt-3">Biography</h6>
							<div className="flex flex-row bg-white rounded-[0.25rem] pt-1 h-8">
								<Image className="w-7 bg-gray-300 rounded-l-[0.25rem] p-2" src="/icons/b-bio.svg" alt="Paper Icon" width={10} height={10} />
								<input type="text" placeholder="Enter your bio here" className="w-full text-[0.7rem] bg-gray-100 rounded-r-[0.25rem] p-2 tracking-tighter"></input>
							</div>

							<h6 className="text-black font-medium text-[0.7rem] tracking-tighter leading-4 pt-3">Modes of Payment</h6>
							<div className="flex flex-row bg-white rounded-[0.25rem] pt-1 h-8">
								<Image className="w-7 bg-gray-300 rounded-l-[0.25rem] p-2" src="/icons/b-credit2.svg" alt="Credit Card Icon" width={10} height={10} />
								<input type="text" placeholder="Enter modes of payment" className="w-full text-[0.7rem] bg-gray-100 rounded-r-[0.25rem] p-2 tracking-tighter"></input>
							</div>

							<h6 className="text-black font-medium text-[0.7rem] tracking-tighter leading-4 pt-3">Modes of Delivery</h6>
							<div className="flex flex-row bg-white rounded-[0.25rem] pt-1 h-8">
								<Image className="w-7 bg-gray-300 rounded-l-[0.25rem] p-2" src="/icons/b-deli.svg" alt="Delivery Box Icon" width={10} height={10} />
								<input type="text" placeholder="Enter modes of delivery" className="w-full text-[0.7rem] bg-gray-100 rounded-r-[0.25rem] p-2 tracking-tighter"></input>
							</div>

						</div>
					</div>

					<div className="p-3"></div>
					<div className="flex flex-row items-center justify-end bg-white gap-4">
						<h6 className="text-black font-medium text-[0.6rem] h-full cursor-pointer" onClick={onClose}>Cancel</h6>
						<div className="w-fixed px-3 flex flex-row bg-black rounded-2xl p-[0.5rem] gap-[0.5rem] justify-center cursor-pointer">
							<h6 className="text-slate-400 font-medium text-[0.6rem] h-full cursor-pointer">Save Changes</h6>
						</div>
					</div>
				</div>

			</div>

		</main>
	);
};
  
export default ProfileDialog;