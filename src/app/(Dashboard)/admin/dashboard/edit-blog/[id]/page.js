"use client"

import AdminSideBar from '@/components/AdminSideBar';
import { useEffect, useState } from 'react';
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from 'next/navigation';

function Page(params) {
  const id =  params.params.id;
  console.log(id);

  const [blogData, setBlogData] = useState({
    title: "",
    categorie: "",
    author: "",
    maincontent: "",
    image: "",
    subContent: [{ subtitle: "", content: "", image: "" }]
  });

  useEffect(() => {
    const gettingArticles = async () => {
      try {
        const response = await fetch(`/api/admin/blog/update-get?id=${id}`);
        if (!response.ok) {
          console.log('Failed to fetch data');
        }
        const data = await response.json();
        if (!data) {
          console.log("Error fetching data");
          return;
        }
        setBlogData(data.blog || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    gettingArticles();
  }, [id]);
  
  const router = useRouter();

  const handleSubtitleChange = (index, key, value) => {
    const newSubContent = [...blogData.subContent];
    newSubContent[index][key] = value;
    setBlogData({...blogData, subContent: newSubContent});
  };

  const addSubtitleField = () => {
    setBlogData({...blogData, subContent: [...blogData.subContent, { subtitle: "", content: "", image: "" }]});
  };

  const uploadImage = async (index, url) => {
    const newSubContent = [...blogData.subContent];
    newSubContent[index].image = url;
    setBlogData({...blogData, subContent: newSubContent});
  };

  const creatingStart = async (e) => {
    e.preventDefault();
    if(!blogData.title || !blogData.categorie || !blogData.author || !blogData.maincontent || !blogData.image || !blogData.subContent){
      alert("All fields are required");
      return;
    }
    // Implement your logic for creating article here
  };

  return( 
    <div className='flex sm:ml-64'>
      <AdminSideBar/>        
      <div className="flex flex-col items-center w-screen">
        <div className="flex items-start justify-between p-5 border-b-2  rounded-t">
          <h3 className="text-2xl text-purple-800 font-bold ">Update Article</h3>
        </div>
        <div className="p-6 space-y-6 flex flex-col">
          <form onSubmit={creatingStart} className="flex flex-col items-center">
            {/* Main Title Input */}
            <div className="w-full max-w-xs sm:max-w-full">
            <label htmlFor="product-name" className="text-sm font-medium text-purple-800 block mb-2">Main Title</label>
            <input className="shadow-sm bg-gray-50 border border-gray-300 text-purple-800 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" type="text" value={blogData.title} onChange={(e) => setBlogData({...blogData, title: e.target.value})} placeholder="Title here" required />
            </div>
            {/* Category Select */}
            <div className="w-full mt-4 max-w-xs sm:max-w-full">
            <label htmlFor="category" className="text-sm font-medium text-purple-800 block mb-2">Category</label>

            <select value={blogData.categorie} onChange={(e) => setBlogData({...blogData, categorie: e.target.value})}  className="shadow-sm bg-gray-50 border border-gray-300 text-purple-800 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required>
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
                {/* Main Image Upload Button */}
                <div>
            <label htmlFor="Main Image" className="text-sm mt-6 font-medium text-purple-800 block mb-2">Upload Main Image</label>
            <div name="Mainimage" className=" max-w-xs cursor-pointer bg-black h-10 rounded-lg overflow-hidden w-13 sm:max-w-full">

            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => setBlogData({...blogData, image: res[0].url})}
              onUploadError={(error) => console.error(`ERROR! ${error.message}`)}
            />
            </div>
            </div>
            
            {/* Author Name Input */}
            <div className="w-full max-w-xs my-4 sm:max-w-full">
            <label htmlFor="price" className="text-sm font-medium text-purple-800 block mb-2">Author name</label>
            
            <input type="text" value={blogData.author} onChange={(e) => setBlogData({...blogData, author: e.target.value})} className="shadow-sm bg-gray-50 border border-gray-300 text-purple-800 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Author Name"  required />
            </div>
            
            {/* Main Content Textarea */}
            <div className="w-full max-w-xs sm:max-w-full">
            <label htmlFor="Main content" className="text-sm font-medium text-purple-800 block mb-2">Main Content</label>

            <textarea value={blogData.maincontent} onChange={(e) => setBlogData({...blogData, maincontent: e.target.value})} placeholder="Main Content" rows="3" className="bg-gray-50 border border-gray-300 text-purple-800 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" required></textarea>
            </div>
            {/* {blogData.subContent.map((subtitleField, index) => (

              <div key={index} className="flex flex-col items-center mt-4 w-full max-w-xs sm:max-w-full">
                <label htmlFor={`subtitle-${index}`} className="text-sm font-medium text-purple-800 block mb-2">Sub Title</label>
                <input type="text" value={subtitleField.subtitle} onChange={(e) => handleSubtitleChange(index, 'subtitle', e.target.value)} name={`subtitle-${index}`} id={`subtitle-${index}`} className="shadow-sm bg-gray-50 border border-gray-300 text-purple-800 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Subtitle" required="" />
                <label htmlFor={`content-${index}`} className="text-sm font-medium text-purple-800 block mb-2 mt-4">Sub Content</label>
                <textarea value={subtitleField.content} onChange={(e) => handleSubtitleChange(index, 'content', e.target.value)} name={`content-${index}`} id={`content-${index}`} className="bg-gray-50 border border-gray-300 text-purple-800 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Subtitle Content" required="" />
                <div className='flex flex-col items-center'>
            <label htmlFor="sub Image" className="text-sm mt-4 font-medium text-purple-800 block mb-2">Sub Image</label>

            <div name="subimage" className=" max-w-xs cursor-pointer bg-black h-10 rounded-lg overflow-hidden w-13 mb-6  sm:max-w-full">
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
            </div>
              </div>
            ))}

             */}
        
            {/* Subtitle Fields (Dynamic) */}
            {blogData.subContent.map((subtitleField, index) => (
              <div key={index} className="flex w-full" >
                <input type="text" value={subtitleField.subtitle} onChange={(e) => handleSubtitleChange(index, 'subtitle', e.target.value)} placeholder="Subtitle" required />
                <textarea value={subtitleField.content} onChange={(e) => handleSubtitleChange(index, 'content', e.target.value)} placeholder="Subtitle Content" required></textarea>
                <div className='flex flex-col items-center'>
            <label htmlFor="sub Image" className="text-sm mt-4 font-medium text-purple-800 block mb-2">Sub Image</label>
            <div name="subimage" className=" max-w-xs cursor-pointer bg-black h-10 rounded-lg overflow-hidden w-13 mb-6  sm:max-w-full">
                
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => uploadImage(index, res[0].url)}
                  onUploadError={(error) => console.error(`ERROR! ${error.message}`)}
                />
              </div>
              </div>
              </div>
            ))}
            <div className="p-6 border-t space-x-6 border-gray-200 rounded-b flex items-center flex-wrap justify-center">
            
            {/* Button to Add Subtitle Field */}
            <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button" onClick={addSubtitleField}>Add Subtitle Field</button>
            
            {/* Submit Button */}
            <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Create Article</button>
            </div>
              
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
