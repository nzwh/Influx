import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import useModal from "@/src/app/backend/hooks/useModal";
import AutosizeTextarea from '@/src/app/backend/components/utilities/AutosizeTextarea';
import { UserClass ,PostClass } from '@/libraries/structures';
import { ToTitleCase } from '@/src/app/backend/hooks/ToConvert'
import CheckboxesPopover from '@/src/app/backend/components/popovers/CheckboxesPopover';

import { ChevronDown, Globe, ImagePlus, RefreshCw, Sparkles, X } from 'lucide-react';
import { Banknote, CreditCard, Map, MoveUpRight, Package, Package2, Repeat2, Star } from 'lucide-react';
import supabase from '@/src/app/backend/model/supabase';
import useFetchUser from "@/src/app/backend/hooks/useFetchUser";
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '../../hooks/GlobalContext';
import OutsideClick from '@/src/app/backend/hooks/OutsideClick';
import SaveImages from '../../hooks/PushImages';
import { v4 as uuidv4 } from "uuid";
import { get } from 'http';
import PushImages from '../../hooks/PushImages';
import PostActions from '../../hooks/PostActions';

interface Props {
  onClose: () => void;
}

const UpdateProfilePopup: React.FC<Props> = ({ onClose }) => {

  const { DeletePhotos } = PostActions();

  // Export user data from global context
  const { user, posts, setUser, setPosts } = useGlobalContext();
  const oldUserIcon = user.icon;
  const oldUserBanner = user.banner;

  // Allow outside click to exit
  const modalRef = useRef<HTMLDivElement | null>(null);
  OutsideClick(modalRef, onClose);

  // Load default values
  const defaults = require("@/json/defaults.json");

  // useStates for images
  const [iconFile, setIconFile] = useState<File>();
  const [isIconChanged, setIsIconChanged] = useState(false);
  const [bannerFile, setBannerFile] = useState<File>();
  const [isBannerChanged, setIsBannerChanged] = useState(false);

  // useState for form data
  const [formData, setFormData] = useState<UserClass>(new UserClass(user));

  // Listens to all input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

    const getFile = (target: HTMLInputElement) => {
      const files = target.files;
      if (!files) return;

      const file = Array.from(files)[0];
      if (file.size > (5 * 1024 * 1024)) {
        alert("One or more images exceed the 5MB size limit.");
        return;
      } else {
        return file;
      }
    }

    switch (event.target.name) {

      case "icon_image":
        const i_result = getFile(event.target as HTMLInputElement);
        if (!i_result) return;
        setIconFile(i_result);
        setFormData({ ...formData, icon: URL.createObjectURL(i_result)});
        setIsIconChanged(true);
        break;
        
      case "banner_image":
        const b_result = getFile(event.target as HTMLInputElement);
        if (!b_result) return;
        setBannerFile(b_result);
        setFormData({ ...formData, banner: URL.createObjectURL(b_result)});
        setIsBannerChanged(true);
        break;

      default:
        setFormData({ ...formData, [event.target.name]: event.target.value });
        break;
    }

    switch (event.target.name) {
      case "biography":
        setBioValue(event.target.value);
        break;
    }
  };

  const handlePMSubmit = (data: string[]) => {
    setFormData({ ...formData, payment_methods: data });
  };
  const handleDMSubmit = (data: string[]) => {
    setFormData({ ...formData, delivery_methods: data });
  };

  // SubmitListener
  const handleSubmit = async (event: React.FormEvent) => {

    event.preventDefault();

    let iconURL = user.icon;
    let bannerURL = user.banner;

    if (isIconChanged) {
      let icon = await PushImages([iconFile!], user.uuid);
      iconURL = icon?.map((str) => str.replace(/[\n\s]/g, ''))[0];
    }

    if (isBannerChanged) {
      let banner = await PushImages([bannerFile!], user.uuid);
      bannerURL = banner?.map((str) => str.replace(/[\n\s]/g, ''))[0];
    }
    
    const partial = new UserClass(formData);
    const newUser : any = {
      ...partial,
      icon: iconURL,
      banner: bannerURL
    }

    const { email_address, phone_number, ...userData } = newUser;
    const { data, error } = await supabase
      .from('profiles')
      .update({...userData})
      .match({ uuid: user.uuid });

    if (error) throw error;
    
    setUser(new UserClass({
      ...newUser
    }));
    
    setPosts(posts.map((post) => {
      if (post.author.uuid === user.uuid) {
        return new PostClass({
          ...post,
          author: newUser
        });
      } else {
        return post;
      }
    }));

    DeletePhotos([oldUserIcon, oldUserBanner])

    onClose();
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
      className="text-gray-800 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-[60]">

      <div className="bg-white rounded-sm w-[24rem] flex flex-col gap-[-12rem] z-[40] relative" ref={modalRef}>

        <input type="file" id="banner" onChange={handleInputChange} className="hidden w-12 h-12" accept="image/*" name="banner_image"/>
        <label htmlFor="banner" className="cursor-pointer flex items-center w-full h-44 z-[2]">
          <img className="w-full rounded-sm h-44 object-cover z-[-1]" src={formData.banner} alt="" width={1000} height={1000} />
          <span className="absolute text-[0.625rem] text-gray-200 font-light opacity-0 hover:opacity-100 transition-all duration-200 z-[1] w-full h-44 hover:bg-black hover:bg-opacity-50 flex items-center justify-center cursor-pointer ">Change banner</span>
        </label>

        <div className="absolute z-[2] bg-[url('/root/profile_dent.svg')] bg-contain w-full h-[6rem] rounded-sm top-[8rem] bg-no-repeat" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-[-2rem] flex flex-col gap-4 z-[3]">

          {/* Account */}
        <div className="z-[1] flex flex-col gap-2 pb-4 px-4">

          {/* Profile */}
          <div className="flex flex-row items-center gap-2 w-full px-5 pb-2">

            {/* Author Avatar */}
            <div>
              <input type="file" id="icon_files" onChange={handleInputChange} className="hidden w-12 h-12" accept="image/*" name="icon_image"/>
              <label htmlFor="icon_files" className="cursor-pointer flex items-center w-12 h-12">
                <img className="rounded-full w-12 h-12 object-cover" src={formData.icon} alt="User Icon" width={48} height={48} />
                <span className="absolute text-[0.625rem] text-gray-200 font-light opacity-0 hover:opacity-100 transition-all duration-200 z-[1] w-12 h-12 rounded-full hover:bg-black hover:bg-opacity-50 flex items-center justify-center cursor-pointer ">New</span>
              </label>
            </div>

            <div className="flex flex-col justify-center w-full">

              <div className="flex flex-row gap-2 w-full">

              {/* Author Name */}
              <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} className="text-gray-800 font-normal text-lg leading-3 tracking-tight focus:border-b-[1px] cursor-pointer overflow-y-hidden w-full" placeholder="First Name"/>

              {/* Author Name */}
              <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} className="text-gray-800 font-normal text-lg leading-3 tracking-tight focus:border-b-[1px] cursor-pointer overflow-y-hidden w-full" placeholder="Last Name"/>

              </div>

              {/* Author Handle */}
              <h6 className="text-gray-500 font-light text-sm leading-4">{`@${formData.handle}`}</h6>

            </div>
          </div>

          {/* Biography */}
          <textarea name="biography" value={formData.biography} onChange={handleInputChange} ref={textBioAreaRef} className="text-gray-800 font-light text-xs leading-4 focus:border-b-[1px] focus:outline-none resize-none cursor-pointer overflow-y-hidden" placeholder="Biography" rows={1} maxLength={256}/>

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