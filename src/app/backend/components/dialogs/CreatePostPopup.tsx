import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// Hooks & Classes
import { PostClass, CommunityClass } from '@/libraries/structures';
import usePostActions from '@/src/app/backend/hooks/PostActions';
import useFetchCommunities from '@/src/app/backend/hooks/FetchCommunities';
import PushImages from '@/src/app/backend/hooks/PushImages';
import { useGlobalContext } from '@/src/app/backend/hooks/GlobalContext';

// Utilities
import AutosizeTextarea from '@/src/app/backend/components/utilities/AutosizeTextarea';
import OutsideClick from '@/src/app/backend/hooks/OutsideClick';
import { ToTitleCase } from '@/src/app/backend/hooks/ToConvert'

// Icons
import { ChevronDown, Globe, ImagePlus, RefreshCw, Sparkles, X } from 'lucide-react';

interface Props {
  type: number;
  onClose: () => void;
}

const CreatePostPopup: React.FC<Props> = ({ type, onClose }) => {

  // Export posts from global context
  const { user, setPosts } = useGlobalContext();
  // Export default form data
  const defaults = require("@/json/defaults.json");

  // Post actions
  const { AddItem } = usePostActions();

  // Allow outside click to close modal
  const modalRef = useRef<HTMLDivElement | null>(null);
  OutsideClick(modalRef, onClose);

  // Export communities from the database
  const [communities, setCommunities] = useState<CommunityClass[]>([]);
  useFetchCommunities({ type: 'all', communities, setCommunities });

  // Initialize form data
  const [formData, setFormData] = useState<PostClass>(new PostClass({
    type: defaults.mapping[type],
  }));

  // Ease of access states
  const [titleCount, setTitleCount] = useState(0);

  // TODO: Turn this into a component
  const tagInputRef = useRef<HTMLInputElement>(null);
  const [tagInput, setTagInput] = useState<string>("");
  const handleTagInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " " || event.key === "Enter") {
      handleAddTag();
    }
  };
  const handleAddTag = () => {
    if (formData.tags?.length === 20) {
      alert("You can only add up to 20 tags.");
      return;
    }

    const trimmedTag = tagInput.trim().replace(/\s+/g, "");
    if (trimmedTag !== "" && !formData.tags?.includes(trimmedTag)) {
      setFormData({ ...formData, tags: [...formData.tags!, trimmedTag] });
      setTagInput("");
    }

    setTimeout(() => {
      if (tagInputRef.current) {
        tagInputRef.current.focus();
      }
    }, 0);
  };
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags?.filter((tag) => tag !== tagToRemove) });
  };
  useEffect(() => {
    if (tagInputRef.current) {
      tagInputRef.current.style.width = "auto";
      tagInputRef.current.style.width = `${tagInputRef.current.scrollWidth}px`;
    }
  }, [tagInput]);

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const handleImageRemove = (image: File) => {
    setSelectedImages(selectedImages.filter((img) => img !== image));
  };

  // Listens to all input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

    switch (event.target.name) {

      case "tags":
        setTagInput(event.target.value.replace(/\s+/g, ""));
        break;

      case "type":
        setFormData({ ...formData, [event.target.name]: defaults.mapping[event.target.value] });
        break;

      case "origin":
        const selected = communities.find((com : CommunityClass) => com.name === event.target.value);

        setFormData((formData) => ({
          ...formData,
          origin: new CommunityClass(selected)
        }));
        break;

      case "media":
        const files = (event.target as HTMLInputElement).files;
        if (!files) return;
        
        const imageArray = Array.from(files);
        if (selectedImages.length + imageArray.length > 4) {
          alert("You can only upload up to 4 images.");
          return;
        }
        
        imageArray.forEach((file) => {
          if (file.size > 5 * 1024 * 1024) 
            alert("One or more images exceed the 5MB size limit.");
          else
            setSelectedImages((prevSelectedImages) => [...prevSelectedImages, file]);
        });        
        break;

      default:
        setFormData({ ...formData, [event.target.name]: event.target.value });
        break;
    }

    switch (event.target.name) {

      case "title":
        setTitleValue(event.target.value);
        setTitleCount(event.target.value.length);
        break;

      case "description":
        setDescValue(event.target.value);
        break;
    }
  };

  // Listens to submit actions
  const handleSubmit = async (event: React.FormEvent) => {

    event.preventDefault();
    let images = await PushImages(selectedImages, user.uuid);
    images = images?.map((str) => str.replace(/[\n\s]/g, ''));

    const partial = new PostClass(formData);
    const newPost : any = {
      ...partial,
      posted_at: new Date(),
      is_edited: false,
      media: images
    }

    const { id, uuid, origin, author, ...postData } = newPost
    postData.author_id = user.uuid;
    postData.origin_id = newPost.origin.uuid;

    AddItem(postData, user, formData.origin);
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
    <main  
      className="text-gray-800 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-sm p-6 w-96 flex flex-col gap-2 z-[40]" ref={modalRef}>

        {/* Header */}
        <div className="flex flex-row items-center justify-between">

          <Link href={"/profile"} className="text-gray-800 font-regular text-xs hover:text-violet-300 transition-colors duration-200 cursor-pointer">
            @{user.handle}
          </Link>

          <div className="flex flex-row items-center gap-3">
            <div className="bg-gray-100 rounded-full flex flex-row items-center gap-1 px-2.5 py-0.5 border border-gray-200">

              {/* TODO: Turn into a custom dropdown */}
              <select name="type" value={defaults.mapping[formData.type]} className="bg-gray-100 text-gray-800 text-[0.625rem] font-regular cursor-pointer appearance-none w-auto pl-1" onChange={handleInputChange} required>
                <option className="w-full text-gray-500 text-[0.625rem] font-light rounded-sm" value={1}>Article</option>
                <option className="w-full text-gray-500 text-[0.625rem] font-light rounded-sm" value={2}>Buying</option>
                <option className="w-full text-gray-500 text-[0.625rem] font-light rounded-sm" value={3}>Selling</option>
              </select>

              <ChevronDown className="text-gray-800" size={10} strokeWidth={3} />
            </div>
            <X className="cursor-pointer text-gray-800" size={14} strokeWidth={3} onClick={onClose}/>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Price */}
          { formData.type === "selling" ? (
          <div className="flex flex-row gap-0.5">
            <h6 className="text-gray-800 text-sm font-medium relative top-[0.1rem]">₱</h6>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full text-3xl font-regular" required />
          </div>
          ) : formData.type === "buying" ? (
          <div className="flex flex-row items-center">
          <div className="flex flex-row gap-0.5 w-full">
            <h6 className="text-gray-800 text-sm font-medium relative top-[0.1rem]">₱</h6>
            <input type="number" name="range_start" value={formData.range_start} onChange={handleInputChange} className="w-full text-3xl font-regular" required />
          </div>
          <h6 className="text-gray-800 text-[0.625rem] font-light px-6">to</h6>
          <div className="flex flex-row gap-0.5 w-full">
            <h6 className="text-gray-800 text-sm font-medium relative top-[0.1rem]">₱</h6>
            <input type="number" name="range_end" value={formData.range_end} onChange={handleInputChange} className="w-full text-3xl font-regular" required />
          </div>
          </div>
          ) : null}
          
          {/* Title */}
          <div className="flex flex-row gap-2 w-full items-center">
            <textarea name="title" value={formData.title} onChange={handleInputChange} 
              placeholder="Title" className="w-full text-xl font-normal leading-5 h-5 resize-none" ref={textTitleAreaRef} rows={1} required maxLength={100}/>
            <div className="flex flex-row justify-between bg-gray-100 h-fit px-2 py-0.5 rounded-full border border-gray-200">
              <h6 className="text-gray-800 text-[0.5rem] font-regular">{titleCount}/100</h6>
            </div>
          </div>
          
          {/* Description */}
          {/* TODO: Add support for markdown */}
          <textarea name="description" value={formData.description} onChange={handleInputChange} 
            placeholder="Write your text here." className="w-full text-sm min-h-[4rem] leading-4 font-extralight resize-none" ref={textDescAreaRef} rows={1} required maxLength={255}/>

          {/* Community */}
          <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-800 text-xs font-regular">Post listing in</label>
          <div className="flex flex-row w-full items-center bg-gray-100 rounded-sm px-3 py-2 hover:bg-gray-200 transition-colors duration-200 border border-gray-200">
            <Globe className="text-gray-800" size={14} strokeWidth={3} />
            <select name="origin" value={formData.origin.name} className="w-full text-gray-800 text-xs font-regular bg-transparent px-2 appearance-none cursor-pointer" onChange={handleInputChange} required>
              <option className="w-full text-gray-500 text-sm font-light bg-gray-100" value="" disabled selected>Select a community</option>
              {communities.map((com: CommunityClass, index: React.Key | null | undefined) => (
                <option className="w-full text-gray-500 text-sm font-light bg-gray-100" key={com.uuid} value={com.name}>
                  {com.name}
                </option>
              ))}
            </select>
            <ChevronDown className="text-gray-800" size={14} strokeWidth={3} />
          </div>
          </div>

          {/* Condition */}
          { formData.type === "selling" ? (
          <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-800 text-xs font-regular">Listing Condition</label>
          <div className="flex flex-row w-full items-center bg-gray-100 rounded-sm px-3 py-2 hover:bg-gray-200 transition-colors duration-200 border border-gray-200">
            <Sparkles className="text-gray-800" size={14} strokeWidth={3} />
            <select name="condition" value={formData.condition} className="w-full text-gray-800 text-xs font-regular bg-transparent px-2 appearance-none cursor-pointer" onChange={handleInputChange} required>
              <option className="w-full text-gray-500 text-sm font-light bg-gray-100" value="" disabled selected>Select a condition</option>
              {defaults.conditions.map((condition: string, index: React.Key | null | undefined) => (
                <option className="w-full text-gray-500 text-sm font-light bg-gray-100" key={index} value={condition}>
                  {ToTitleCase(condition)}
                </option>
              ))}
            </select>
            <ChevronDown className="text-gray-800" size={14} strokeWidth={3} />
          </div>
          </div>
          ) : null }
          
          {/* Media */}
          <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-800 text-xs font-regular">Listing Media</label>
          <div className="flex flex-row gap-2">
            {selectedImages.map((image, index) => (
              <div key={index} className="w-[4.75rem] h-[4.75rem] relative overflow-hidden flex items-center" onClick={() => handleImageRemove(image)}>
                <span className="absolute text-[0.625rem] text-gray-200 font-light opacity-0 hover:opacity-100 transition-all duration-200 z-[1] w-[4.75rem] h-[4.75rem] hover:bg-black hover:bg-opacity-50 flex items-center justify-center cursor-pointer ">Delete</span>
                <img src={URL.createObjectURL(image)} alt={`Image ${index}`} className="rounded-sm duration-200 z-[0] w-full h-full object-cover" />
              </div>
            ))}
            {selectedImages.length <= 3 ? (
              <div>
                <input type="file" id="files" multiple onChange={handleInputChange} className="hidden" accept="image/*" name="media"/>
                <label htmlFor="files" id="lable_file" className="w-[4.75rem] h-[4.75rem] bg-gray-100 rounded-sm flex flex-col gap-1 justify-center items-center cursor-pointer hover:bg-gray-200 transition-colors duration-200 border border-gray-200">
                  <ImagePlus className="text-gray-400" size={24} strokeWidth={1} />
                  <h6 className="text-gray-400 text-[0.625rem] font-light">Add Image</h6>
                </label>
              </div>
            ): null}
          </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-800 text-xs font-regular">Listing tags</label>
          <div className="flex flex-row flex-wrap gap-1">
            {formData.tags?.map((tag, index) => (
              <span key={index} onClick={() => handleRemoveTag(tag)} className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full cursor-pointer text-[0.625rem] font-light items-center justify-center flex flex-row gap-1 hover:bg-gray-200 transition-colors duration-200 border border-gray-200">{tag}
                <X className="text-gray-800" size={8} strokeWidth={3} />
              </span>
            ))}
            <input type="text" name="tags" ref={tagInputRef} value={tagInput} onChange={handleInputChange} onKeyDown={handleTagInputKeyPress} placeholder="Type something" className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-[0.625rem] font-light w-full border border-gray-200 hover:bg-gray-200 transition-colors duration-200" maxLength={50}/>
          </div>
          </div>
          
          {/* Open */}
          { formData.type === "selling" ? (
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-row items-center gap-2">
              <RefreshCw className="text-gray-800" size={14} strokeWidth={3} />
              <h6 className="text-gray-800 text-xs font-regular leading-4">Negotiable price</h6>
            </div>
            <input type="checkbox" value={formData.is_open ? 1 : 0} onChange={handleInputChange} className="rounded px-2" />
          </div>
          ) : null }

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button type="button" className="text-xs font-light px-4 py-1.5 text-gray-500" onClick={onClose}>Cancel</button>
            <button type="submit" className="text-xs font-light px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-violet-300 rounded-full transition-colors duration-200">Create Post</button>
          </div>

        </form>
      </div>
    </main>
  );
};

export default CreatePostPopup;