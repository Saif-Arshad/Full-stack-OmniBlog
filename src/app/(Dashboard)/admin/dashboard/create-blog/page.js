/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React from 'react'
import { useState } from 'react'
import AdminSideBar from '@/components/AdminSideBar'

export default function page() {
  const [title,settitle] = useState("")
  const [Catagory,setcatagory] = useState("")
  const [Author,setAuthor] = useState("")
  const [Maincontent,setMaincontent] = useState("")
  console.log(title, Author, Catagory,Maincontent );
const creatingStart = ()=>{
    // alert("Product created successfully")
    console.log("Hello World!")
}


  return (
    <div className='flex'>
      <AdminSideBar/>
      <div className="bg-white border border-4 rounded-lg shadow relative m-10 mt-2">

<div className="flex items-start justify-between p-5 border-b rounded-t">
    <h3 className="text-xl font-semibold">
        Create product
    </h3>
    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="product-modal">
       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" fclipRule="evenodd"></path></svg>
    </button>
</div>

<div className="p-6 space-y-6">
    <form action="#" onSubmit={creatingStart}>
        <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
                <label htmlFor="product-name" className="text-sm font-medium text-gray-900 block mb-2">Title</label>
                <input type="text" onChange={(e)=>settitle(e.target.value)} name="title" id="product-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Apple Imac 27”" required=""/>
            </div>
            <div className="col-span-6 sm:col-span-3">
                <label htmlFor="category" className="text-sm font-medium text-gray-900 block mb-2">Category</label>
                <input type="text" onChange={(e)=>setcatagory(e.target.value)} name="category" id="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Electronics" required=""/>
            </div>
            <div className="col-span-6 sm:col-span-3">
                <label htmlFor="brand" className="text-sm font-medium text-gray-900 block mb-2">Subtitle</label>
                <input type="text"  name="brand" id="brand" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Apple" required=""/>
            </div>
            <div className="col-span-6 sm:col-span-3">
                <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">Author</label>
                <input type="text" onChange={(e)=>setAuthor(e.target.value)} name="price" id="price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="$2300" required=""/>
            </div>
            <div className="col-span-full">
                <label htmlFor="product-details" className="text-sm font-medium text-gray-900 block mb-2">Product Details</label>
                <textarea id="product-details"onChange={(e)=>setMaincontent(e.target.value)} rows="6" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Details"></textarea>
            </div>
        </div>
    </form>
</div>

<div className="p-6 border-t border-gray-200 rounded-b">
    <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Create Article</button>
</div>

</div>
      </div>
  )
}
