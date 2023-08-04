"use client"

import React, { useState } from "react";

// Hooks & Classes
import Supabase from '@/src/app/backend/model/supabase';
import { useGlobalContext } from "@/src/app/backend/hooks/GlobalContext";
import { PostClass } from "@/libraries/structures";

// Icons
import { ShoppingBag } from 'lucide-react';

interface Props {
  name: string;
  value?: boolean
  post: PostClass;
}

const ToggleCart: React.FC<Props> = ({ name, value, post }) => {

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
  
  const handleCartedToggle = () => {
    if (!carted) {
      post.cart?.push(user.uuid);
      user.cart?.push(post.id);
      savePostCart();
      saveUserCart();
      setUser(user);
      setCarted(true);
    }
    else {
      post.cart?.splice(post.cart?.indexOf(user.uuid), 1);
      user.cart?.splice(user.cart?.indexOf(post.id), 1);
      savePostCart();
      saveUserCart();
      setUser(user);
      setCarted(false);
    }
  };

  return (
    <div className={`flex flex-row gap-1 items-center cursor-pointer transition-colors duration-200 px-1.5 py-1 rounded-sm h-6 ${carted ? "bg-slate-800 hover:bg-violet-300" : "hover:bg-gray-200 "}`} onClick={handleCartedToggle}>
  
      { carted ? (<>
        <ShoppingBag className="text-white" size={12} strokeWidth={3} /> 
        <h6 className="text-white font-extralight text-xs">
          {value ? (post.cart?.length || 0) : ""} {name}
        </h6>
      </>) : (<>
        <ShoppingBag className="text-gray-800" size={12} strokeWidth={3} /> 
        <h6 className="text-gray-800 font-normal text-xs">
          {value ? (post.cart?.length || 0) : ""} {name}
        </h6>
      </>)}
      
    </div>
  );
}

export default ToggleCart;