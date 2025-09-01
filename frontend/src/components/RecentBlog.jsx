import { setBlog } from '@/redux/blogSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogCardList from './BlogCardList'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
// import { avigate  from 'react-router-dom'

const RecentBlog = () => {
    const dispatch = useDispatch()
    const navigate  = useNavigate()
    const { blog } = useSelector(store => store.blog)
    useEffect(() => {
        const getAllPublishedBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/blog/getPublishedBlog`)
                if (res.data.success) {
                    dispatch(setBlog(res.data.blogs))
                }
            } catch (error) {
                console.log(error)
            }
        }
        // getAllPublishedBlog()
    })
    return (
        <div className='bg-gray-100 dark:bg-gray-800 pb-10 min-h-screen'>
            <div className='max-w-6xl mx-auto flex flex-col space-y-4 items-center'>
                <h1 className='text-4xl font-bold pt-10'>
                    Recent blogs
                </h1>
                <hr className=' w-24 text-center border-2 border-red-500 rounded-full' />
            </div>
            <div className='max-w-7xl mx-auto flex gap-6'>
                <div>
                 <div className='mt-10 px-4 md:px-0'>
                    {
                        blog?.slice(0, 4)?.map((blog, index) => {
                            return <BlogCardList key={index} blog={blog} />
                        })
                    }
                 </div>
              </div>
                    <div className='bg-white hidden md:block dark:bg-gray-700 w-[700] w-[350px] p-5 rounded-mt mt-10'>
                        <h1>Poular categories</h1>
                        <div className='my-5 flex flex-wrap gap-3 '>
                            {
                                ["Excercise","Music","Meditation","Yoga","Diting" ].map((item,index)=>{
                                        return <Badge onClick={()=>navigate(`/search?q=${item}`)} key={index} className='cursor-pointer'>{item}</Badge>
                                })
                            }
                        </div>
                        <h1 className='text-xl font-semiblod'>Subscribe to Newletter</h1>
                        <p className='text-sm text-gray-600  dark:text-gray-400'>
                            Get the latest blog straight to yoourinbox 
                        </p>
                        <div className='flex flex-col sm:flex-row gap-2 max-w-md mx-auto mt-5'>
                            <Input 
                            type='email'
                            placeholder='enter your email'
                            className='flex h-10 w-full rounded-md border bg-gray-200 dark:bg-gray-800 px-3 py-2 text-sm text-gray-300'
                            />

                            <Button>Subscribe</Button>
                        </div>
                        <div className='mt-7 '>
                            <h2 className='text-xl font-semibold mb-3'>Suggested Blogs</h2>
                            <ul className='space-y-3'>
                                {
                                    ["Why Yoga should be your lifeStyle","imporve focus by meditation","Eating vegetables  can make you strong"].map((b,index)=>{
                                     return   <li key={index} className='text-sm dark:text-gray-100 hover:underline cursor-pointer'>{b}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
            </div>

        </div>
    )
}

export default RecentBlog
