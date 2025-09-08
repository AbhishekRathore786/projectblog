import React, { useState } from 'react'
import SigninImage from '../assets/SigninImage.jpeg'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector} from 'react-redux'
import { setLoading, setUser } from '../redux/authSlice.js'
const Login = () => {
  const [showPassword,setShowPassword] = useState(false)
  const {loading} = useSelector(store=>store.auth)
  const {users} = useSelector(store=>store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const [input, setInput] = useState({
      email: '',
      password: ''
    })
    const handleChange = (e) => {
      const { name, value } = e.target
      setInput((prev) => ({
        ...prev,
        [name]: value
      }))
    }
    const handleSubmit =async (e) =>{

      e.preventDefault()
      // console.log(input)
      try {
        dispatch(setLoading(true))
        const res = await axios.post(`https://projectblog-3.onrender.com/api/v1/user/login`,input,{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true
        })
        if(res.data.success){
          dispatch(setUser(res.data.user))
          navigate('/')
         toast.success(`Welcome ${res.data.user.firstName}`)
        // toast.success(`Welcome ${users.firstName} !`)
                      // toast.success(users.firstName)

}
      } catch (error) {
        console.log(error)
      }
      finally{
        dispatch(setLoading(false))
      }
    }
  return (
    //  <div className='flex h-screen md:pt-14 md:h-[740px]'>
    //   <div className='hidden md:block'>
    //     <img src={SigninImage} alt="" className='h-[700px]' />
    //   </div>
    //   <div className='flex justify-center items-center flex-1 px-4 md:px-0'>
    //     <Card className='w-full max-w-md p-6 shadow-lg rounded-2x1 dark:bg-gray-800 dark:border-gray-600'>
    //       <CardHeader>
    //         <CardTitle>
    //           <h1 className='text-center text-xl font-semibold'>Login into your account </h1>
    //         </CardTitle>
    //         <p className='mt-2 text-sm font-serif text-center dark:text-gray-300'>Enter your details to login your account</p>
    //       </CardHeader>
    //       <CardContent>
    //         <form className='space-y-4' onSubmit={handleSubmit}>
    //           <div>
    //             <Label> Email</Label>
    //             <Input
    //               type='email'
    //               placeholder='email please'
    //               name='email'
    //               value={input.email}
    //               onChange={handleChange}
    //               className='dark:border-gray-600 dark:bg-gray-900'
    //             />
    //           </div>
    //           <div className='relative'>
    //             <Label>Password</Label>
    //             <Input
    //               type={showPassword ? 'text' : 'password'}
    //               placeholder='enter your password'
    //               name='password'
    //               value={input.password}
    //               onChange={handleChange}
    //               className='dark:border-gray-600 dark:bg-gray-900'
    //             />
    //             <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-6 text-gray-500'>
    //               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    //             </button>
    //           </div>
    //           <Button type='submit' className='w-full'>{
    //             loading ? ( <>
    //             <Loader2 className='mr-2 w-4 h-4 animate-spin'/>
    //             Please Await
    //             </>):("login")
    //             }</Button>
    //           <p className='text-center text-gray-600 dark:text-gray-300'>Don't have an account ?<Link to={'/signup'}><span className='undereline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100'>Sign Up</span></Link></p>
    //         </form>
    //       </CardContent>
    //     </Card>
    //   </div>
    // </div>
//     <div className="flex h-screen md:h-[740px] md:pt-14 bg-gray-50 dark:bg-gray-900">
//   <div className="hidden md:block flex-shrink-0">
//     <img src={SigninImage} alt="Sign in" className="h-full object-cover" />
//   </div>
//   <div className="flex flex-1 justify-center items-center px-4 md:px-0">
//     <Card className="w-full max-w-md p-6 shadow-xl rounded-2xl bg-white dark:bg-gray-800 dark:border dark:border-gray-700">
//       <CardHeader>
//         <CardTitle>
//           <h1 className="text-center text-2xl font-bold text-gray-800 dark:text-white">Login to Your Account</h1>
//         </CardTitle>
//         <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
//           Enter your credentials to access your account
//         </p>
//       </CardHeader>
//       <CardContent>
//         <form className="space-y-5" onSubmit={handleSubmit}>
//           <div>
//             <Label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email</Label>
//             <Input
//               type="email"
//               placeholder="Enter your email"
//               name="email"
//               value={input.email}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-md dark:border-gray-600 dark:bg-gray-900"
//             />
//           </div>
//           <div className="relative">
//             <Label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Password</Label>
//             <Input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               name="password"
//               value={input.password}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-md dark:border-gray-600 dark:bg-gray-900"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-9 text-gray-500"
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//           <Button type="submit" className="w-full text-lg">
//             {loading ? (
//               <>
//                 <Loader2 className="mr-2 w-4 h-4 animate-spin" />
//                 Please wait...
//               </>
//             ) : (
//               "Login"
//             )}
//           </Button>
//           <p className="text-center text-sm text-gray-600 dark:text-gray-300">
//             Don't have an account?{" "}
//             <Link to="/signup">
//               <span className="underline cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">Sign Up</span>
//             </Link>
//           </p>
//         </form>
//       </CardContent>
//     </Card>
//   </div>
// </div>
<div className="grid grid-cols-1 md:grid-cols-2 h-screen bg-gray-50 dark:bg-gray-900">
  {/* Left Side - Image */}
  <div className="hidden md:block">
    <img
      src={SigninImage}
      alt="Sign in"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Right Side - Login Form */}
  <div className="flex justify-center items-center px-6 md:px-12">
    <Card className="w-full max-w-md p-6 shadow-xl rounded-2xl bg-white dark:bg-gray-800 dark:border dark:border-gray-700">
      <CardHeader>
        <CardTitle>
          <h1 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
            Login to Your Account
          </h1>
        </CardTitle>
        <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
          Enter your credentials to access your account
        </p>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <Label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={input.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md dark:border-gray-600 dark:bg-gray-900"
            />
          </div>
          <div className="relative">
            <Label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              value={input.password}
              onChange={handleChange}
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
              "Login"
            )}
          </Button>
          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="underline cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">Sign Up</span>
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  </div>
</div>

  )
}

export default Login
