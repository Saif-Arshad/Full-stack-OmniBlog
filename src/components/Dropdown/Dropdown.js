'use client'

import React, { useState } from 'react';

function Dropdown({ selectedCategory, setSelectedCategory }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  return (
    <div>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Dropdown button
        <svg className={`w-2.5 h-2.5 ms-3 ${isOpen ? 'transform rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>

      <div
        id="dropdown"
        className={`z-10 ${isOpen ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          <li>
            <a onClick={() => handleCategoryClick("All")} className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${selectedCategory === "All" ? "bg-gray-200 dark:bg-gray-600" : ""}`}>All Articles</a>
          </li>
                    <li>
                        <a onClick={() => handleCategoryClick("technology")} className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${selectedCategory === "Technology" ? "bg-gray-200 dark:bg-gray-600" : ""}`}>Technology</a>
                    </li>
                    <li>
              <a onClick={() => handleCategoryClick("food")}className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Food</a>
            </li>
            <li>
              <a onClick={() => handleCategoryClick("health")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Health</a>
            </li>
            <li>
              <a onClick={() => handleCategoryClick("movie")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Movie</a>
            </li>
            <li>
              <a onClick={() => handleCategoryClick("sports")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sports</a>
            </li>
            <li>
              <a onClick={() => handleCategoryClick("fashion")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Fashion</a>
            </li>
            <li>
              <a onClick={() => handleCategoryClick("lifestyle")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">LifeStyle</a>
            </li>
                </ul>
            </div>
        </div>
    )
}

export default Dropdown;
