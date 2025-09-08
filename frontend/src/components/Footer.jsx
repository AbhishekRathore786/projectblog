import React from 'react'
 import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Input } from './ui/input';
import { Button } from './ui/button';
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold mb-2">MyBlog</h2>
          <p className="text-sm text-gray-400">
            Sharing stories, ideas, and inspiration from around the world.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/Blogs" className="hover:text-white">Blog</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500"><FaFacebookF /></a>
            <a href="#" className="hover:text-sky-400"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-300"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
            {/* <div>
              <h3 className='text-xl font-semibold'> Stay in the loop</h3>
              <p className='mt-2 text-sm'>Subscribe to get special offers</p>
              <form action='' className='mt-4 flex'>
                <Input
                type='email'
                placeholder='enter your email'
                className='w-full p-2 rounded-l-md bg-gray-600 text0gray-200 focus:outline-none focus:ring-2'
                />
                <Button className='bg-red-600'>Subscribe</Button>
              </form>
            </div> */}
      {/* Bottom Bar */}
      <div className="mt-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} MyBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer
