import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

const BlogCard = ({blog}) => {
    const navigate = useNavigate()
    const {user} = useSelector(store=>store.auth)
    const date = new Date(blog.createdAt)
    const formatedDate = date.toLocaleDateString('en-GB')
      const handleReadMore = () => {
        if (user) {
            navigate(`/blog/${blog._id}`);
        } else {
            toast.error("Please Signin to read more");
        }
    };
  return (
    <div className='bg-white dark:bg-gray-800 dark:border-gray-600 p-5 rounded-2xl shadow-lg border hover:scale-105 transition-all max-w-sm w-full'>
      <img  className='rounded-lg w-full h-48 object-cover' src={blog.thumbnail}/>
      <p className='text-sm mt-2'> By {blog.author.firstName} | {blog.category} | {formatedDate}</p>
      <h2 className='text-xl font-semibold'>
        {blog.title}
      </h2>
      <h3 className='text-gray-500 mt-1'>{blog.subtitle}</h3>
        {/* <Button onClick={()=>navigate(`/blog/${blog._id}`)} className='mt-4 px-4 py-2 rounded-lg text-sm'>
            Read More
        </Button> */}
         <Button onClick={handleReadMore} className='mt-4 px-4 py-2 rounded-lg text-sm'>
                            Read More
                        </Button>
    </div>
  )
}

export default BlogCard
