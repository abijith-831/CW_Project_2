import React from 'react'
import { Link } from "react-router-dom";


const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center  px-4 dark:bg-dark-primary">
      <h1 className="text-8xl font-bold text-bg-primary mb-4 ">404</h1>
      <h1 className='text-2xl font-bold mb-4 text-secondary dark:text-neutral-400'>Page not found</h1>
      <p className="text-lg mb-6 text-gray-600 dark:text-neutral-500">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="px-12 py-2 bg-bg-secondary text-white rounded-lg hover:bg-bg-primary transition" >
        Go Dashboard
      </Link>
    </div>
  )
}

export default NotFound
