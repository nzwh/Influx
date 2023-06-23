import React from 'react';

interface ProfileDialogProps {
  onClose: () => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({ onClose }) => {
	return (
		<main className="text-gray-950 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"> 
			<section className="w-full flex flex-col bg-white rounded-lg p-4 gap-4 cursor-pointer">
				<button onClick={onClose}>Close</button>
			</section>
		</main>
	);
};
  
export default ProfileDialog;