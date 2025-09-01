import React from 'react'

import {createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './Pages/home'
import Blogs from './Pages/blogs'
import About from './Pages/about'
import Login from './Pages/login'
import Signup from './Pages/signup'
import Navbar from './components/Navbar'
import Dashboard from './Pages/Dashboard'
import Profile from './Pages/Profile'
import Comments from './Pages/Comments'
import CreateBlog from './Pages/CreateBlog'
import YourBlog from './Pages/YourBlog'
import UpdateBloag from './Pages/UpdateBloag'
import BlogView from './Pages/BlogView'
import Footer from './components/Footer'
import SearchList from './Pages/SearchList'
const router =createBrowserRouter([
  {
    path:'/',
    element:<><Navbar/><Home/><Footer/></>
  },
  {
    path:'/blogs',
    element:<><Navbar/><Blogs/><Footer/></>
  },
  {
    path:'/about',
    element:<><Navbar/><About/><Footer/></>
  },
  {
    path:'/search',
    element:<><Navbar/><SearchList/><Footer/></>
  },
  {
    path:'/login',
    element:<><Navbar/><Login/><Footer/></>
  },
  {
    path:'/signup',
    element:<><Navbar/><Signup/><Footer/></>
  },
    {
    path:'/blog/:blogId',
    element:<><Navbar/><BlogView/><Footer/></>
  },
  {
    path:'/dashboard',
    element:<><Navbar/><Dashboard/><Footer/></>,
    children:[
      {
      path:'profile',
      element:<Profile/>
      },
      {
      path:'your-blog',
      element:<YourBlog/>
      },
      {
      path:'comments',
      element:<Comments/>
      },
       {
      path:'write-blog',
      element:<CreateBlog/>
      },
      {
        path:'write-blog/:blogId',
        element:<UpdateBloag/>
      }
    ]
  }

])
const App = () => {
  return (
   <>
   <RouterProvider router={router}/>
   
   </>
  )
}

export default App
