import { X } from 'lucide-react';
import { useState, useRef } from 'react';

import AutosizeTextarea from '@/src/app/components/AutosizeTextarea';

interface PostCreateProps {
  onClose: () => void;
  onAddPost: (post: any) => void;
}

const PostCreate: React.FC<PostCreateProps> = ({ onClose, onAddPost }) => {
  const [shop_icon, setShopIcon] = useState('');
  const [shop_name, setShopName] = useState('');
  const [shop_handle, setShopHandle] = useState('');
  const [user_icon, setUserIcon] = useState('');
  const [user_name, setUserName] = useState('');
  const [user_handle, setUserHandle] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [price, setPrice] = useState<number>();
  const [negotiable, setNegotiable] = useState(false);
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [shares, setShares] = useState(0);
  const [interested, setInterested] = useState(0);
  const [comments, setComments] = useState(0);

  let user_temp = "Thomas Welch";
  let user_handle_temp = "thmwlch";

  let shops = [
    {id: 1, name: "Hector's Boutique", handle: "hctrbtq"},
    {id: 2, name: "Shopaholla", handle: "hola_shopaholla"},
    {id: 3, name: "Inside Fluctuation", handle: "influct"}
  ];

  let conditions = [
    "New", "Used", "Refurbished"
  ]

  const handleShopNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedShop = shops.find((shop) => shop.name === e.target.value) || {name: "", handle: ""};
    setShopName(selectedShop.name);
    setShopHandle(`@${selectedShop.handle}`);

    setUserIcon("/avatars/temp.jpg");
    setShopIcon("/avatars/temp.jpg");
    setUserName(user_temp);
    setUserHandle(`@${user_handle_temp}`);

    setTimestamp(new Date(Date.now()).toLocaleString().split(',')[0]);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(e.target.value));
  };
  const handleNegotiableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNegotiable(e.target.checked);
  };
  const handleHeaderChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHeader(e.target.value);
    setHeaderValue(e.target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setDescValue(e.target.value); 
  };
  const handleConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCondition(e.target.value);
  };
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value.split(','));
  };
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages((e.target.value === "") ? [] : e.target.value.split(','));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = { shop_icon, shop_name, shop_handle, user_icon, user_name, user_handle, timestamp, price, negotiable, header, description, condition, tags, images, upvotes, downvotes, shares, interested, comments };
    onAddPost(newPost);
    onClose();
  };

  const [headerValue, setHeaderValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const textHeadAreaRef = useRef<HTMLTextAreaElement>(null);
  const textDescAreaRef = useRef<HTMLTextAreaElement>(null);

  AutosizeTextarea(textHeadAreaRef.current, headerValue);
  AutosizeTextarea(textDescAreaRef.current, descValue);

  return (
    <main className="text-gray-800 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
        <div className="bg-white rounded p-6 w-96 flex flex-col gap-2 z-[50]">
          <div className="flex flex-row items-center justify-between">
            <h6 className="text-gray-800 font-regular text-xs">@arkustore</h6>
            <X className="opacity-70 cursor-pointer" color="black" size={14} strokeWidth={3} onClick={onClose}/>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input type="number" value={price} onChange={handlePriceChange} placeholder="$100.00" className="w-full text-3xl font-regular" required />
              <textarea value={header} onChange={handleHeaderChange} placeholder="Title" className="w-full text-xl font-regular leading-5 h-[1.3rem] resize-none" ref={textHeadAreaRef} rows={1} required />
              <textarea value={description} onChange={handleDescriptionChange} placeholder="Write your text here." className="w-full text-sm min-h-[4rem] leading-4 font-light resize-none" ref={textDescAreaRef} rows={1} required />
              <select value={shop_name} className="-full text-gray-800 text-xs px-2 py-[0.4rem] bg-gray-100 rounded-sm font-regular" onChange={handleShopNameChange} required>
                <option className="w-full text-gray-500 text-sm px-2 py-1 bg-gray-100 rounded-sm" value="" disabled selected>Choose Shop</option>
                {shops.map((shop, index) => (
                  <option className="w-full text-gray-500 text-sm px-2 py-1 bg-gray-100 rounded-sm" key={index} value={shop.name}>
                    {shop.name}
                  </option>
                ))}
              </select>
              <div className="flex flex-row gap-2">
                <select value={condition} className="w-full text-gray-800 text-xs px-2 py-[0.4rem] bg-gray-100 rounded-sm font-regular" onChange={handleConditionChange} required>
                  <option className="w-full text-gray-500 text-sm bg-gray-100 rounded-sm" value="" disabled selected>Choose Condtion</option>
                  {conditions.map((condition, index) => (
                    <option className="w-full text-gray-500 text-sm bg-gray-100 rounded-sm" key={index} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
                <div className="flex flex-row items-center bg-gray-100 rounded-sm px-3 py-[0.4rem]">
                  <input type="checkbox" value={negotiable ? 1 : 0} onChange={handleNegotiableChange} className="rounded px-2 w-full" />
                  <h6 className="text-gray-800 text-xs font-regular leading-4 pl-2">Negotiable?</h6>
                </div>
              </div>
              <input type="text" value={tags} onChange={handleTagsChange} className="w-full text-gray-800 text-xs px-2 py-[0.4rem] bg-gray-100 rounded-sm" placeholder="Write your tags here, separated by spaces." />
              <div className="flex justify-end pt-4">
                <button type="button" className="text-xs px-4 py-1.5 text-gray-500" onClick={onClose}>Cancel</button>
                <button type="submit" className="text-xs px-3 py-1.5 bg-slate-900 text-violet-300 rounded-full">Create Post</button>
              </div>
          </form>
        </div>
    </main>
  );
};

export default PostCreate;