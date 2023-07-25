import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import useModal from "@/src/app/backend/hooks/useModal";
import AutosizeTextarea from '@/src/app/backend/components/utilities/AutosizeTextarea';
import { UserInterface } from '@/libraries/structures';
import ToTitleCase from '@/src/app/backend/functions/ToTitleCase';
import CheckboxesPopover from '@/src/app/backend/components/popovers/CheckboxesPopover';

import { ChevronDown, Globe, ImagePlus, RefreshCw, Sparkles, X } from 'lucide-react';
import { Banknote, CreditCard, Map, MoveUpRight, Package, Package2, Repeat2, Star } from 'lucide-react';
import supabase from '@/src/app/backend/model/supabase';
import useFetchUser from "@/src/app/backend/hooks/useFetchUser";
import { useRouter } from 'next/navigation';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: UserInterface) => void;
}

const UpdateProfilePopup: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {

  // Allows clicking outside of the modal to close it
  const { modalRef, handleClickOutside } = useModal({ isOpen: isOpen, onClose: onClose });

  const router = useRouter();
  let activeD = JSON.parse(sessionStorage.getItem('token')!)
  
  useEffect(() => {
    if(sessionStorage.getItem('token')) {
      activeD = JSON.parse(sessionStorage.getItem('token')!)
      console.log(activeD.user.id)
    }
    else {
      router.push('/home')
    }
  }, [])
  
  const { user, fetchUser } = useFetchUser({ type: 'userId', userId: activeD.user.id as string });
  const activeData = user[0];

  const defaults = require("@/json/defaults.json");

  // Images
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageArray: string[] = Array.from(files).map(file => URL.createObjectURL(file));

      if (selectedImages.length + imageArray.length > 4) {
        alert("You can only upload up to 4 images.");
        return;
      }

      setSelectedImages(prevSelectedImages => [...prevSelectedImages, ...imageArray]);
    }
  };

  const handleImageRemove = (image: string) => {
    setSelectedImages(prevSelectedImages => prevSelectedImages.filter(img => img !== image));
  };

  // form
  const [formData, setFormData] = useState<UserInterface>({
    id: activeData ? activeData.id : 0,
    uuid: activeData ? activeData.uuid : "",
    handle: activeData ? activeData.handle : "",
    email_address: activeData ? activeData.email_address : "",

    icon: activeData ? activeData.icon : "",
    banner: activeData ? activeData.banner : "",
    first_name: activeData ? activeData.first_name : "",
    last_name: activeData ? activeData.last_name : "",

    phone_number: activeData ? activeData.phone_number : "",
    location: activeData ? activeData.location : "",
    biography: activeData ? activeData.biography : "",

    payment_methods: activeData ? activeData.payment_methods : [],
    delivery_methods: activeData ? activeData.delivery_methods : [],

    is_verified: activeData ? activeData.is_verified : false
  });

  // InputListener
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (event.target.name === "biography") {
      setBioValue(event.target.value);
    }
  };

  const handlePMSubmit = (data: string[]) => {
    setFormData({ ...formData, payment_methods: data });
  };
  const handleDMSubmit = (data: string[]) => {
    setFormData({ ...formData, delivery_methods: data });
  };

  // SubmitListener
  const handleSubmit = async () => {
  
    const updatedUser : UserInterface = {
      id: formData.id,
      uuid: formData.uuid,
      handle: formData.handle,
      email_address: formData.email_address,

      icon: formData.icon,
      banner: formData.banner,
      first_name: formData.first_name,
      last_name: formData.last_name,

      phone_number: formData.phone_number,
      location: formData.location,
      biography: formData.biography,

      payment_methods: formData.payment_methods,
      delivery_methods: formData.delivery_methods,

      is_verified: formData.is_verified,
    };
  
    // try {
    //   // Insert the new post into the "posts" table
    //   const { data: newPostData, error: newPostError } = await supabase
    //     .from('posts')
    //     .insert([newPost]);
  
    //   if (newPostError) {
    //     throw newPostError;
    //   }
  
    //   console.log('New post added successfully:', newPostData);
    //   onSubmit(newPostData);
    //   onClose();
    // } catch (error) {
    //   console.error('Error submitting post:', error);
    // }
  };  
  
  const [isPMSelectExpanded, setIsPMSelectExpanded] = useState(false);
  const handleExpandPMSelect = () => {
    setIsPMSelectExpanded(!isPMSelectExpanded);
  };

  const [isDMSelectExpanded, setIsDMSelectExpanded] = useState(false);
  const handleExpandDMSelect = () => {
    setIsDMSelectExpanded(!isDMSelectExpanded);
  };

  // Autosizing
  const [bioValue, setBioValue] = useState("");
  const textBioAreaRef = useRef<HTMLTextAreaElement>(null);
  AutosizeTextarea(textBioAreaRef.current, bioValue);

  return (
    <main  
      className="text-gray-800 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-[60]"
      ref={modalRef} onClick={handleClickOutside}>

      <div className="bg-white rounded-sm w-[24rem] flex flex-col gap-2 z-[40] relative">

        <div className="absolute bg-[url('/root/login.png')] bg-cover w-full h-[11rem] rounded-sm" />
        <div className="absolute z-[0] bg-[url('/root/profile_dent.svg')] bg-contain w-full h-[24rem] rounded-sm top-32 bg-no-repeat" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Account */}
        <div className="z-[1] flex flex-col gap-2 p-4">

          {/* Padder */}
          <div className="h-28"></div>

          {/* Profile */}
          <div className="flex flex-row items-center gap-2 w-full py-2 px-4">

            {/* Author Avatar */}
            <Image className="rounded-full w-12 h-12" src={activeData ? activeData.icon : "/root/temp.jpg"} alt="User Icon" width={48} height={48} />

            <div className="flex flex-col justify-center w-full">

              <div className="flex flex-row gap-2 w-full">

              {/* Author Name */}
              <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} className="text-gray-800 font-normal text-lg leading-3 tracking-tight focus:border-b-[1px] cursor-pointer overflow-y-hidden w-full" placeholder="First Name"/>

              {/* Author Name */}
              <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} className="text-gray-800 font-normal text-lg leading-3 tracking-tight focus:border-b-[1px] cursor-pointer overflow-y-hidden w-full" placeholder="Last Name"/>

              </div>

              {/* Author Handle */}
              <h6 className="text-gray-500 font-light text-sm leading-4">{`@${activeData ? activeData.handle : ""}`}</h6>

            </div>
          </div>

          {/* Biography */}
          <textarea name="biography" value={formData.biography} onChange={handleInputChange} ref={textBioAreaRef} className="text-gray-800 font-light text-xs leading-4 focus:border-b-[1px] focus:outline-none resize-none cursor-pointer overflow-y-hidden" placeholder="Biography" rows={1} maxLength={100}/>

          {/* Location */}
          <div className="flex flex-row items-center gap-1 w-full">
            <Map className="opacity-70" color="black" size={14} />
            <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="text-gray-800 font-light text-xs leading-3 focus:border-b-[1px] focus:outline-none w-full cursor-pointer" placeholder="Location" />
          </div>

          {/* Divider */}
          <div className="py-2">
            <hr/>
          </div>

          <div className="flex flex-wrap gap-4">

          {/* Payment Methods */}
          <div className="flex flex-row gap-2 w-full">
            
            <div className="flex justify-center relative w-full">
            <div className="flex flex-row w-full items-center bg-gray-100 rounded-sm px-2 hover:bg-gray-200 transition-colors duration-200 border border-gray-200 py-2 justify-between cursor-pointer" onClick={handleExpandPMSelect}>
              <div className="flex flex-row gap-2">
                <Star className="text-gray-800" size={12} strokeWidth={3} />
                <h6 className="text-gray-800 font-light text-xs leading-3">Payment Methods</h6>
              </div>
              <ChevronDown className="text-gray-800" size={12} strokeWidth={3} />
            </div>
            {isPMSelectExpanded && <CheckboxesPopover prevData={formData.payment_methods} onSubmit={handlePMSubmit} onClose={handleExpandPMSelect} data={defaults.payment_methods as string[]} />}
            </div>

            <div className="flex justify-center relative w-full">
            <div className="flex flex-row w-full items-center bg-gray-100 rounded-sm px-2 hover:bg-gray-200 transition-colors duration-200 border border-gray-200 py-2 justify-between cursor-pointer" onClick={handleExpandDMSelect}>
              <div className="flex flex-row gap-2">
                <Star className="text-gray-800" size={12} strokeWidth={3} />
                <h6 className="text-gray-800 font-light text-xs leading-3">Delivery Methods</h6>
              </div>
              <ChevronDown className="text-gray-800" size={12} strokeWidth={3} />
            </div>
            {isDMSelectExpanded && <CheckboxesPopover prevData={formData.delivery_methods} onSubmit={handleDMSubmit} onClose={handleExpandDMSelect} data={defaults.delivery_methods as string[]} />}
            </div>
          </div>
          
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button type="button" className="text-xs font-light px-4 py-1.5 text-gray-500" onClick={onClose}>Cancel</button>
            <button type="submit" className="text-xs font-light px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-violet-300 rounded-full transition-colors duration-200">Save changes</button>
          </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default UpdateProfilePopup;