"use client"

import AdminSideBar from '@/components/AdminSideBar';
import { useEffect, useState } from 'react';
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import Image from 'next/image';

function Page(params) {
  const id =  params.params.id;
  // console.log(id);

  const [blogData, setBlogData] = useState({
    title: "",
    categorie: "",
    author: "",
    maincontent: "",
    image: "",
    subContent: [{ subtitle: "", content: "", image: "" }]
  });
  const [loading,setloading]=useState(true)
  useEffect(() => {
    const gettingArticles = async () => {
      try {
        const response = await fetch(`/api/admin/blog/update-get?id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
          // console.log('Failed to fetch data');
        }
        const data = await response.json();
        if (!data) {
          throw new Error('Failed to fetch data');
          // console.log("Error fetching data");
          // return;
        }
        // console.log(data);
        setBlogData(data.blog || {});
        setloading(false)
      } catch (error) {
        throw error.message;
        // console.error("Error fetching data:", error);
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
    // Check if the last subcontent has been filled
    const lastSubcontent = blogData.subContent[blogData.subContent.length - 1];
    if (lastSubcontent.title || lastSubcontent.content || lastSubcontent.image) {
      setBlogData({
        ...blogData,
        subContent: [
          ...blogData.subContent,
          { title: "", content: "", image: "" }
        ]
      });
    }
  };
  

  const uploadImage = async (index, url) => {
    const newSubContent = [...blogData.subContent];
    newSubContent[index].image = url;
    setBlogData({...blogData, subContent: newSubContent});
  };
  // console.log(blogData.subContent);
  const updatingStart = async (e) => {
    e.preventDefault();
    if(!blogData.title || !blogData.categorie || !blogData.author || !blogData.maincontent || !blogData.image ){
      alert("All fields are required");
      return;
    }
      try {
        const currentid = blogData._id
        // console.log(currentid);
        const res = await fetch(`/api/admin/blog/update-post?id=${currentid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: blogData.title,
        category: blogData.categorie,
        Author: blogData.author,
        Maincontent: blogData.maincontent,
        Image: blogData.image,
        subtitleFields: blogData.subContent
          })
        });
        if (res.ok) {
          // console.log('successfully updated');
          router.push('/admin/dashboard/all-posts');
        
        }
        
      } catch (error) {
        throw error.message
        // console.log(error); 
      }
  };

  return( 
    <div className='flex sm:ml-64 bg-white dark:bg-slate-900'>
      <AdminSideBar/>        
      {loading ?
      <div className="min-h-screen min-w-screen bg-white dark:bg-slate-900">
      <Loading/> 
      </div>
      :
      <div className="flex flex-col items-center w-screen bg-white dark:bg-slate-900">
        <div className="flex items-start justify-between p-5 border-b-2  rounded-t">
          <h3 className="text-2xl text-purple-800 dark:text-orange-500  font-bold  ">Update Article</h3>
        </div>
        <div className="p-6 space-y-6 flex flex-col">
          <form onSubmit={updatingStart} className="flex flex-col items-center">
            {/* Main Title Input */}
            <div className="w-full max-w-xs sm:max-w-full">
            <label htmlFor="product-name" className="text-sm font-medium text-purple-800 dark:text-white  block mb-2">Main Title</label>
            <input className="shadow-sm bg-gray-50 dark:bg-gray-700  border border-gray-300 text-purple-800 dark:text-white  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" type="text" value={blogData.title} onChange={(e) => setBlogData({...blogData, title: e.target.value})} placeholder="Title here" required />
            </div>
            {/* Category Select */}
            <div className="w-full mt-4 max-w-xs sm:max-w-full">
            <label htmlFor="category" className="text-sm font-medium text-purple-800 dark:text-white  block mb-2">Category</label>

            <select value={blogData.categorie} onChange={(e) => setBlogData({...blogData, categorie: e.target.value})}  className="shadow-sm bg-gray-50 dark:bg-gray-700  border border-gray-300 text-purple-800 dark:text-white  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required>
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
            <label htmlFor="Main Image" className="text-sm mt-6 font-medium text-purple-800 dark:text-white  block mb-2">Upload Main Image</label>
            <div name="Mainimage" className=" max-w-xs cursor-pointer bg-black h-10 rounded-lg overflow-hidden w-13 sm:max-w-full">

            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => setBlogData({...blogData, image: res[0].url})}
              onUploadError={(error) =>  {throw error.message}  }
            />
            </div>
          <Image
          className='mt-4'
            src={blogData.image}
            height={200}
            width={300}
            alt='main image'
          >

          </Image>
            
            </div>
            
            {/* Author Name Input */}
            <div className="w-full max-w-xs my-4 sm:max-w-full">
            <label htmlFor="price" className="text-sm font-medium text-purple-800 dark:text-white  block mb-2">Author name</label>
            
            <input type="text" value={blogData.author} onChange={(e) => setBlogData({...blogData, author: e.target.value})} className="shadow-sm bg-gray-50 dark:bg-gray-700  border border-gray-300 text-purple-800 dark:text-white  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Author Name"  required />
            </div>
            
            {/* Main Content Textarea */}
            <div className="w-full max-w-xs sm:max-w-full">
            <label htmlFor="Main content" className="text-sm font-medium text-purple-800 dark:text-white  block mb-2">Main Content</label>

            <textarea value={blogData.maincontent} onChange={(e) => setBlogData({...blogData, maincontent: e.target.value})} placeholder="Main Content"cols={80} rows={8}  className="bg-gray-50 dark:bg-gray-700  border border-gray-300 text-purple-800 dark:text-white  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" required></textarea>
            </div>
        
            {/* Subtitle Fields (Dynamic) */}
            {blogData.subContent.map((subtitleField, index) => (
              <div key={index} className="flex flex-col items-center mt-4 w-full max-w-xs sm:max-w-full" >
                <label htmlFor={`subtitle-${index}`} className="text-sm font-medium text-purple-800 dark:text-white  block mb-2">Sub Title</label>
                <input type="text" value={subtitleField.title} onChange={(e) => handleSubtitleChange(index, 'title', e.target.value)} className="shadow-sm bg-gray-50 dark:bg-gray-700  border border-gray-300 text-purple-800 dark:text-white  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Subtitle"  />
                <label htmlFor={`content-${index}`} className="text-sm font-medium text-purple-800 dark:text-white  block mb-2 mt-4">Sub Content</label>
           
                <textarea value={subtitleField.content} onChange={(e) => handleSubtitleChange(index, 'content', e.target.value)} cols={80} rows={8}  placeholder="Subtitle Content" className="bg-gray-50 dark:bg-gray-700  border border-gray-300 text-purple-800 dark:text-white  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" ></textarea>
                <div className='flex flex-col items-center'>
            <label htmlFor="sub Image" className="text-sm mt-4 font-medium text-purple-800 dark:text-white  block mb-2">Sub Image</label>
            <div name="subimage" className=" max-w-xs cursor-pointer bg-black h-12 rounded-lg overflow-hidden w-13 mb-6 p-1  sm:max-w-full">

                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => uploadImage(index, res[0].url)}
                  onUploadError={(error) =>{
                      throw error.message
                    //  console.error(`ERROR! ${error.message}`)
                    }}
                />
              </div>
              {subtitleField.image ? 
  <Image
  className='mt-4'
    src={subtitleField.image}
    height={200}
    width={300}
    alt='Sub image'
  >
  </Image> 
: ""}

          {/* <Image
            src={subtitleField.image}
            height={200}
            width={300}
            alt='main image'
          >

          </Image> */}
              </div>
              </div>
            ))}
            <div className="p-6 border-t space-x-6 border-gray-200 rounded-b flex items-center flex-wrap justify-center">
            
            {/* Button to Add Subtitle Field */}
            <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button" onClick={addSubtitleField}>Add Subtitle Field</button>
            
            {/* Submit Button */}
            <button className="text-white mt-3 sm:mt-0 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Update Article</button>
            </div>
              
          </form>
        </div>
      </div>
       }
    </div>
  );
}

export default Page;
