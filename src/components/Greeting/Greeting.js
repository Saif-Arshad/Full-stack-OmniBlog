import React from 'react'

function Greeting() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    let greeting;
  
    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }
  return (
    <h2 className='text-purple-600 dark:text-orange-500 text-sm sm:text-xl font-bold'>{greeting}</h2>
  )
}

export default Greeting
