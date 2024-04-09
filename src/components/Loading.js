import React from 'react'
import '@/app/Stylesheets/loader.scss'
function Loading() {
  return (
    <>
<div className="progress h-32 bg-white dark:bg-slate-900">
      <div className="inner"></div>
      <div className="inner"></div>
      <div className="inner"></div>
      <div className="inner"></div>
      <div className="inner"></div>
    </div>
	
    </>
  )
}

export default Loading
