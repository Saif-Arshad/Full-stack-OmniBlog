import React from 'react'
import '@/app/Stylesheets/Search.scss'
function Searchloader(props) {
  return (
	<div className='w-full bg-white dark:bg-slate-900 h-56 pt-9 md:pt-0 flex flex-wrap flex-col items-center'>
		
    <div className="🤚 ">
	<div className="👉"></div>
	<div className="👉"></div>
	<div className="👉"></div>
	<div className="👉"></div>
	<div className="🌴"></div>		
	<div className="👍"></div>
</div>
<h1 className='font-semibold md:font-bold  md:text-xl mt-12'>Sorry we could not find {props.search}</h1>
	</div>
  )
}

export default Searchloader
