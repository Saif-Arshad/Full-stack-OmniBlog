/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useState } from 'react';
import { UploadButton } from "@/utils/uploadthing";
import AdminSideBar from '@/components/AdminSideBar';

export default function page() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [Author, setAuthor] = useState("");
  const [Maincontent, setMaincontent] = useState("");
  const [Image, setImage] = useState("");
  const [subtitleFields, setSubtitleFields] = useState([{ subtitle: "", content: "", image: "" }]);

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
    try {
      const res = await fetch('/api/admin/blog/creating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title, category, Author, Maincontent, Image, subtitleFields
        })
      });
      if (res.ok) {
        console.log('successfully created')
      }
    } catch (error) {
      console.log('error: ' + error);
    }
  };

  return (
    <div className='flex'>
      <AdminSideBar />
      <div className="bg-white border border-4 rounded-lg shadow relative m-10 mt-2">
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Create product</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className='bg-slate-700 cursor-pointer'>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                setImage(res[0].url)
              }}
              onUploadError={(error) => {
                console.log(`ERROR! ${error.message}`);
              }}
            />
          </div>
          <form onSubmit={creatingStart}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="product-name" className="text-sm font-medium text-gray-900 block mb-2">Title</label>
                <input type="text" onChange={(e) => setTitle(e.target.value)} name="title" id="product-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Apple Imac 27”" required="" />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="category" className="text-sm font-medium text-gray-900 block mb-2">Category</label>
                <input type="text" onChange={(e) => setCategory(e.target.value)} name="category" id="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Electronics" required="" />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">Author</label>
                <input type="text" onChange={(e) => setAuthor(e.target.value)} name="price" id="price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="$2300" required="" />
              </div>
            </div>
            {subtitleFields.map((subtitleField, index) => (
              <div key={index} className="grid grid-cols-6 gap-6 mt-4">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor={`subtitle-${index}`} className="text-sm font-medium text-gray-900 block mb-2">Subtitle</label>
                  <input type="text" value={subtitleField.subtitle} onChange={(e) => handleSubtitleChange(index, 'subtitle', e.target.value)} name={`subtitle-${index}`} id={`subtitle-${index}`} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Subtitle" required="" />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor={`content-${index}`} className="text-sm font-medium text-gray-900 block mb-2">Subtitle Content</label>
                  <textarea value={subtitleField.content} onChange={(e) => handleSubtitleChange(index, 'content', e.target.value)} name={`content-${index}`} id={`content-${index}`} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Subtitle Content" required="" />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      console.log("Files: ", res);
                      uploadImage(index, res[0].url);
                    }}
                    onUploadError={(error) => {
                      console.log(`ERROR! ${error.message}`);
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="col-span-full">
              <label htmlFor="product-details" className="text-sm font-medium text-gray-900 block mb-2">Product Details</label>
              <textarea id="product-details" onChange={(e) => setMaincontent(e.target.value)} rows="6" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Details"></textarea>
            </div>
            <div className="p-6 border-t border-gray-200 rounded-b">
              <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button" onClick={addSubtitleField}>Add Subtitle Field</button>
              <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-4" type="submit">Create Article</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
