'use client'
import { useParams } from 'next/navigation';
import { useEffect,useState } from 'react';
import Loading from '@/components/Loading';
import Dummy from '../../../../../public/Images/Dummy/download.jpg'
import Image from 'next/image';

function Page() {
  const params = useParams();
  const [data,setdata] = useState([]);
  const [loading,setloading]=useState(true)


useEffect(() => {
  try {
    const gettingArticles = async ()=>{
      const filter= await fetch(`${process.env.NEXT_PUBLIC_LIVE_HOST}/api/blogdata?id=${params.slug}`)
      const filteredData = await filter.json();
      setdata(filteredData.blog)
      setloading(false);
   
  }
  gettingArticles();
  } catch (error) {
    throw error.message
  }

}, [params])

    return( 
      <>
{ loading ? 
<div className='min-h-screen flex justify-center items-center bg-white dark:bg-slate-900'>
<Loading/> 
</div>
:
<div className='bg-white dark:bg-slate-900'>
  <div className="text-center pt-16 md:pt-32">
    <p className="text-base md:text-lg capitalize my-3 text-purple-800 dark:text-blue-700 font-bold">  {data.categorie} / By   {data.author} </p>
    <h1 className="font-bold break-normal text-3xl md:text-5xl">{data.title}</h1>
  </div>
  <div className="container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded" style={{backgroundImage: `url(${data.image})`, height: '75vh'}} />
  <div className="container max-w-5xl mx-auto -mt-32">
    <div className="mx-0 sm:mx-6">
      <div className="bg-white  dark:bg-[hsl(0,0%,14%)] dark:text-white w-full p-8 md:p-24 text-xl md:text-2xl text-gray-800 leading-normal" style={{fontFamily: 'Georgia,serif'}}>
      <pre className='text-gray-800 font-sans dark:text-white text-lg mb-5 whitespace-pre-wrap'>
      {data.maincontent}
                </pre>
                <div className="subContent mt-8 cap">
    {
      data.subContent.map((subcontent,index)=>(
        <div key={index}>
          { subcontent.image?
        <div className='Main-Image w-full h-full relative my-10'>
  <Image
      src={`${subcontent.image}`}
      alt={`${subcontent.title}`}
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
    />
  
</div> : ""}
        <h1 className='font-semibold md:text-blod my-4  font-sans text-2xl md:text-3xl capitalize'>{subcontent.title}</h1>
        <pre className='text-gray-800 font-sans dark:text-white text-lg mb-5 whitespace-pre-wrap'>

          {subcontent.content}
        </pre>
        
        </div>
      ))

    }
  </div>
        
      </div>

    </div>
  </div>


</div>

}


        </>
    )
}
export default Page;
