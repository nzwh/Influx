import Image from "next/image";

interface PostProps {
    shop_icon: string;
    shop_name: string;
    shop_handle: string;

    user_icon: string;
    user_name: string;
    user_handle: string;

    timestamp: string;

    price: number;
    negotiable: boolean;

    header: string;
    description: string;
    condition: string;

    tags: string[];
    images: string[];

    upvotes: number;
    downvotes: number;
    shares: number;
    interested: number;
    comments: number;
}

const Post: React.FC<PostProps> = ({ shop_icon, shop_name, shop_handle, user_icon, user_name, user_handle, timestamp, price, negotiable, header, description, condition, tags, images, upvotes, downvotes, shares, interested, comments }) => {
    return (
        
        <section className="w-full flex flex-col bg-white rounded-lg p-4 gap-4">
        <div className="flex flex-row justify-between">

            <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
                <Image className="rounded-full" src={shop_icon} alt="Shop Icon" width={16} height={16} />
                <h6 className="text-gray-950 font-extrabold text-xs tracking-tighter">{shop_name}</h6>
                <h6 className="text-gray-500 font-bold text-xs tracking-tighter">{shop_handle}</h6>
            </div>
            <div className="flex flex-row items-center gap-2">
                <Image className="rounded-full" src={user_icon} alt="User Icon" width={40} height={40} />
                <div className="flex flex-col justify-center">
                <h6 className="text-gray-950 font-bold text-lg tracking-tighter leading-4">{user_name}</h6>
                <h6 className="text-gray-500 font-bold text-xs tracking-tighter leading-4">{timestamp}&ensp;•&ensp;{user_handle}</h6>
                </div>
            </div>
            </div>

            <div className="flex flex-row items-start mt-1 mr-1">
            <div className="flex flex-row items-center gap-4">
                <div className=" bg-slate-700 rounded-full px-2 py-0.5">
                <h6 className="text-white font-bold text-[0.5rem]">{negotiable ? "NEGOTIABLE" : "FIXED"}</h6>
                </div>
                <h1 className="text-gray-950 font-bold text-xl tracking-tighter leading-4">${price}</h1>
                <Image src="/icons/b-more-h.svg" alt="More Button" width={14} height={14} />  
            </div>
            </div>
        </div>

        <div className="flex flex-col gap-2">
        <h1 className="text-gray-950 font-bold text-xl tracking-tighter leading-6">
            {header}
            <span className="text-white font-medium text-xs bg-slate-600 rounded-xl px-2 py-0.5 tracking-normal relative top-[-0.2rem] ml-2">{condition}</span>
        </h1>
        <p className="text-gray-800 font-medium text-md tracking-tighter leading-5">
            {description}
        </p>
        </div>

        <div className="flex flex-row gap-2 items-center">
            <h6 className="text-gray-950 font-bold text-sm tracking-tighter leading-4">Tags:</h6> 
            {tags.map((tag) => (
                <span className="text-white font-medium text-xs bg-slate-950 rounded-xl px-2 py-0.5 tracking-normal">#{tag}</span>
            ))}
        </div>

        <Image className="w-full h-full rounded-lg" src={images[0]} alt="Media Logo" width={0} height={0} sizes="100vw" />
        <div className="flex flex-row justify-between">

            <div className="flex flex-row items-center gap-4">
            <div className="flex flex-row gap-1">
                <Image src="/icons/b-arrup.svg" alt="Upvote Button" width={14} height={14} />  
                <h6 className="text-gray-950 font-extrabold text-xs tracking-tighter leading-4">{upvotes - downvotes}</h6>
                <Image src="/icons/b-arrdw.svg" alt="Upvote Button" width={14} height={14} /> 
                <h6 className="text-gray-950 font-extrabold text-xs tracking-tighter leading-4">upvotes</h6>  
            </div>

            <div className="flex flex-row gap-1">
                <Image src="/icons/b-share.svg" alt="Upvote Button" width={14} height={14} />  
                <h6 className="text-gray-950 font-extrabold text-xs tracking-tighter leading-4">{shares} shares</h6>
            </div>

            <div className="flex flex-row gap-1">
                <Image src="/icons/b-cart.svg" alt="Upvote Button" width={14} height={14} />  
                <h6 className="text-gray-950 font-extrabold text-xs tracking-tighter leading-4">{interested} interested</h6>
            </div>

            <Image src="/icons/b-more-h.svg" alt="Upvote Button" width={14} height={14} />  
            </div>

            <div className="flex flex-row gap-1">
                <Image src="/icons/b-msgcrc.svg" alt="Upvote Button" width={14} height={14} />  
                <h6 className="text-gray-950 font-extrabold text-xs tracking-tighter leading-4">{comments} comments</h6>
            </div>
        </div>
    </section>
    );
};
  
export default Post;