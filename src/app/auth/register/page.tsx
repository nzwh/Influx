"use client"

import React, { useState } from 'react';
import Link from 'next/link';

import { AtSign, ChevronRight, FormInput, Italic, Mail, Phone, SquareAsterisk } from 'lucide-react';
import RegisterCompletePopup from '@/src/app/backend/components/dialogs/RegisterCompletePopup';
import { User as UserInterface } from '@/libraries/structures';
import supabase from '@/src/app/backend/supabase';

export default function Register() {
  const [showPopup, setShowPopup] = useState(false);
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

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  };

  const handleChangePw = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setPassword((prevPassword) => {
      return {
        ...prevPassword,
        [event.target.name]: event.target.value
      }
    })
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp(
        {
          email: formData.email_address,
          password: password.password,
          options: {
            data: {
              first_name: formData.first_name,
              last_name: formData.last_name,
              handle: formData.handle,
            }
          }
        }
      )
    } catch (error) {
      alert(error)
    }

    setShowPopup(true);
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

        <div className="flex flex-col p-8 w-full justify-center">
          <h6 className="text-gray-800 font-medium text-2xl tracking-tight">Register an account</h6>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-row gap-4 w-full items-center pt-3">
              <div className="flex flex-col w-full">
              <label htmlFor="firstname" className="text-gray-800 font-regular text-xs leading-8">First name</label>
              <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
                <div className="h-full aspect-square flex items-center justify-center">
                  <FormInput className="opacity-50" color="black" strokeWidth={3} size={14}/>
                </div>
                <input name="first_name" onChange={handleChangeForm} id="first_name" type="text" placeholder="Influx" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2 italic" required></input>
              </div>
              </div>

              <div className="flex flex-col w-full">
              <label htmlFor="lastname" className="text-gray-800 font-regular text-xs leading-8">Last name</label>
              <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
                <div className="h-full aspect-square flex items-center justify-center">
                  <FormInput className="opacity-50" color="black" strokeWidth={3} size={14}/>
                </div>
                <input name="last_name" onChange={handleChangeForm} id="last_name" type="text" placeholder="IO" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2 italic" required></input>
              </div>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="username" className="text-gray-800 font-regular text-xs leading-8">Username</label>
              <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
                <div className="h-full aspect-square flex items-center justify-center">
                  <AtSign className="opacity-50" color="black" strokeWidth={3} size={14}/>
                </div>
                <input name="handle" onChange={handleChangeForm} id="handle" type="text" placeholder="@influx.io" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2 italic" required></input>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="email" className="text-gray-800 font-regular text-xs leading-8">Email Address</label>
              <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
                <div className="h-full aspect-square flex items-center justify-center">
                  <Mail className="opacity-50" color="black" strokeWidth={3} size={14}/>
                </div>
                <input name="email_address" onChange={handleChangeForm} id="email_address" type="email" placeholder="hq@influx.org" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2 italic" required></input>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="password" className="text-gray-800 font-regular text-xs leading-8">Password</label>
              <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
                <div className="h-full aspect-square flex items-center justify-center">
                  <SquareAsterisk className="opacity-50" color="black" strokeWidth={3} size={14}/>
                </div>
                <input name="password" onChange={handleChangePw} id="password" type="password" placeholder="********" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2 italic" required></input>
              </div>
            </div>

            <button type="submit" className="my-6 w-full flex flex-row bg-slate-900 rounded-2xl items-center justify-center cursor-pointer gap-2">
              <h6 className="text-violet-300 font-light text-xs h-full cursor-pointer py-1.5">Continue with an Influx Account</h6>
            </button>
          </form>

          <div className="flex flex-row gap-1 items-center py-2">
            <Link href="/auth/login" className="text-gray-800 font-regular text-xs h-full cursor-pointer leading-2 hover:underline">Already have an account?&ensp;Log in here.</Link>
            <ChevronRight className="opacity-70" color="black" size={14} strokeWidth={3}/>
          </div>

        </div>
      </div> 
      {showPopup && <RegisterCompletePopup />}
    </main>
  )
}