/* eslint-disable react-hooks/rules-of-hooks */

'use client'
import React from 'react'
import toast from 'react-hot-toast';
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader/loader'
import Nav from '@/components/Header/Nav'
function page(name) {
  const [Fname,setFname] = useState("")
  const [Lname,setLname] = useState("")
  const [Email,setEmail] = useState("")
  const [Password,setPassword] = useState("")
  const [Processing,setProcessing] = useState(false)
  const router = useRouter();
  
  const adminlogin = async (e)=>{
    setProcessing(true)
    e.preventDefault() 
    if(!Email || !Password || !Lname || !Fname){
      toast.error("All Fields are required.")
        setProcessing(false)
        return;
      }
      try {
      const res = await fetch("api/admin/login", {
        method: 'POST',
        cache: 'no-store',
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify({
           Email, Password
        })
      })  
      router.push("/admin/dashboard");
    setProcessing(false)

     } catch (error) {
          console.log(error);
  }

  }

  return (
    <>
    <Nav name="true" />
    <div className='flex w-screen justify-center bg-white dark:bg-slate-900 py-9' >
      <form onSubmit={adminlogin}  >
      <div className="flex flex-col items-center justify-center px-6 py-2 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0  sm:max-w-md xl:p-0  dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:w-96 md:space-y-3 sm:p-8">
            <p className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900  dark:text-white md:text-2xl">
                  Admin Dashboard
              </p><div>
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Firstname
                </label>
                <input onChange={(e)=>setFname(e.target.value)} placeholder="Write First Name Here" className=" dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white sm:text-sm rounded-lg block w-full p-2.5" id="username" type="text"/>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Lastname
                </label>
                <input onChange={(e)=>setLname(e.target.value)} placeholder="Write Second Name Here" className=" dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white sm:text-sm rounded-lg block w-full p-2.5" id="username" type="text"/>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input onChange={(e)=>setEmail(e.target.value)} className=" dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white sm:text-sm rounded-lg block w-full p-2.5" placeholder="Write Email Here" id="password" type="email"/>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 Password
                </label>
                <input onChange={(e)=>setPassword(e.target.value)} className=" dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white sm:text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" id="confirmPassword" type="password"/>
              </div>
              {Processing? <Loader/> :
              <button className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white" type="submit" >
                Admin Login
              </button>
}
            
          </div>
        </div>
      </div></form>
    
    </div>
    </>
  )
}

export default page
