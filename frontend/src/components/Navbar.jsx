import React, { useState } from 'react'
import logo from '../assets/logo.avif'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ChartColumnBig, Search } from 'lucide-react'
import { FaMoon, FaRegEdit, FaSun } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../redux/themeSlice.js'
import axios from 'axios'
import { LiaCommentSolid } from "react-icons/lia";
import { setUser } from '../redux/authSlice.js'
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import userLogo from '../assets/userlogo.jpg'
import { toast } from 'sonner'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSubTrigger,
  DropdownMenuPortal
} from '../components/ui/dropdown-menu.jsx'
import { DropdownMenuSubContent } from '@radix-ui/react-dropdown-menu'
// import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu'
const navbar = () => {
  // const user = false
  const { user } = useSelector(store => store.auth)
  const [searchTerm,setSearchTerm] = useState('')
  const dispatch = useDispatch()
  const { theme } = useSelector(store => store.theme)
  const navigate = useNavigate()
  const logoutHandler = async (e) => {
    try {
      const res = await axios.get(`https://projectblog-3.onrender.com/api/v1/user/logout`, { withCredentials: true })
      if (res.data.success) {
        navigate('/')
        dispatch(setUser(null))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log("error" + error)
      toast.error(error)
    }
  }
  const handleSearch =(e)=>{
    e.preventDefault()
    if(searchTerm.trim()!==''){
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
      setSearchTerm('')
    }
  }
  return (
    // <div className='py-2 fixed w-full  bg-gray-200  dark:bg-gray-800  border-b-gray-300'>
    //   <div className='max-w-7x1 mx-auto flex justify-between items-center px-4 md:px-0'>
    //     {/* logo section/ */}
    //     <div className='flex gap-7 items-center'>
    //       <Link to={'/'}>
    //         <div className='flex gap-2 items-center'>
    //           <img src={logo} alt='' className='w-7 h-7 md:w-10 md:h-10 dark:invert' />
    //           <h1 className='font-bold text-3x1 md:text-4x1'> Logo </h1>
    //         </div>
    //       </Link>
    //       <div className='relative hidden md:block'>
    //         <Input type='text' placeholder='search'
    //         value={searchTerm}
    //         onChange={(e)=>setSearchTerm(e.target.value)}
    //           className='border border-gray-700 dark:bg-gray-900 bg-gray-300 w-[300px] hidden md:block' />
    //         <Button  onClick={handleSearch} className='absolute right-0 top-0'><Search /></Button>
    //       </div>
    //     </div>
    //     {/* nav section */}
    //     <nav className='flex md:gap-7 gap-4 items-center'>
    //       <ul className='hidden md:flex gap-7 items-center text-xl font-semibold'>
    //         <Link to={'/'}><li>Home</li></Link>
    //         <Link to={'/Blogs'}><li>Blogs</li></Link>
    //         <Link to={'/About'}><li>About</li></Link>
    //       </ul>
    //     </nav>
    //     <div className='flex'>
    //       <Button onClick={() => dispatch(toggleTheme())}>
    //         {
    //           theme === 'light' ? <FaMoon /> : <FaSun />
    //         }
    //       </Button>
    //       {
    //         user ? (
    //           <div className="ml-7 flex gap-3 items-center">
    //             <Button className='hidden md:block' onClick={logoutHandler}>Logout</Button>
    //             <DropdownMenu>
    //               <DropdownMenuTrigger asChild>
    //                 <Button variant="outline">
    //                   <Avatar>
    //                     <AvatarImage src={user.photourl || userLogo} />
    //                     <AvatarFallback>CN</AvatarFallback>
    //                   </Avatar>
    //                 </Button>
    //               </DropdownMenuTrigger>
    //               <DropdownMenuContent className="w-56" align="start">
    //                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
    //                 <DropdownMenuGroup>
    //                   <DropdownMenuItem onClick={()=>navigate('/dashboard/profile')}>
    //                     <CgProfile />
    //                     Profile
    //                     <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    //                   </DropdownMenuItem>
    //                   <DropdownMenuItem onClick={()=>navigate('/dashboard/your-blog')}>
    //                     <ChartColumnBig/>
    //                     <span>Your blogs</span>
    //                     <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
    //                   </DropdownMenuItem>
    //                    <DropdownMenuItem onClick={()=>navigate('/dashboard/comments')}>
    //                     <LiaCommentSolid />
    //                     <span>Comments</span>
    //                     <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
    //                   </DropdownMenuItem>
    //                   <DropdownMenuItem onClick={()=>navigate('/dashboard/write-blog')}>
    //                     <FaRegEdit />
    //                     <span>Write blogs</span>
    //                     <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
    //                   </DropdownMenuItem >
    //                 </DropdownMenuGroup>
    //                 <DropdownMenuItem onClick={()=>navigate('/dashboard/profile')}>
    //                   <LuLogOut />
    //                   Log out
    //                   <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    //                 </DropdownMenuItem>
    //               </DropdownMenuContent>
    //             </DropdownMenu>
    //           </div>
    //         ) : (
    //           <div className="ml-7 md:flex gap-2">
    //             <Link to="/login"><Button>Login</Button></Link>
    //             <Link className="hidden md:block" to="/signup"><Button>Signin</Button></Link>
    //           </div>
    //         )
    //       }

    //     </div>
    //   </div>

    // </div>
    <div className='py-2 fixed w-full bg-gray-200 dark:bg-gray-800 border-b-gray-300 z-50'>
  <div className='max-w-7xl mx-auto flex flex-wrap justify-between items-center px-4 md:px-6 gap-y-4'>
    
    {/* Logo + Search */}
    <div className='flex flex-col md:flex-row gap-4 items-center w-full md:w-auto'>
      <Link to={'/'}>
        <div className='flex gap-2 items-center'>
          <img src={logo} alt='' className='w-7 h-7 md:w-10 md:h-10 dark:invert' />
          <h1 className='font-bold text-xl md:text-2xl'>Logo</h1>
        </div>
      </Link>
      <div className='relative w-full md:w-[300px]'>
        <Input
          type='text'
          placeholder='Search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='border border-gray-700 dark:bg-gray-900 bg-gray-300 w-full'
        />
        <Button onClick={handleSearch} className='absolute right-0 top-0'>
          <Search />
        </Button>
      </div>
    </div>

    {/* Navigation Links */}
    <nav className='w-full md:w-auto'>
      <ul className='flex flex-col md:flex-row gap-4 md:gap-7 items-center text-lg font-semibold'>
        <Link to={'/'}><li>Home</li></Link>
        <Link to={'/Blogs'}><li>Blogs</li></Link>
        <Link to={'/About'}><li>About</li></Link>
      </ul>
    </nav>

    {/* Theme + Auth Section */}
    <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
      <Button onClick={() => dispatch(toggleTheme())}>
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </Button>

      {user ? (
        <div className='flex flex-col md:flex-row gap-3 items-center'>
          <Button className='md:block' onClick={logoutHandler}>Logout</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Avatar>
                  <AvatarImage src={user.photourl || userLogo} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                  <CgProfile />
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard/your-blog')}>
                  <ChartColumnBig />
                  <span>Your blogs</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard/comments')}>
                  <LiaCommentSolid />
                  <span>Comments</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard/write-blog')}>
                  <FaRegEdit />
                  <span>Write blogs</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                <LuLogOut />
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className='flex flex-col md:flex-row gap-2 items-center'>
          <Link to="/login"><Button>Login</Button></Link>
          <Link to="/signup"><Button>Signin</Button></Link>
        </div>
      )}
    </div>
  </div>
</div>
  )
}

export default navbar
