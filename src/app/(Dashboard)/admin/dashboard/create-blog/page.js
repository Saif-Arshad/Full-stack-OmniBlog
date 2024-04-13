"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';  
import { UploadButton } from "@/utils/uploadthing";
import AdminSideBar from '@/components/AdminSideBar';

export default function Page() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [Author, setAuthor] = useState("");
  const [Maincontent, setMaincontent] = useState("");
  const [Image, setImage] = useState("");
  const [subtitleFields, setSubtitleFields] = useState([{ subtitle: "", content: "", image: "" }]);
  // console.log(subtitleFields);
  const handleSubtitleChange = (index, key, value) => {
    const newSubtitleFields = [...subtitleFields];
    newSubtitleFields[index][key] = value;
    setSubtitleFields(newSubtitleFields);
  };

  const addSubtitleField = () => {
    setSubtitleFields([...subtitleFields, { subtitle: "", content: "", image: "" }]);
  };

  const uploadImage = async (index, url) => {
    const newSubtitleFields = [...subtitleFields];
    newSubtitleFields[index].image = url;
    setSubtitleFields(newSubtitleFields);
  };

  const creatingStart = async (e) => {
    e.preventDefault();
    if(!title || !category || !Author || !Maincontent || !Image || !subtitleFields){
      alert("All fields are required")
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_LIVE_HOST}/api/admin/blog/creating`, {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title, category, Author, Maincontent, Image, subtitleFields
        })
      });
      if (res.ok) {
        // console.log('successfully created');
        router.push('/admin/dashboard');
      
      }
    } catch (error) {
      throw error.message;
      // console.log('error: ' + error);
    }
  };

  return (
    <div className='flex sm:ml-64 bg-white dark:bg-slate-900'>
      <AdminSideBar />
      <div className="flex flex-col items-center w-screen bg-white dark:bg-slate-900">
        <div className="flex items-start justify-between p-5 border-b-2  rounded-t">
          <h3 className="text-2xl text-purple-800 dark:text-orange-500  font-bold ">Create Article</h3>
        </div>
        <div className="p-6 space-y-6 flex flex-col">
          <form onSubmit={creatingStart} className="flex flex-col items-center">
            <div className="w-full max-w-xs sm:max-w-full">
              <label htmlFor="product-name" className="text-sm font-medium text-purple-800 dark:text-white  block mb-2">Main Title</label>
              <input type="text" onChange={(e) => setTitle(e.target.value)} name="title" id="product-name" className="shadow-sm bg-gray-50 dark:bg-gray-800  border border-gray-300 text-purple-800 dark:text-white  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Title here" required />
            </div>
            <div className="w-full mt-4 max-w-xs sm:max-w-full">
              <label htmlFor="category" className="text-sm font-medium text-purple-800 dark:text-white  block mb-2">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} name="category" id="category" className="shadow-sm bg-gray-50 dark:bg-gray-800  border border-gray-300 text-purple-800 dark:text-white  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required>
                <option value="">Select Category</option>
                <option value="technology">Technology</option>
                <option value="food">Food</option>
                <option value="health">Health</option>
                <option value="movie">Movie</option>
                <option value="sport">Sport</option>
                <option value="news">News</option>
                <option value="fashion">Fashion</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
            </div>
            <div>
            <label htmlFor="Main Image" className="text-sm mt-6 font-medium text-purple-800 dark:text-white  block mb-2">Upload Main Image</label>

            <div name="Mainimage" className=" max-w-xs cursor-pointer hover:scale-105 bg-black h-10 rounded-lg overflow-hidden w-13 sm:max-w-full">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // console.log("Files: ", res);
                  setImage(res[0].url)
                }}
                onUploadError={(error) => {
                  throw error.message;
                  // console.log(`ERROR! ${error.message}`);
                }}
              />
            </div>
            {Image ?     
  // eslint-disable-next-line @next/next/no-img-element
  <img
    className='mt-4'
    src={Image}
    height={200}
    width={300}
    alt='main image'
  /> 
  : null
}
            </div>
            <div className="w-full max-w-xs my-4 sm:max-w-full">
              <label htmlFor="price" className="text-sm font-medium text-purple-800 dark:text-white  block mb-2">Author name</label>
              <input type="text" onChange={(e) => setAuthor(e.target.value)} name="price" id="price" className="shadow-sm bg-gray-50 dark:bg-gray-800  border border-gray-300 text-purple-800 dark:text-white  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="David" required="" />
            </div>
            <div className="w-full max-w-xs sm:max-w-full">
              <label htmlFor="Main content" className="text-sm font-medium text-purple-800 dark:text-white  block mb-2">Main Content</label>
              <textarea id="Main content"  cols={80} rows={8} onChange={(e) => setMaincontent(e.target.value)} className="bg-gray-50 dark:bg-gray-800  border border-gray-300 text-purple-800 dark:text-white  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Content"></textarea>
            </div>
            {subtitleFields.map((subtitleField, index) => (
              <div key={index} className="flex flex-col items-center mt-4 w-full max-w-xs sm:max-w-full">
                <label htmlFor={`subtitle-${index}`} className="text-sm font-medium text-purple-800 dark:text-white  block mb-2">Sub Title</label>
                <input type="text" value={subtitleField.subtitle} onChange={(e) => handleSubtitleChange(index, 'subtitle', e.target.value)} name={`subtitle-${index}`} id={`subtitle-${index}`} className="shadow-sm bg-gray-50 dark:bg-gray-800  border border-gray-300 text-purple-800 dark:text-white  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Subtitle" required="" />
                <label htmlFor={`content-${index}`} className="text-sm font-medium text-purple-800 dark:text-white  block mb-2 mt-4">Sub Content</label>
                <textarea value={subtitleField.content} cols={80} rows={8} onChange={(e) => handleSubtitleChange(index, 'content', e.target.value)} name={`content-${index}`} id={`content-${index}`} className="bg-gray-50 dark:bg-gray-800  border border-gray-300 text-purple-800 dark:text-white  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Subtitle Content" required="" />
                <div className='flex flex-col items-center'>
            <label htmlFor="sub Image" className="text-sm mt-4 font-medium text-purple-800 dark:text-white  block mb-2">Sub Image</label>

            <div name="subimage" className=" max-w-xs cursor-pointer bg-black h-12 hover:scale-105 px-2 py-1 rounded-lg overflow-hidden w-13 mb-6  sm:max-w-full">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // console.log("Files: ", res);
                  const newSubtitleFields = [...subtitleFields];
            newSubtitleFields[index].image = res[0].url;
            setSubtitleFields(newSubtitleFields);
                }}
                onUploadError={(error) => {
                  throw error.message;
                  // console.log(`ERROR! ${error.message}`);
                }}
              />
            </div>
            {subtitleField.image ?     
  // eslint-disable-next-line @next/next/no-img-element
  <img
    className='mt-4'
    src={subtitleField.image}
    height={200}
    width={300}
    alt='main image'
  /> 
  : null
}
            </div>
              </div>
            ))}
            <div className="p-6 border-t space-y-4 sm:space-y-0 border-gray-200 rounded-b flex flex-wrap items-center justify-center">
              <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button" onClick={addSubtitleField}>Add Subtitle Field</button>
              <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-4" type="submit">Create Article</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
