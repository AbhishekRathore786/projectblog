
import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { useState, useEffect } from 'react';
import axios from 'axios'
// import React, { useState } from 'react'
import userLogo from '../assets/userlogo.jpg'
import { Link } from 'react-router-dom'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setToken, setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react';
import TotalProperty from '@/components/TotalProperty';

const Profile = () => {
    const { user, loading,token } = useSelector(store => store.auth)
    // alert("token is "+token)
    // console.log(token)
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        firstName: user?.firstName,
        lastName: user?.lastName,
        occupation: user?.occupation,
        bio: user?.bio,
        facebook: user?.facebook,
        instagram: user?.instagram,
        linkedin: user?.linkedin,
        github: user?.github,
        file: user?.photourl
    })
    const changeHandler = (e) => {
        const { name, value } = e.target
        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('firstName', input.firstName)
        formData.append('lastName', input.lastName)
        formData.append('bio', input.bio)
        formData.append('occupation', input.occupation)
        formData.append('facebook', input.facebook)
        formData.append('linkedin', input.linkedin)
        formData.append('instagram', input.instagram)
        formData.append('github', input.github)
        if (input?.file) {
            formData.append('file', input?.file)
        }
        try {
            dispatch(setLoading(true))
            const res = await axios.put(`https://projectblog-3.onrender.com/api/v1/user/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            if (res.data.success) {
                setOpen(false)
                toast.success(res.data.message)
                dispatch(setUser(res.data.user))
                dispatch(setToken(res.data.token));
            }
        } catch (error) {
            console.log("error in updating and the reason is " + error)
        }
        finally {
            dispatch(setLoading(false))
        }
        console.log(input)
    }

    return (
        // <div className='pt-20 md:ml-[320px] md:h-screen'>
        //     <div className='max-w-6xl mx-auto- mt-8 pr-4' >
        //         <Card className='flex md:flex-row flex-col gap-10 p-6 md:10 dark:bg-gray-800 mx-4 md:mx-0'>
        //             {/* image sextion */}
        //             <div className='flex flex-col items-center justify-center md:w-[400px]'>
        //                 <Avatar className='w-40 h-40 border-2 overflow-hidden'>
        //                     <AvatarImage src={user.photourl || userLogo} alt='' className='w-full h-full object-cover' />
        //                 </Avatar>
        //                 <h1 className='text-center font-semibold text-xl text-gray-700 dark:text-gray-500 my-3'> {user.occupation || 'Writer'}</h1>
        //                 <div className='flex gap-4 items-center'>
        //                     <Link to={user.facebook}><FaFacebook className='w-6 h-6 text-gray-800 dark:text-gray-300' /></Link>
        //                     <Link><FaLinkedin className='w-6 h-6 text-gray-800 dark:text-gray-300' /></Link>
        //                     <Link><FaGithub className='w-6 h-6 text-gray-800 dark:text-gray-300' /></Link>
        //                     <Link><FaInstagram className='w-6 h-6 text-gray-800 dark:text-gray-300' /></Link>
        //                     {/* <Link><FaFacebook className='w-6 h-6 text-gray-800 dark:text-gray-300' /></Link> */}
        //                 </div>
        //             </div>
        //             {/* info section? */}
        //             <div>
        //                 <h1 className='font-bold text-center md:text-start text-4xl md-7'>Welcome  {user.firstName || "user"}</h1>
        //                 <p> <span className='font-semibold'> Email :  </span>   {user.email}</p>
        //                 <div className='flex flex-col gap-2 items-start justify-start my-5'>
        //                     <Label>About Me</Label>
        //                     <p className='border dark:gray-600 p-6 rounded-lg'>
        //                         {
        //                             user.bio || "Hi there i am fine and how  about you "
        //                         }
        //                     </p>
        //                 </div>
        //                 {/* <Button onClick={setOpen(true)}>Edit Profile</Button> */}
        //                 <Dialog open={open} onOpenChange={setOpen}>
        //                     <Button onClick={() => setOpen(true)}>Edit Profile</Button>
        //                     <form>

        //                         {/* <Button onClick={submitHandler}>Edit Profile</Button> */}


        //                         <DialogContent className="sm:max-w-[425px]">
        //                             <DialogHeader>
        //                                 <DialogTitle className='text-center'>Edit profile</DialogTitle>
        //                                 <DialogDescription className='text-center'>
        //                                     Make changes to your profile here. Click save when you're done.
        //                                 </DialogDescription>
        //                             </DialogHeader>

        //                             {/* Form Fields */}

        //                             <div className="grid gap-4 py-4">
        //                                 <div className='flex gap-2'>
        //                                     {/* First Name first */}
        //                                     <div>
        //                                         <Label htmlFor="name-1" className="text-right mb-2" >First Name</Label>
        //                                         <Input id="firstname" name="firstname" value={input.firstName} onChange={changeHandler} type='text' placeholder='first name' className="col-span-3 text-gray mb-1" />
        //                                     </div>


        //                                     {/* Last Name second */}
        //                                     <div>
        //                                         <Label htmlFor="username-1" className="text-right mb-2">Last Name</Label>
        //                                         <Input id="lastname" name="lastname" value={input.lastName} onChange={changeHandler} type='text' placeholder='last name' className="col-span-3 text-gray mb-1" />                                        </div>
        //                                 </div>
        //                                 <div className='flex gap-2'>
        //                                     {/* First Name first */}
        //                                     <div>
        //                                         <Label htmlFor="name-1" className="text-right mb-2" >Facebook</Label>
        //                                         <Input id="facebook" name="facebook" value={input.facebook} onChange={changeHandler} type='text' placeholder='Facebook  url' className="col-span-3 text-gray mb-1" />
        //                                     </div>


        //                                     {/* Last Name second */}
        //                                     <div>
        //                                         <Label htmlFor="username-1" className="text-right mb-2">Instagram</Label>
        //                                         <Input id="instagram" name="instagram" type='text' value={input.instagram} onChange={changeHandler} placeholder='Instagram' className="col-span-3 text-gray mb-1" />                                        </div>
        //                                 </div>
        //                                 <div className='flex gap-2'>
        //                                     {/* First Name first */}
        //                                     <div>
        //                                         <Label htmlFor="name-1" className="text-right mb-2" >LinkeIn</Label>
        //                                         <Input id="linkedin" name="linkedin" value={input.linkedin} onChange={changeHandler} type='text' placeholder='LinkedIn' className="col-span-3 text-gray mb-1" />
        //                                     </div>


        //                                     {/* Last Name second */}
        //                                     <div>
        //                                         <Label htmlFor="username-1" className="text-right mb-2">Github</Label>
        //                                         <Input id="github" name="github" value={input.github} onChange={changeHandler} type='text' placeholder='github' className="col-span-3 text-gray mb-1" />                                        </div>
        //                                 </div>
        //                                 <div>
        //                                     <Label className='text-right'>Description</Label>
        //                                     <Textarea className='col-span-3 text-gray-500' placeholder='enter bio'
        //                                         id='bio' name='bio' value={input.bio} onChange={changeHandler} />
        //                                 </div>
        //                                 <div>
        //                                     <Label className='text-left'>Choose picture</Label>
        //                                     <Input
        //                                         id='file'
        //                                         type='file'
        //                                         name='file'
        //                                         onChange={changeFileHandler}
        //                                         accept='image/*'
        //                                         className='w-[277px]' />
        //                                 </div>
        //                             </div>
        //                             <DialogFooter>
        //                                 <DialogClose asChild>
        //                                     <Button variant="outline">Cancel</Button>
        //                                 </DialogClose>
        //                                 <Button onClick={submitHandler} type="submit">
        //                                     {loading ? (
        //                                         <>
        //                                             <Loader2 className="mr-2 w-4 h-4 animate-spin" />
        //                                             Please wait...
        //                                         </>
        //                                     ) : (
        //                                         "save changes"
        //                                     )}
        //                                 </Button>
        //                             </DialogFooter>
        //                         </DialogContent>
        //                     </form>
        //                 </Dialog>

        //             </div>
        //         </Card>
        //     </div>
        //     <TotalProperty/>
        // </div>
        <div className='pt-20 md:ml-[320px] md:h-screen'>
  <div className='max-w-6xl mx-auto mt-8 pr-4'>
    <Card className='flex flex-col md:flex-row gap-10 p-6 dark:bg-gray-800 mx-4 md:mx-0'>
      
      {/* Image Section */}
      <div className='flex flex-col items-center justify-center md:w-[400px]'>
        <Avatar className='w-40 h-40 border-2 overflow-hidden'>
          <AvatarImage src={user.photourl || userLogo} alt='' className='w-full h-full object-cover' />
        </Avatar>
        <h1 className='text-center font-semibold text-xl text-gray-700 dark:text-gray-500 my-3'>
          {user.occupation || 'Writer'}
        </h1>
        <div className='flex flex-wrap gap-4 items-center justify-center'>
          <Link to={user.facebook}><FaFacebook className='w-6 h-6 text-gray-800 dark:text-gray-300' /></Link>
          <Link><FaLinkedin className='w-6 h-6 text-gray-800 dark:text-gray-300' /></Link>
          <Link><FaGithub className='w-6 h-6 text-gray-800 dark:text-gray-300' /></Link>
          <Link><FaInstagram className='w-6 h-6 text-gray-800 dark:text-gray-300' /></Link>
        </div>
      </div>

      {/* Info Section */}
      <div className='flex-1'>
        <h1 className='font-bold text-center md:text-start text-3xl mb-2'>
          Welcome {user.firstName || "User"}
        </h1>
        <p><span className='font-semibold'>Email:</span> {user.email}</p>

        <div className='flex flex-col gap-2 items-start justify-start my-5'>
          <Label>About Me</Label>
          <p className='border dark:border-gray-600 p-4 rounded-lg'>
            {user.bio || "Hi there, I am fine. How about you?"}
          </p>
        </div>

        {/* Edit Profile Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <Button onClick={() => setOpen(true)}>Edit Profile</Button>
          <form>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className='text-center'>Edit Profile</DialogTitle>
                <DialogDescription className='text-center'>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className='flex flex-col md:flex-row gap-2'>
                  <div>
                    <Label htmlFor="firstname">First Name</Label>
                    <Input id="firstname" name="firstname" value={input.firstName} onChange={changeHandler} type='text' placeholder='First name' />
                  </div>
                  <div>
                    <Label htmlFor="lastname">Last Name</Label>
                    <Input id="lastname" name="lastname" value={input.lastName} onChange={changeHandler} type='text' placeholder='Last name' />
                  </div>
                </div>

                <div className='flex flex-col md:flex-row gap-2'>
                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input id="facebook" name="facebook" value={input.facebook} onChange={changeHandler} type='text' placeholder='Facebook URL' />
                  </div>
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input id="instagram" name="instagram" value={input.instagram} onChange={changeHandler} type='text' placeholder='Instagram' />
                  </div>
                </div>

                <div className='flex flex-col md:flex-row gap-2'>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input id="linkedin" name="linkedin" value={input.linkedin} onChange={changeHandler} type='text' placeholder='LinkedIn' />
                  </div>
                  <div>
                    <Label htmlFor="github">Github</Label>
                    <Input id="github" name="github" value={input.github} onChange={changeHandler} type='text' placeholder='Github' />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Description</Label>
                  <Textarea id="bio" name="bio" value={input.bio} onChange={changeHandler} placeholder='Enter bio' />
                </div>

                <div>
                  <Label htmlFor="file">Choose picture</Label>
                  <Input id="file" type="file" name="file" onChange={changeFileHandler} accept="image/*" />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={submitHandler} type="submit">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Please wait...
                    </>
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </Card>
  </div>

  {/* Dashboard Options Section */}
  <div className='mt-6 px-4 flex flex-col md:flex-row gap-4 justify-center items-center'>
    <Button onClick={() => navigate('/dashboard/profile')}>Profile</Button>
    <Button onClick={() => navigate('/dashboard/your-blog')}>Your Blogs</Button>
    <Button onClick={() => navigate('/dashboard/comments')}>Comments</Button>
    <Button onClick={() => navigate('/dashboard/write-blog')}>Write Blog</Button>
  </div>

  <TotalProperty />
</div>

    )
}

export default Profile
