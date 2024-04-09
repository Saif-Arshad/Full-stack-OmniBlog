import React from 'react'
import '@/app/Stylesheets/Search.scss'
function Searchloader(props) {
  return (
	<div className='w-full bg-white dark:bg-slate-900 h-48 flex flex-wrap flex-col items-center'>
		
    <div className="🤚 ">
	<div className="👉"></div>
	<div className="👉"></div>
	<div className="👉"></div>
	<div className="👉"></div>
	<div className="🌴"></div>		
	<div className="👍"></div>
</div>
<h1 className='font-bold text-xl mt-12'>Sorry we could not find {props.search}</h1>
	</div>
  )
}

export default Searchloader
