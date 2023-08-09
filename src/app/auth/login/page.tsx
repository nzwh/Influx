'use client' //* Uses interactable components

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';

// Hooks & Classes
import { UserInterface } from '@/libraries/structures';

// Icons
import { AtSign, ChevronRight, Italic, SquareAsterisk } from 'lucide-react';

// Model
import supabase from '@/src/app/backend/model/supabase';
import { AuthError } from '@supabase/supabase-js';

const Login: React.FC = () => {
  
  let router = useRouter();
  const [formData, setFormData] = useState<UserInterface>({
      id: 0,
      uuid: '',
      handle: '',
      email_address: '',
      icon: '',
      banner: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      location: '',
      biography: '',
      payment_methods: [],
      delivery_methods: [],
      is_verified:false,
  });
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState({ password: '' });

  const [errorEmailMessage, setErrorEmailMessage] = useState<string>(''); // Add error message state
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>(''); // Add error message state
  const [errorMessage, setErrorMessage] = useState<string>(''); // Add error message state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Add submission status state

  const [rememberMe, setRememberMe] = useState(false);

  const fetchIdNum = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
      if (error) {
        throw error;
      }
      console.log(data);
      if (data && data.length > 0) {
        const ids = data.map((user) => user.id);
        const highestId = Math.max(...ids); // Find the highest number in the IDs array
        return highestId + 1;
      } else {
        console.log('No user found');
        return [];
      }
    } catch (error) {
      console.log('Error fetching user:', error);
      return [];
    }
  }

  const fetchUUID = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('uuid')
      if (error) {
        throw error;
      }
      console.log(data);
      if (data && data.length > 0) {
        const uuids = data.map((user) => user.uuid);
        return uuids;
      } else {
        console.log('No user found');
        return [];
      }
    } catch (error) {
      console.log('Error fetching user:', error);
      return [];
    }
  }

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    console.log(event.target.name, event.target.value);
    
    // Check if the input name is "email_address" and if it contains "@" in the value
    if (event.target.value.includes("@") || event.target.value.length == 0) {
      setErrorEmailMessage("")
    } else {
      setErrorEmailMessage("Invalid email address")
    }
    
    setEmail(event.target.value);
  };

  const handleChangePw = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    console.log(event.target.name, event.target.value);
    if (event.target.value.length >= 8 || event.target.value.length == 0) {
      setErrorPasswordMessage("")
    } else {
      setErrorPasswordMessage("Must be at least 8 characters")
    }

    setPassword((prevPassword) => {
      return {
        ...prevPassword,
        [event.target.name]: event.target.value
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); // Set isSubmitting to true when the form is being submitted
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password.password,
      })
      
      if (error) throw error
      else {
        if (!error) {
          // Clear any previously stored login credentials
          localStorage.removeItem("rememberedUser");
    
          if (rememberMe) {
            // Store login credentials securely in local storage with a 30-day expiration
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 21);
            localStorage.setItem(
              "rememberedUser",
              JSON.stringify({ email: email, password: password.password, expiration: expirationDate.toISOString() })
            );
          }
          const token = localStorage.getItem('sb-pmjwqjsoojzbascysdbk-auth-token');
          if (token) {
            const tokenData = JSON.parse(token);
            const tMetaFName = tokenData.user.user_metadata.first_name;
            const tMetaLName = tokenData.user.user_metadata.last_name;
            const tMetaHandle = tokenData.user.user_metadata.handle;
            const tID = tokenData.user.id;

            const idNum = await fetchIdNum();
            const profiles = await fetchUUID();
            const existingProfile = profiles.includes(tID);

            if (!existingProfile) {              
              const newProfile : any = {
                id: idNum,
                icon: '/root/temp.jpg',
                first_name: tMetaFName,
                last_name: tMetaLName,
                location: '',
                biography: '',
                payment_methods: [],
                delivery_methods: [],
                is_verified: false,
                uuid: tID,
                handle: tMetaHandle,
                banner: '',
                post_count: 0,
                bookmarks: [],
                cart: []
              };

              try {
                const { data, error } = await supabase
                  .from('profiles')
                  .insert([newProfile]);
              } catch (e) {
                console.error('Error during insertion:', e);
              }

              console.log(tokenData);
              console.log('New profile created');
            } else {
              console.log('Profile already exists');
            }
          } 
        }
        router.push('/')
      }
    } catch (error) {
      if ((error as AuthError).message == 'Email not confirmed') {
        setErrorMessage('Confirm your email address to continue.')
      }
      else {
        console.log(error)
        setErrorMessage('Incorrect email/password. Please try again.') // Set error message on login failure
      }
    } finally {
      setIsSubmitting(false) // Reset isSubmitting when the form submission process is complete
    }
  }

  useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      const userObject = JSON.parse(rememberedUser);
      setEmail(userObject.email);
      console.log(userObject.email)
      setPassword({ password: userObject.password });
      console.log(userObject.password)
      setRememberMe(true);
    }
  }, []);

  return (
    <main className="flex flex-col w-screen h-screen items-center justify-center bg-cover bg-[url('/images/bg-auth-2.jpg')]">
    <div className="fixed top-0 left-0 z-[-1] w-screen h-screen bg-gradient-to-b from-zinc-100 to-zinc-300"></div>
    
      <div className="bg-white rounded-lg p-0 flex flex-row h-[32rem] w-[56rem] filter drop-shadow-2xl">
        <div className="flex flex-col bg-[url('/images/bg-auth.jpg')] bg-cover rounded-l-lg h-full aspect-square p-10 justify-between">
          <Italic className="opacity-70 text-white" size={14} strokeWidth={3} />
          <div className="flex flex-col gap-4">
            <h6 className="text-white font-medium text-4xl leading-8 pr-20 tracking-tight">Find everything you need in one place.</h6>
            <h6 className="text-white font-light text-lg leading-5 pr-20">Discover bargains at an affordable price without breaking the bank.</h6>
          </div>
          <h6 className="text-white font-extralight text-xs pr-60">Create an account, or log in with an existing one to gain access to all of Influx&apos;s features.</h6>
          <h6 className="text-white font-extralight text-[0.6rem] ">All Rights Reserved. ©2023 influx.io</h6>
        </div>

        <div className="flex flex-col p-8 w-full gap-8 justify-center">
          <h6 className="text-gray-800 font-medium text-2xl tracking-tight">Log in to continue</h6>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <div className="flex flex-row gap-4 w-full items-center justify-between">
                <label htmlFor="u_name" className="text-gray-800 font-regular text-xs leading-8">Email Address</label>
                <label className="text-[#FF0000] font-light text-[0.6rem] leading-8">{errorEmailMessage}</label>  
              </div>
              
              <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
                <div className="h-full aspect-square flex items-center justify-center">
                  <AtSign className="opacity-50" color="black" strokeWidth={3} size={14}/>
                </div>
                <input name="email_address" onChange={handleChangeForm} id="email_address" type="text" placeholder="hq@influx.org" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2" value={email} required></input>
              </div>

              <div className="flex flex-row gap-4 w-full items-center justify-between">
                <label htmlFor="u_pass" className="text-gray-800 font-regular text-xs leading-8">Password</label>
                <label className="text-[#FF0000] font-light text-[0.6rem] leading-8">{errorPasswordMessage}</label>
              </div>

              <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
                <div className="h-full aspect-square flex items-center justify-center">
                  <SquareAsterisk className="opacity-50" color="black" strokeWidth={3} size={14}/>
                </div>
                <input name="password" onChange={handleChangePw} id="password" type="password" placeholder="********" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2" value={password.password} required minLength={8}></input>
              </div>
            </div>

            <div className="flex flex-row justify-between w-full items-center">
              <div className="flex flex-row gap-2 items-center">
                <input type="checkbox" id="remember" name="remember" className="cursor-pointer" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                <h6 className="bg-white text-gray-800 font-regular tracking-tight leading-3 text-xs h-full">Remember me</h6>
              </div>
              <h6 className="bg-white text-gray-800 font-regular text-xs tracking-tight h-full cursor-pointer hover:underline">Forgot Password?</h6>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full flex flex-row bg-slate-900 rounded-2xl items-center justify-center cursor-pointer gap-2">
              <h6 className="text-violet-300 font-light text-xs h-full cursor-pointer py-1.5">{isSubmitting ? 'Logging in...' : 'Continue with an Influx Account'}</h6>
            </button>
            <label className="text-[#FF0000] font-regular text-xs h-1">{errorMessage}</label>
          </form>

          <div className="flex flex-row gap-1 items-center py-2">
            <Link href="/auth/register" className="text-gray-800 font-regular text-xs h-full cursor-pointer leading-2 hover:underline">New to Influx?&ensp;Sign up here.</Link>
            <ChevronRight className="opacity-70" color="black" size={14} strokeWidth={3}/>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login;