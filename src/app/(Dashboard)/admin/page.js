/* eslint-disable react-hooks/rules-of-hooks */

'use client'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader/loader'
function page(name=true) {
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
        alert("All Fields are required")
        setProcessing(false)
        return;
      }
      try {
      const res = await fetch("api/admin/login", {
        method: 'POST',
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify({
           Email, Password
        })
      })  
      router.push("/admin/dashboard");
     } catch (error) {
          console.log(error);
  }
  finally{
    setProcessing(false)
  }
  }

  return (
    <div className='flex w-screen justify-center pt-6' >
      <form onSubmit={adminlogin} >
      <div className="flex flex-col items-center justify-center px-6 py-2 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0  sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:w-96 md:space-y-3 sm:p-8">
            <p className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl">
              Welcome Back Admin            
            
              </p><div>
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Firstname
                </label>
                <input onChange={(e)=>setFname(e.target.value)} placeholder="saif" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="username" type="text"/>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Lastname
                </label>
                <input onChange={(e)=>setLname(e.target.value)} placeholder="Rehman" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="username" type="text"/>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Email
                </label>
                <input onChange={(e)=>setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="Saifurrehman@gmail.com" id="password" type="email"/>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                 Password
                </label>
                <input onChange={(e)=>setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" id="confirmPassword" type="password"/>
              </div>
              {Processing? <Loader/> :
              <button className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white" type="submit">
                Admin Login
              </button>
}
            
          </div>
        </div>
      </div></form>
    
    </div>
  )
}

export default page
