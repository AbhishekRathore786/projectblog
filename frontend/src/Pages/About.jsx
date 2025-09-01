

import React from 'react'
import Aboutimg from '../assets/about.jpg'
const About = () => {
  return (
    <div className="pt-20 px-6 md:px-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Discover the story behind MyBlog and the people who make it happen.
        </p>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <img
          src={Aboutimg}
          alt="Team"
          className="rounded-lg shadow-lg"
        />

        {/* Text */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            At MyBlog, we believe in the power of storytelling. Our mission is to provide a platform where voices from around the world can share their experiences, insights, and creativity.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We're a passionate team of writers, developers, and dreamers who came together to build a space for authentic expression. Whether you're here to read, write, or connect — you're part of our journey.
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} MyBlog. Built with love and coffee ☕
      </div>
    </div>
  )
}

export default About



