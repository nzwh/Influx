"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

import { AtSign, ChevronRight, Italic, SquareAsterisk } from 'lucide-react';
import { User as UserInterface } from '@/libraries/structures';
import supabase from '@/src/app/backend/supabase';

const Login = () => {
  let router = useRouter();
  const [formData, setFormData] = useState<UserInterface>({
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
      is_verified:false,
  });
  const [password, setPassword] = useState({
    password: '',
  });

  const [errorEmailMessage, setErrorEmailMessage] = useState<string>(''); // Add error message state
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>(''); // Add error message state
  const [errorMessage, setErrorMessage] = useState<string>(''); // Add error message state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Add submission status state

  const [token, setToken] = useState(false);

  if(token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {
    if(sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token')!)
      setToken(data)
    }
  }, [])

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    console.log(event.target.name, event.target.value);
    
    // Check if the input name is "email_address" and if it contains "@" in the value
    if (event.target.value.includes("@") || event.target.value.length == 0) {
      setErrorEmailMessage("")
    } else {
      setErrorEmailMessage("Invalid email address")
    }
    
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  };

  const handleChangePw = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    console.log(event.target.name, event.target.value);
    if (event.target.value.length >= 6 || event.target.value.length == 0) {
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
        email: formData.email_address,
        password: password.password,
      })
      if (error) throw error
      else {
        console.log(data)
        setToken(data)
        router.push('/')
      }
    } catch (error) {
      if (error.message == 'Email not confirmed') {
        setErrorMessage('Confirm your email address to continue.')
      }
      else {
        setErrorMessage('Incorrect email/password. Please try again.') // Set error message on login failure
      }
    } finally {
      setIsSubmitting(false) // Reset isSubmitting when the form submission process is complete
    }
  }

  return (
    <main className="flex flex-col w-screen h-screen items-center justify-center">
    <div className="fixed top-0 left-0 z-[-1] w-screen h-screen bg-gradient-to-b from-zinc-100 to-zinc-300"></div>
    
      <div className="bg-white rounded-lg p-0 flex flex-row h-[32rem] w-[56rem] filter drop-shadow-2xl">
        <div className="flex flex-col bg-[url('/root/login.png')] rounded-l-lg h-full aspect-square p-10 justify-between">
          <Italic className="opacity-70 text-violet-300" size={14} strokeWidth={3} />
          <div className="flex flex-col gap-4">
            <h6 className="text-white font-medium text-4xl leading-8 pr-20 tracking-tight">Find everything you need in one place.</h6>
            <h6 className="text-white font-light text-lg leading-5 pr-20">Discover bargains at an affordable price without breaking the bank.</h6>
          </div>
          <h6 className="text-white font-light text-xs pr-60">Create an account, or log in with an existing one to gain access to all of Influx's features.</h6>
          <h6 className="text-white font-light text-[0.6rem] ">All Rights Reserved. ©2023 influx.io</h6>
        </div>

        <div className="flex flex-col p-8 w-full gap-8 justify-center">
          <h6 className="text-gray-800 font-medium text-2xl tracking-tight">Log in to continue</h6>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <div className="flex flex-row gap-4 w-full items-center justify-between">
                <label htmlFor="u_name" className="text-gray-800 font-regular text-xs leading-8">Email Address</label>
                <label className="text-red-500 font-light text-[0.6rem] leading-8">{errorEmailMessage}</label>  
              </div>
              
              <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
                <div className="h-full aspect-square flex items-center justify-center">
                  <AtSign className="opacity-50" color="black" strokeWidth={3} size={14}/>
                </div>
                <input name="email_address" onChange={handleChangeForm} id="email_address" type="text" placeholder="hq@influx.org" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2" required></input>
              </div>

              <div className="flex flex-row gap-4 w-full items-center justify-between">
                <label htmlFor="u_pass" className="text-gray-800 font-regular text-xs leading-8">Password</label>
                <label className="text-red-500 font-light text-[0.6rem] leading-8">{errorPasswordMessage}</label>
              </div>

              <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
                <div className="h-full aspect-square flex items-center justify-center">
                  <SquareAsterisk className="opacity-50" color="black" strokeWidth={3} size={14}/>
                </div>
                <input name="password" onChange={handleChangePw} id="password" type="password" placeholder="********" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2" required minLength={8}></input>
              </div>
            </div>

            <div className="flex flex-row justify-between w-full items-center">
              <div className="flex flex-row gap-2 items-center">
                <input type="checkbox" id="remember" name="remember" className="cursor-pointer" />
                <h6 className="bg-white text-gray-800 font-regular tracking-tight leading-3 text-xs h-full">Remember me</h6>
              </div>
              <h6 className="bg-white text-gray-800 font-regular text-xs tracking-tight h-full cursor-pointer hover:underline">Forgot Password?</h6>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full flex flex-row bg-slate-900 rounded-2xl items-center justify-center cursor-pointer gap-2">
              <h6 className="text-violet-300 font-light text-xs h-full cursor-pointer py-1.5">{isSubmitting ? 'Logging in...' : 'Continue with an Influx Account'}</h6>
            </button>
            <label className="text-red-500 font-regular text-xs h-1">{errorMessage}</label>
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