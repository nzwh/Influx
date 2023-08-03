"use client"

import React, { useState } from "react";

// Hooks & Classes
import Supabase from '@/src/app/backend/model/supabase';
import { useGlobalContext } from "@/src/app/backend/hooks/GlobalContext";
import { PostClass } from "@/libraries/structures";

// Icons
import { ShoppingBag } from 'lucide-react';

interface Props {
  post: PostClass;
}

const ToggleCart: React.FC<Props> = ({ post }) => {

  const savePostCart = async () => {
    const { data, error } = await Supabase
      .from('posts')
      .update({ cart: post.cart })
      .eq('id', post.id);

    if (error) throw error;
  };

  const saveUserCart = async () => {
    const { data, error } = await Supabase
      .from('profiles')
      .update({ cart: user.cart })
      .eq('uuid', user.uuid);

    if (error) throw error;
  };

  const { user, setUser } = useGlobalContext();

  const [carted, setCarted] = useState(post.cart?.includes(user.uuid));
  
  const handleBookmarkToggle = () => {
    if (!carted) {
      post.cart?.push(user.uuid);
      user.cart?.push(post.id);
      savePostCart();
      saveUserCart();
      setCarted(true);
    }
    else {
      post.cart?.splice(post.cart?.indexOf(user.uuid), 1);
      user.cart?.splice(user.cart?.indexOf(post.id), 1);
      savePostCart();
      saveUserCart();
      setCarted(false);
    }
  };

  return (
    <div className={`flex flex-row gap-1 items-center cursor-pointer hover:bg-gray-200 transition-colors duration-200 px-2 py-1 rounded-sm ${carted ? "bg-violet-100":""}`} onClick={handleBookmarkToggle}>
  
      { carted ? (<>
        <ShoppingBag className="text-gray-800" size={12} strokeWidth={3} /> 
        <h6 className="text-gray-800 font-normal text-xs">
          {post.cart?.length || 0} interested
        </h6>
      </>) : (<>
        <ShoppingBag className="opacity-70" color="black" size={12} strokeWidth={3} /> 
        <h6 className="text-gray-800 font-normal text-xs">
        {post.cart?.length || 0} {post.cart?.length === 1 ? 'interested' : 'interested'}
        </h6>
      </>)}
      
    </div>
  );
}

export default ToggleCart;