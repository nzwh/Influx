import { useState } from 'react';

interface PostDialogProps {
  onClose: () => void;
  onAddPost: (post: any) => void;
}

const PostDialog: React.FC<PostDialogProps> = ({ onClose, onAddPost }) => {
  
  const [shop_icon, setShopIcon] = useState('');
  const [shop_name, setShopName] = useState('');
  const [shop_handle, setShopHandle] = useState('');
  const [user_icon, setUserIcon] = useState('');
  const [user_name, setUserName] = useState('');
  const [user_handle, setUserHandle] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [price, setPrice] = useState(0);
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
    const selectedShopName = e.target.value;
    const selectedShop = shops.find((shop) => shop.name === selectedShopName);
    
    if (selectedShop) {
      setShopName(selectedShop.name);
      setShopHandle(`@${selectedShop.handle}`);
    } else {
      setShopName("");
      setShopHandle("");
    }

    setUserIcon("/avatars/temp.jpg");
    setShopIcon("/avatars/temp.jpg");

    setUserName(user_temp);
    setUserHandle(`@${user_handle_temp}`);

    setTimestamp(new Date(Date.now()).toLocaleString().split(',')[0]);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value));
  };
  const handleNegotiableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNegotiable(e.target.checked);
  };
  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeader(e.target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  const handleConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCondition(e.target.value);
  };
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value.split(','));
  };
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.value === "") {
      setImages([]);
      return;
    } else {
      setImages(e.target.value.split(','));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPost = { shop_icon, shop_name, shop_handle, user_icon, user_name, user_handle, timestamp, price, negotiable, header, description, condition, tags, images, upvotes, downvotes, shares, interested, comments };
    onAddPost(newPost);
    onClose();
  };

  return (

    <main className="text-gray-950 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white rounded p-6 w-96">
        <h2 className="text-2xl font-semibold mb-4">Create Post</h2>
        <form onSubmit={handleSubmit}>

            <select value={shop_name} className="border rounded px-2 py-1 w-full" onChange={handleShopNameChange} required>
              <option value="" disabled selected>Select Shop</option>
              {shops.map((shop, index) => (
                <option key={index} value={shop.name}>
                  {shop.name}
                </option>
              ))}
            </select>

            <input type="number" value={price} onChange={handlePriceChange} className="border rounded px-2 py-1 w-full" required />
            <input type="checkbox" value={negotiable ? 1 : 0} onChange={handleNegotiableChange} className="border rounded px-2 py-1 w-full" />
            <input type="text" value={header} onChange={handleHeaderChange} className="border rounded px-2 py-1 w-full" required />
            <textarea value={description} onChange={handleDescriptionChange} className="border rounded px-2 py-1 w-full" required />

            <select value={condition} className="border rounded px-2 py-1 w-full" onChange={handleConditionChange} required>
              <option value="" disabled selected>Condition</option>
              {conditions.map((con, index) => (
                <option key={index} value={con}>
                  {con}
                </option>
              ))}
            </select>

            <input type="text" value={tags} onChange={handleTagsChange} className="border rounded px-2 py-1 w-full" />
            <input type="text" value={images} onChange={handleImagesChange} className="border rounded px-2 py-1 w-full" />

          <div className="flex justify-end">
            <button type="button" className="px-4 py-2 mr-2 text-gray-600" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
          </div>

        </form>
      </div>
    </main>
  );
};

export default PostDialog;