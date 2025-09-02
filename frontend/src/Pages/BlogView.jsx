import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import Userlogo from '../assets/userlogo.jpg'
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { BookMarked, MessageSquare, Share2 } from 'lucide-react';
import { setBlog } from '@/redux/blogSlice';
import { toast } from 'sonner';
import axios from 'axios';
import CommentBox from '@/components/CommentBox';

const BlogView = () => {
    const params = useParams()
    const blogId = params.blogId;
    const { blog } = useSelector(store => store.blog)
    const { user } = useSelector(store => store.auth)
    const selectedBlog = blog.find(blog => blog._id === blogId)
    const [blogLike, setBlogLike] = useState(selectedBlog.likes.length)
    const [liked, setLiked] = useState(selectedBlog.likes.includes(user._id) || false)
    const dispatch = useDispatch()
    console.log(selectedBlog)

    const handleShare = (blogId) => {
        const blogurl = `${window.location.origin}/blogs/${blogId}`
        if (navigator.share) {
            navigator.share({
                title: "check out this blog !",
                text: "read this amazing blog post",
                url: blogurl,

            }).then(() => console.log("shared successfully")).catch((er) => { console.log("error in sharing " + err) })
        }
        else {
            // fallback  copy to clipcord
            navigator.clipboard.writeText(blogurl).then(() => {
                toast.success("blog link copied")
            })
        }
    }

    const changeTimeFormate = (isDate) => {
        const date = new Date(isDate)
        const options = { day: 'numeric', month: 'long', year: 'numeric' }
        const formatedDate = date.toLocaleDateString('en-GB', options)
        return formatedDate
    }
    // blog ko update karung 

    const likeOrDislikeHandler = async () => {
        try {
            const isCurrentlyLiked = liked;
            const action = isCurrentlyLiked ? 'dislike' : "like";

            // const res = await axios.post(`http://localhost:8000/api/v1/blog/${selectedBlog._id}/${action}`, {
            //     withCredentials: true
            // })
            const res = await axios.get(
                `https://projectblog-2.onrender.com/api/v1/blog/${selectedBlog._id}/${action}`,
                {
                    withCredentials: true 
                }
            )

            if (res.data.success) {
                const updatedLikes = isCurrentlyLiked ? blogLike - 1 : blogLike + 1
                setBlogLike(updatedLikes)
                setLiked(!isCurrentlyLiked)
            }
            const updatedBlogData = blog.map(p => p._id === selectedBlog._id ? {
                ...p,
                likes: isCurrentlyLiked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
            } : p)
            toast.success(res.data.message)
            dispatch(setBlog(updatedBlogData))

        }
        catch (error) {
            console.log("Error in like/dislike handler:", error);
            const errorMessage = error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage);
        }

    }
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <div className='pt-14'>
            <div className='max-w-6xl mx-auto p-10'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />

                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/docs/components">Blogs</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{selectedBlog.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* //blog header  */}
                <div className='my-8'>
                    <h1 className='text-4xl font-bold tracking-tight mb-4'> {selectedBlog.title}</h1>
                    <div className='flex items-center justify-between flex-wrap- gap-4'>

                        <div className='flex items-center space-x-4'>
                            <Avatar>
                                <AvatarImage src={selectedBlog.author.photourl} alt='authore image' />
                                <AvatarFallback>AR</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className='font-medium'>{selectedBlog.author.firstName}</p> <p>{selectedBlog.author.lastName}</p>
                                {/* <p className='text-sm text-muted-foregorund'>{selectedBlog.author.firstname}</p> */}
                            </div>
                        </div>
                        <p className='text-sm text-muted-foregoround'>Published on {changeTimeFormate(selectedBlog.createdAt)} 5 minutes read</p>
                    </div>
                </div>
                <div className='md-8 rounded-lg overflow-hidden  '>
                    <img src={selectedBlog.thumbnail} alt="blog image" className='w-full object-cover' />
                    <p className='text-muted-foreground mt-2 italic'>{selectedBlog.subtitle}</p>

                </div>
                {/* <p dangerouslySetInnerHTML={{ __html: selectedBlog.desciption }} /> */}
                <p dangerouslySetInnerHTML={{ __html: selectedBlog.description }} />

                <div className='mt-10'>
                    <div className='flex flex-wrap gap-2 mb-8'>
                        <Badge variant='secondary' className='dark:bg-gray-800'>Next.js</Badge>
                        <Badge variant='secondary' className='dark:bg-gray-800'>reat.js</Badge>
                    </div>
                    {/* commentss  */}
                    <div className='flex items-center justify-between border-y dark:border-gray-800 border-gray-300 py-4 mb-8'>
                        <div className='flex items-center space-x-4'>
                            <Button onClick={likeOrDislikeHandler} variant='ghost' className='flex items-center gap-1'>
                                {
                                    liked ? <FaHeart size={24} className='cursor-pointer text-red-600' /> : <FaRegHeart size={24} className='cursor-pointner hover:text-gray-600 text-white' />
                                }
                                <span>{blogLike}</span></Button>
                            <Button variant='ghost'> <MessageSquare className='h-4 w-4' />
                                <span>Well done one comment</span>
                            </Button>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Button variant='ghost' size='sm'>
                                <BookMarked className='w-4 h-4' />
                            </Button>
                            <Button onClick={() => handleShare(selectedBlog._id)} variant='ghost'>
                                <Share2 className='w-4 h-4' />
                            </Button>
                        </div>
                    </div>
                </div>
                <CommentBox selectedBlog={selectedBlog}/>
            </div>
        </div>
    )
}



export default BlogView

