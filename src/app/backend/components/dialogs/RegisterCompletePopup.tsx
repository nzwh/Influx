import Link from 'next/link';
import Image from 'next/image';

export default function RegisterCompletePopup() {
  return (
    <main className="text-gray-800 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-sm p-7 w-96 flex flex-col gap-3 z-[50] items-center justify-center">
        <h6 className="text-gray-800 font-medium text-center text-3xl tracking-tight">Thank you for signing up!</h6>
        <h6 className="text-gray-800 font-light text-[0.85rem] text-center px-3 items-center justify-center">
          Please check your email to confirm your account. Once confirmed, you'll be 
          able to log in and start exploring everything Influx has to offer.
        </h6>
        <Image alt="Cat in desktop with email on screen" src="/root/confirmemail.png" width={200} height={200} style={{ transform: 'scale(1.3)' }} />
        <h6 className="text-gray-800 font-light text-[0.7rem] text-center px-3 pb-2 items-center justify-center">
          If you don't see the email, kindly check your spam folder. Welcome to the community!
        </h6>
				<Link href="/auth/login" className="bg-slate-900 text-violet-300 // h-6 py-5 px-4 // flex items-center gap-1 
          // rounded-full cursor-pointer // hover:bg-slate-900 hover:text-violet-300 transition-colors duration-100">
          <h6 className="text-[0.9rem] font-regular leading-3">Continue Login</h6>
        </Link>
      </div>
    </main>
  );
};