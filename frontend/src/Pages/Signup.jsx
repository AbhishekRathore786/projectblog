import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SigninImage from '../assets/SigninImage.jpeg'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
// import { Label } from '@/components/ui/label.jsx'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '../components/ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { setLoading } from '../redux/authSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import HeroImage from '../assets/heroImage.png'
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
    const {loading} = useSelector(store=>store.auth)
    const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    alert(user)
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`https://projectblog-2.onrender.com/api/v1/user/register`,user,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      if(res.data.success){
        navigate('/login')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log("eror is there"+error)
      toast.error(error.response.data.message)
    }
    finally{
      dispatch(setLoading(false))
    }
  }
  return (
    // <div className='flex h-screen md:pt-14 md:h-[740px]'>
    //   <div className='hidden md:block'>
    //     <img src={SigninImage} alt="" className='h-[700px]' />
    //   </div>
    //   <div className='flex justify-center items-center flex-1 px-4 md:px-0'>
    //     <Card className='w-full max-w-md p-6 shadow-lg rounded-2x1 dark:bg-gray-800 dark:border-gray-600'>
    //       <CardHeader>
    //         <CardTitle>
    //           <h1 className='text-center text-xl font-semibold'>Create an account </h1>
    //         </CardTitle>
    //         <p className='mt-2 text-sm font-serif text-center dark:text-gray-300'>Enter your details to create an account</p>
    //       </CardHeader>
    //       <CardContent>
    //         <form className='space-y-4' onSubmit={handleSubmit}>
    //           <div className='flex gap-3'>
    //             <div>
    //               <Label>First name </Label>
    //               <Input
    //                 type='text'
    //                 value={user.firstName}
    //                 onChange={handleChange}
    //                 placeholder='First name'
    //                 name='firstName'
    //                 className='dark:border-gray-600 dark:bg-gray-900'
    //               />
    //             </div>
    //             <div>
    //               <Label>Last name </Label>
    //               <Input
    //                 type='text'
    //                 name='lastName'
    //                 value={user.lastName}
    //                 onChange={handleChange}
    //                 placeholder='lastt name'
    //                 className='dark:border-gray-600 dark:bg-gray-900'
    //               />
    //             </div>

    //           </div>
    //           <div>
    //             <Label> Email</Label>
    //             <Input
    //               type='email'
    //               placeholder='email please'
    //               name='email'
    //               value={user.email}
    //               onChange={handleChange}
    //               className='dark:border-gray-600 dark:bg-gray-900'
    //             />
    //           </div>
    //           <div className='relative'>
    //             <Label>Password</Label>
    //             <Input
    //               type={showPassword ? 'text' : 'password'}
    //               placeholder='create a password'
    //               name='password'
    //               value={user.password}
    //               onChange={handleChange}
    //               className='dark:border-gray-600 dark:bg-gray-900'
    //             />
    //             <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-6 text-gray-500'>
    //               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    //             </button>
    //           </div>
    //           <Button type='submit' className='w-full'>
    //             {
    //             loading ? ( <>
    //             <Loader2 className='mr-2 w-4 h-4 animate-spin'/>
    //             Please Await
    //             </>):("sign up")
    //             }
    //           </Button>
    //           <p className='text-center text-gray-600 dark:text-gray-300'>Already have an account ?<Link to={'/login'}><span className='undereline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100'>Sign in</span></Link></p>
    //         </form >
    //       </CardContent>
    //     </Card>
    //   </div>
    // </div>
//     <div className="px-4 md:px-0 bg-white dark:bg-gray-900">
//   <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center h-[600px] my-10 md:my-0">
//     {/* Text Section */}
//     <div className="max-w-2xl md:w-1/2 space-y-6">
//       <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
//         Explore the Latest Tech & Web Trends
//       </h1>
//       <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
//         Technology is evolving rapidly. Stay ahead by learning the latest innovations and trends.
//       </p>
//       <div className="flex space-x-4">
//         <Link>
//           <Button className="text-lg px-6 py-2">Get Started</Button>
//         </Link>
//         <Link>
//           <Button variant="outline" className="border-gray-300 dark:border-gray-600 px-6 py-2 text-lg">
//             Learn More
//           </Button>
//         </Link>
//       </div>
//     </div>

//     {/* Image Section */}
//     <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
//       <img src={HeroImage} alt="Hero" className="h-[300px] md:h-[550px] w-auto object-contain" />
//     </div>
//   </div>
// </div>
<div className="grid grid-cols-1 md:grid-cols-2 h-screen bg-gray-50 dark:bg-gray-900">
  {/* Left Side - Image */}
  <div className="hidden md:block">
    <img
      src={SigninImage}
      alt="Sign up"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Right Side - Signup Form */}
  <div className="flex justify-center items-center px-6 md:px-12">
    <Card className="w-full max-w-md p-6 shadow-xl rounded-2xl bg-white dark:bg-gray-800 dark:border dark:border-gray-700">
      <CardHeader>
        <CardTitle>
          <h1 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
            Create an Account
          </h1>
        </CardTitle>
        <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
          Enter your details to get started
        </p>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="w-1/2">
              <Label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">First Name</Label>
              <Input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-600 dark:bg-gray-900"
              />
            </div>
            <div className="w-1/2">
              <Label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</Label>
              <Input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-600 dark:bg-gray-900"
              />
            </div>
          </div>
          <div>
            <Label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email</Label>
            <Input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-600 dark:bg-gray-900"
            />
          </div>
          <div className="relative">
            <Label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-600 dark:bg-gray-900"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <Button type="submit" className="w-full text-lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link to="/login">
              <span className="underline cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">Sign In</span>
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  </div>
</div>

  )
}

export default Signup
