import { setComment } from '@/redux/commentSlice'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { BarChart3, Eye, MessageSquare, ThumbsUp } from 'lucide-react'
import { setBlog } from '@/redux/blogSlice'

const TotalProperty = () => {
    const { blog } = useSelector(store => store.blog)
    const [totalLike, setTotalLike] = useState(0)
    const [totalComment, setTotalComment] = useState(0)
    const dispatch = useDispatch()

    const getOwnBlog = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/blog/get-own-blogs`, {
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setBlog(res.data.blogs))
            }
        } catch (error) {
            console.log("Error is there " + error)
        }
    }

    const getTotalComment = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/comment/my-blogs/comments`, {
                withCredentials: true
            })
            if (res.data.success) {
                // setTotalComment(res.data.comments)
                setTotalComment(res.data.comments.length) 

            }
        } catch (error) {
            console.log("Error is there " + error)
        }
    }
    const getTotalLike = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/blog/my-blogs/likes`, {
                withCredentials: true
            })
            if (res.data.success) {
                setTotalLike(res.data.totallikes)
            }
        } catch (error) {
            console.log("error is  there " + error)
        }
    }
    useEffect(() => {
        getTotalComment()
        getTotalLike()
        getOwnBlog()
    }, [])
    const stats = [
        {
            title: "total views",
            value: '24.8K',
            icons: Eye,
            change: "+45",
            trend: "up"
        },
        {
            title: "total Blogs",
            value: blog.length,
            icons: BarChart3,
            change: "+4%",
            trend: "up"
        },
        {
            title: "total comments",
            value: totalComment,
            icons: MessageSquare,
            change: "+18%",
            trend: "up"
        },
        {
            title: "total likes",
            value: totalLike,
            icons: ThumbsUp,
            change: "+75",
            trend: "up"
        }
    ]
    return (
        <div className='md:p-10 p-4'>
            <div className='flex flex-col md:flex-row justify-around gap-3 md:gap-7'>
                {
                    stats.map(item => {
                        return <Card key={item.title} className='w-full dark:bg-gray-800 -space-y-5'>
                            <CardHeader className='flex flex-row items-center jsutify-center justify-between space-y-0 pb-2'>
                                <CardTitle className='text-sm font-medium'>{item.title}</CardTitle>
                                <item.icons className='h-4 w-4 text-muted-foreground' />
                            </CardHeader>
                            <CardContent>
                                    <div className='text-2xl font-bold'>{item.value}</div>
                                    <p className={`text-xs ${item.trend=== "up"? "text-green-500" : "text-red-500"}`}>{item.change} From last month</p>
                            </CardContent>
                        </Card>
                    })
                }
            </div>
        </div>
    )
}

export default TotalProperty
