import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
const BlogCardList = ({ blog }) => {
    const navigate = useNavigate()
    const { user } = useSelector(store => store.auth)
    const handleReadMore = () => {
        if (user) {
            navigate(`/blog/${blog._id}`);
        } else {
            toast.error("Please Signin to read more");
        }
    };

    return (
        <div className='bg-white dark:bg-gray-700 dark:border-gray-600 flex flex-col md:flex-row md:gap-10 p-5 rounded-2xl mt-6 shadow-lg border transition-all'>
            <div>
                {/* <img src={blog.thumbnail} alt='' className='rounded-lg md:w-[300px] hover:scale-105 transition-all' /> */}
                <img src={blog.thumbnail} alt='' className='rounded-lg w-full md:w-[300px] h-48 object-cover hover:scale-105 transition-all' />
            </div>
            <div>
                <h2 className='text-2xl font-semibold mt-3 md:mt-1'>{blog.title}</h2>
                <h3 className='text-gray-500 mt-1'>{blog.subtitle}</h3>

                {/* <Button onClick={() => navigate(`/blog/${blog._id}`)} className='mt-4 px-4 py-2 rounded-lg text-sm'>
                    Read More
                </Button> */}
                <Button onClick={handleReadMore} className='mt-4 px-4 py-2 rounded-lg text-sm'>
                    Read More
                </Button>

            </div>
        </div>
    )
}

export default BlogCardList
