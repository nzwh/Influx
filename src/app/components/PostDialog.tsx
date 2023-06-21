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
  const [negotiable, setNegotiable] = useState('');
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

  const handleShopIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShopIcon(e.target.value);
  };
  const handleShopNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShopName(e.target.value);
  };
  const handleShopHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShopHandle(e.target.value);
  };
  const handleUserIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserIcon(e.target.value);
  };
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const handleUserHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserHandle(e.target.value);
  };
  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimestamp(e.target.value);
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value));
  };
  const handleNegotiableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNegotiable(e.target.value);
  };
  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeader(e.target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCondition(e.target.value);
  };
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value.split(','));
  };
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.value.split(','));
  };
  const handleUpvotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpvotes(parseInt(e.target.value));
  };
  const handleDownvotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDownvotes(parseInt(e.target.value));
  };
  const handleSharesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShares(parseInt(e.target.value));
  };
  const handleInterestedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterested(parseInt(e.target.value));
  };
  const handleCommentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComments(parseInt(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = { shop_icon, shop_name, shop_handle, user_icon, user_name, user_handle, timestamp, price, negotiable, header, description, condition, tags, images, upvotes, downvotes, shares, interested, comments };
    onAddPost(newPost);
    onClose();
  };

  return (

    <div className="text-gray-950 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white rounded p-6 w-96">
        <h2 className="text-2xl font-semibold mb-4">Create Post</h2>
        <form onSubmit={handleSubmit}>
            
            <input type="text" value={shop_icon} onChange={handleShopIconChange} className="border rounded px-2 py-1 w-full" required />
            <input type="text" value={shop_name} onChange={handleShopNameChange} className="border rounded px-2 py-1 w-full" required />
            <input type="text" value={shop_handle} onChange={handleShopHandleChange} className="border rounded px-2 py-1 w-full" required />
            <input type="text" value={user_icon} onChange={handleUserIconChange} className="border rounded px-2 py-1 w-full" required />
            <input type="text" value={user_name} onChange={handleUserNameChange} className="border rounded px-2 py-1 w-full" required />
            <input type="text" value={user_handle} onChange={handleUserHandleChange} className="border rounded px-2 py-1 w-full" required />
            <input type="text" value={timestamp} onChange={handleTimestampChange} className="border rounded px-2 py-1 w-full" required />
            <input type="number" value={price} onChange={handlePriceChange} className="border rounded px-2 py-1 w-full" required />
            <input type="checkbox" value={negotiable} onChange={handleNegotiableChange} className="border rounded px-2 py-1 w-full" required />
            <input type="text" value={header} onChange={handleHeaderChange} className="border rounded px-2 py-1 w-full" required />
            <input type="text" value={description} onChange={handleDescriptionChange} className="border rounded px-2 py-1 w-full" required />
            <input type="text" value={condition} onChange={handleConditionChange} className="border rounded px-2 py-1 w-full" required />
            <input type="text" value={tags} onChange={handleTagsChange} className="border rounded px-2 py-1 w-full" required />
            <input type="text" value={images} onChange={handleImagesChange} className="border rounded px-2 py-1 w-full" required />
            <input type="number" value={upvotes} onChange={handleUpvotesChange} className="border rounded px-2 py-1 w-full" required />
            <input type="number" value={downvotes} onChange={handleDownvotesChange} className="border rounded px-2 py-1 w-full" required />
            <input type="number" value={shares} onChange={handleSharesChange} className="border rounded px-2 py-1 w-full" required />
            <input type="number" value={interested} onChange={handleInterestedChange} className="border rounded px-2 py-1 w-full" required />
            <input type="number" value={comments} onChange={handleCommentsChange} className="border rounded px-2 py-1 w-full" required />

          <div className="flex justify-end">
            <button type="button" className="px-4 py-2 mr-2 text-gray-600" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PostDialog;