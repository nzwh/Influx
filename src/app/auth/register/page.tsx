"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { AtSign, ChevronRight, FormInput, Italic, Mail, Phone, SquareAsterisk } from 'lucide-react';
import RegisterCompletePopup from '@/src/app/backend/components/dialogs/RegisterCompletePopup';
import { UserInterface } from '@/libraries/structures';
import supabase from '@/src/app/backend/model/supabase';

export default function Register() {
  const [errorFNameMessage, setErrorFNameMessage] = useState<string>(''); // Add error message state
  const [errorLNameMessage, setErrorLNameMessage] = useState<string>(''); // Add error message state
  const [errorHandleMessage, setErrorHandleMessage] = useState<string>(''); // Add error message state
  const [errorEmailMessage, setErrorEmailMessage] = useState<string>(''); // Add error message state
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>(''); // Add error message state
  const [errorMessage, setErrorMessage] = useState<string>(''); // Add error message state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Add submission status state

  const [checkFName, setCheckFName] = useState<boolean>(false);
  const [checkLName, setCheckLName] = useState<boolean>(false);
  const [checkHandle, setCheckHandle] = useState<boolean>(false);
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  const [checkPassword, setCheckPassword] = useState<boolean>(false);

  const [handles, setHandles] = useState<string[]>([]);
  const [emails,setEmails] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);
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
  const [password, setPassword] = useState({
    password: '',
  });

  const fetchHandles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('handle');
      if (error) {
        throw error;
      }
      console.log(data);
      if (data && data.length > 0) {
        const usernames = data.map((user) => user.handle);
        return usernames;
      } else {
        console.log('No user found.');
        return [];
      }
    } catch (error) {
      console.log('Error fetching user:', error);
      return [];
    }
  }
  
  const fetchEmails = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('email');
      if (error) {
        throw error;
      }
      console.log(data);
      if (data && data.length > 0) {
        const emails = data.map((user) => user.email);
        return emails;
      } else {
        console.log('No user found.');
        return [];
      }
    } catch (error) {
      console.log('Error fetching user:', error);
      return [];
    }
  }

  useEffect(() => {
    async function fetchData() {
      const usernames = await fetchHandles();
      setHandles(usernames);
      const emails = await fetchEmails();
      setEmails(emails);
    }
    fetchData();
  }, [])

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    console.log(event.target.name, event.target.value);

    if (event.target.name === "first_name") {
      if (event.target.value.length > 0) {
        setErrorFNameMessage("");
        setCheckFName(true)
      } else {
        setErrorFNameMessage("Required");
        setCheckFName(false)
      }
    } else if (event.target.name === "last_name") {
      if (event.target.value.length > 0) {
        setErrorLNameMessage("");
        setCheckLName(true)
      } else {
        setErrorLNameMessage("Required");
        setCheckLName(false)
      }
    } else if (event.target.name === "handle") {
      const enteredHandle = event.target.value;
      if (enteredHandle.length > 0) {
        setErrorHandleMessage("");
        // Check if the entered handle already exists in the usernames array
        if (handles.includes(enteredHandle)) {
          setErrorHandleMessage("Username already exists");
          setCheckHandle(false);
        } else {
          setCheckHandle(true);
        }
      } else {
        setErrorHandleMessage("Required");
        setCheckHandle(false);
      }
    } else if (event.target.name === "email_address") {
      const enteredEmail = event.target.value
      if (enteredEmail.length > 0) {
        if (enteredEmail.includes("@")) {
          setErrorEmailMessage("");
          // Check if the entered email already exists in the emails array
          if (emails.includes(enteredEmail)) {
            setErrorEmailMessage("Email already exists");
            setCheckEmail(false);
          } else {
            setCheckEmail(true);
          }
        } else {
          setErrorEmailMessage("Invalid email address");
          setCheckEmail(false);
        }
      } else {
        setErrorEmailMessage("Required");
        setCheckEmail(false);
      }      
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
    if (event.target.value.length >= 8) {
      setErrorPasswordMessage("")
      setCheckPassword(true)
    } else if (event.target.value.length == 0) {
      setErrorPasswordMessage("Required")
      setCheckPassword(false)
    } else {
      setErrorPasswordMessage("Must be at least 8 characters")
      setCheckPassword(false)
    }

    setPassword((prevPassword) => {
      return {
        ...prevPassword,
        [event.target.name]: event.target.value
      }
    })
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!checkFName || !checkLName || !checkHandle || !checkEmail || !checkPassword) {
        setErrorMessage('Please correctly fill out all fields.');
      }
      else {
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
        })
        if (error) throw error
        setShowPopup(true)
      }
    } catch (error) {
      setErrorMessage('Error.')
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

        <div className="flex flex-col p-8 w-full gap-2 justify-center">
          <h6 className="text-gray-800 font-medium text-2xl tracking-tight">Register an account</h6>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-row gap-4 w-full items-center pt-3">
              <div className="flex flex-col w-full">
                <div className="flex flex-row gap-4 w-full items-center justify-between">
                  <label htmlFor="firstname" className="text-gray-800 font-regular text-xs leading-8">First Name</label>
                  <label className="text-[#FF0000] font-light text-[0.6rem] leading-8">{errorFNameMessage}</label>
                </div>

                <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
                  <div className="h-full aspect-square flex items-center justify-center">
                    <FormInput className="opacity-50" color="black" strokeWidth={3} size={14}/>
                  </div>
                  <input name="first_name" onChange={handleChangeForm} id="first_name" type="text" placeholder="Influx" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2" required></input>
                </div>
              </div>

              <div className="flex flex-col w-full">
                <div className="flex flex-row gap-4 w-full items-center justify-between">
                  <label htmlFor="lastname" className="text-gray-800 font-regular text-xs leading-8">Last Name</label>
                  <label className="text-[#FF0000] font-light text-[0.6rem] leading-8">{errorLNameMessage}</label>
                </div>
                
                <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
                  <div className="h-full aspect-square flex items-center justify-center">
                    <FormInput className="opacity-50" color="black" strokeWidth={3} size={14}/>
                  </div>
                  <input name="last_name" onChange={handleChangeForm} id="last_name" type="text" placeholder="IO" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2" required></input>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-4 w-full items-center justify-between">
              <label htmlFor="handle" className="text-gray-800 font-regular text-xs leading-8">Username</label>
              <label className="text-[#FF0000] font-light text-[0.6rem] leading-8">{errorHandleMessage}</label>
            </div>

            <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
              <div className="h-full aspect-square flex items-center justify-center">
                <AtSign className="opacity-50" color="black" strokeWidth={3} size={14}/>
              </div>
              <input name="handle" onChange={handleChangeForm} id="handle" type="text" placeholder="@influx.io" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2" required></input>
            </div>

            <div className="flex flex-row gap-4 w-full items-center justify-between">
              <label htmlFor="email" className="text-gray-800 font-regular text-xs leading-8">Email Address</label>
              <label className="text-[#FF0000] font-light text-[0.6rem] leading-8">{errorEmailMessage}</label>
            </div>

            <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
              <div className="h-full aspect-square flex items-center justify-center">
                <Mail className="opacity-50" color="black" strokeWidth={3} size={14}/>
              </div>
              <input name="email_address" onChange={handleChangeForm} id="email_address" type="email" placeholder="hq@influx.org" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2" required></input>
            </div>

            <div className="flex flex-row gap-4 w-full items-center justify-between">
              <label htmlFor="password" className="text-gray-800 font-regular text-xs leading-8">Password</label>
              <label className="text-[#FF0000] font-light text-[0.6rem] leading-8">{errorPasswordMessage}</label>
            </div>

            <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
              <div className="h-full aspect-square flex items-center justify-center">
                <SquareAsterisk className="opacity-50" color="black" strokeWidth={3} size={14}/>
              </div>
              <input name="password" onChange={handleChangePw} id="password" type="password" placeholder="********" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2" required minLength={8}></input>
            </div>

            <button type="submit"  disabled={isSubmitting} className="my-6 w-full flex flex-row bg-slate-900 rounded-2xl items-center justify-center cursor-pointer gap-2">
              <h6 className="text-violet-300 font-light text-xs h-full cursor-pointer py-1.5">{isSubmitting ? 'Creating an account...' : 'Continue with an Influx Account'}</h6>
            </button>
            <label className="text-[#FF0000] font-regular text-xs h-1">{errorMessage}</label>
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