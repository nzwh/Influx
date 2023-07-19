import React, { useState, useRef, useEffect } from 'react';

import AutosizeTextarea from '@/src/app/backend/components/utilities/AutosizeTextarea';
import { Post as PostInterface, Community as CommunityInterface } from '@/libraries/structures';

import { X } from 'lucide-react';

import supabase from '@/src/app/backend/supabase';

interface Props {
  onClose: () => void;
  onSubmit: (post: any) => void;
}

const CreatePostPopup: React.FC<Props> = ({ onClose, onSubmit }) => {

  const user = require('@/json/active.json');

  const [formData, setFormData] = useState<PostInterface>({
    id: 0,
    origin: {
      uuid: '',
      name: '',
      handle: '',
      description: '',
      icon: '',
      banner: '',
      posts: [],
      users: []
    },
    author: {
      id: 0,
      uuid: '',
      handle: '',
      email_address: '',
      icon: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      location: '',
      biography: '',
      payment_methods: [],
      delivery_methods: [],
      is_verified:false
    },

    type: '',
    posted_at: new Date(),
    price: 0,

    title: '',
    description: '',
    condition: '',
    tags: [],
    media: [],

    is_edited: false,
    edited_at: new Date,

    upvotes: [],
    downvotes: [],
    shares: 0,
    interests: [],
    comments: [],

    is_open: false,
    range: {
      start: 0,
      end: 0
    }
  });
  
  // Default values
  let conditions = require('@/json/conditions.json');
  const [communities, setCommunities] = useState<CommunityInterface[]>([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        console.log('Fetching communities...');
        const { data, error } = await supabase.from('communities').select('*');
  
        if (error) {
          throw error;
        }
  
        setCommunities(data);
        console.log(data.length > 0 ? `Fetched ${data.length} communities.` : `'Nocommunities found.'`)
      } catch (error) {
        console.log('Error fetching communities:', error);
      }
    };
  
    fetchCommunities();
  }, []);

  // InputListener
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (event.target.name == "title") {
      setTitleValue(event.target.value);
    } else if (event.target.name == "description") {
      setDescValue(event.target.value);
    }
    if (event.target.name == "tags") {
      setFormData({ ...formData, [event.target.name]: event.target.value.split(',') });
    }
  };

  // CommunitySelectListener
  const handleCommunitySelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = communities.find((com : CommunityInterface) => com.name === event.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      origin: {
        uuid: selected?.uuid || '',
        name: selected?.name || '',
        handle: selected?.handle || '',
        description: selected?.description || '',
        icon: selected?.icon || '',
        banner: selected?.banner || '',
        posts: selected?.posts || [],
        users: selected?.users || [],
      },
    }));
  };

  // SubmitListener
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(user);
    e.preventDefault();
    setFormData({ ...formData, 
      id: 0,  // auto
      posted_at: new Date(Date.now()), 
      edited_at: new Date() 
    });

    onSubmit(formData);
    onClose();
  };

  // Autosizing
  const [titleValue, setTitleValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const textTitleAreaRef = useRef<HTMLTextAreaElement>(null);
  const textDescAreaRef = useRef<HTMLTextAreaElement>(null);
  AutosizeTextarea(textTitleAreaRef.current, titleValue);
  AutosizeTextarea(textDescAreaRef.current, descValue);

  return (
    <main className="text-gray-800 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-sm p-6 w-96 flex flex-col gap-2 z-[50]">

        {/* Header */}
        <div className="flex flex-row items-center justify-between">
          <h6 className="text-gray-800 font-regular text-xs">{user.handle}</h6>
          <X className="opacity-70 cursor-pointer" color="black" size={14} strokeWidth={3} onClick={onClose}/>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">

          {/* Price */}
          <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full text-3xl font-regular" required />

          {/* Title */}
          <textarea name="title" value={formData.title} onChange={handleInputChange} 
            placeholder="Title" className="w-full text-xl font-regular leading-5 h-[1.3rem] resize-none" ref={textTitleAreaRef} rows={1} required />

          {/* Description */}
          <textarea name="description" value={formData.description} onChange={handleInputChange} 
            placeholder="Write your text here." className="w-full text-sm min-h-[4rem] leading-4 font-light resize-none" ref={textDescAreaRef} rows={1} required />

          {/* Community */}
          <select name="name" value={formData.origin.name} className="-full text-gray-800 text-xs px-2 py-[0.4rem] bg-gray-100 rounded-sm font-regular" onChange={handleCommunitySelectChange} required>
            <option className="w-full text-gray-500 text-sm px-2 py-1 bg-gray-100 rounded-sm" value="" disabled selected>Choose Community</option>
            {communities.map((com: CommunityInterface, index: React.Key | null | undefined) => (
              <option className="w-full text-gray-500 text-sm px-2 py-1 bg-gray-100 rounded-sm" key={com.uuid} value={com.name}>
                {com.name}
              </option>
            ))}
          </select>
          
          {/* Condition & Open */}
          <div className="flex flex-row gap-2">
            
            {/* Condition */}
            <select name="condition" value={formData.condition} className="w-full text-gray-800 text-xs px-2 py-[0.4rem] bg-gray-100 rounded-sm font-regular" onChange={handleInputChange} required>
              <option className="w-full text-gray-500 text-sm bg-gray-100 rounded-sm" value="" disabled selected>Choose Condtion</option>
              {conditions.map((condition: string, index: React.Key | null | undefined) => (
                <option className="w-full text-gray-500 text-sm bg-gray-100 rounded-sm" key={index} value={condition}>
                  {condition}
                </option>
              ))}
            </select>

            {/* Open */}
            <div className="flex flex-row items-center bg-gray-100 rounded-sm px-3 py-[0.4rem]">
              <input type="checkbox" value={formData.open ? 1 : 0} onChange={handleInputChange} className="rounded px-2 w-full" />
              <h6 className="text-gray-800 text-xs font-regular leading-4 pl-2">Negotiable?</h6>
            </div>

          </div>

          {/* Tags */}
          <input type="text" name={"tags"} value={formData.tags} onChange={handleInputChange} className="w-full text-gray-800 text-xs px-2 py-[0.4rem] bg-gray-100 rounded-sm" placeholder="Write your tags here, separated by spaces." />

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button type="button" className="text-xs px-4 py-1.5 text-gray-500" onClick={onClose}>Cancel</button>
            <button type="submit" className="text-xs px-3 py-1.5 bg-slate-900 text-violet-300 rounded-full">Create Post</button>
          </div>

        </form>
      </div>
    </main>
  );
};

export default CreatePostPopup;