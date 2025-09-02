import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useRef, useState } from 'react'
import JoditEditor from 'jodit-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { setBlog } from '@/redux/blogSlice'
const UpdateBloag = () => {
    const editor = useRef(null)
    const navigate = useNavigate()
    const params = useParams()
    console.log(params)
    const dispatch = useDispatch()
    const id = params.blogId
    const { blog, loading } = useSelector(store => store.blog)
    const selectBlog = blog.find(blog => blog._id === id)
    console.log("i am selectedBlog   " + selectBlog)
    // const [content, setContent] = useState(selectBlog.description) -->why if data is  not found in store ->err
    const [content, setContent] = useState(selectBlog?.description || "not present in store")

    const [publish, setPublish] = useState(false)
    const [blogData, setBlogData] = useState({
        title: selectBlog?.title,
        description: content,
        category: selectBlog?.category,

    })
    const [previewThumbnail, setPreviewThumbnail] = useState(selectBlog.thumbnail)
    const handleChange = (e) => {
        const { name, value } = e.target;
        // setBlogData({
        //     ...prev,
        //     [name]:value
        // })
        //         setBlogData(prev => ({
        //   ...prev,
        //   [name]: value
        // }))
        setBlogData(prev => ({
            ...prev,
            [name]: value
        }))

    }
    const selectCategory = (value) => {
        setBlogData({ ...blogData, category: value })
    }
    const selectThumbnail = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setBlogData({ ...blogData, thumbnail: file })
            const fileReader = new FileReader()
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result)
            fileReader.readAsDataURL(file)
        }
    }
    const updateBlogHandler = async () => {
        const formData = new FormData()
        formData.append('title', blogData.title)
        formData.append('subtitle', blogData.subtitle)
        formData.append('description', content)
        formData.append('category', blogData.category)
        formData.append('file', blogData.thumbnail)
        try {
            dispatch(setLoading(true))
            // console.log("i am form-data in try updateblog   " + formData)
            const res = await axios.put(`https://projectblog-2.onrender.com/api/v1/blog/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }, withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                console.log(blogData)
            }
        } catch (error) {
            console.log("error in updating" + error)
        }
        finally {
            dispatch(setLoading(false))
        }


    }
    const togglePublishUnPublished = async () => {
        try {

            const res = await axios.patch(`https://projectblog-2.onrender.com/api/v1/blog/${id}`,
                {
                    withCredentials: true
                })
            if (res.data.success) {
                setPublish(!publish)
                toast.success(res.data.message)
                Navigate('/dashboard/your-blog')
            }
            else {
                toast.error("failed to update ")
            }
        } catch (error) {
            console.log("error")
        }
    }
    const deleteBlog = async (id) => {
        try {
            const res = await axios.delete(`https://projectblog-2.onrender.com/api/v1/blog/delete/${id}`, {
                withCredentials: true
            })
            if (res.data.success) {
                const updatedBlogData = blog.filter((blogItem)=>blogItem._id !== id)
                dispatch(setBlog(updatedBlogData))
                toast.success(res.data.message)
                navigate('/dashboard/your-blog')
            }
        } catch (error) {
            console.log("error" + error)
            toast.error("Something went wrong ",error)
        }
    }
    return (
        <div className='md:ml-[320px] pt-20 px-3 pb-10'>
            <div className='max-w-6xl mx-auro- mt-8'>
                <Card className='w-full bg-white dark:bg-gray-800 p-5 -space-y-3'>
                    <h1> Basic blog information </h1>
                    <p>Make changes to  your blog here  ok </p>
                    <div className='space-x-2'>
                        <Button onClick={() => togglePublishUnPublished(selectBlog.isPublished ? 'false' : 'true')}>
                            {
                                selectBlog?.isPublished ? 'UnPublished' : 'Published'
                            }
                        </Button>
                        <Button onClick={() => deleteBlog(selectBlog._id)} variant='destructive' >Remove</Button>
                    </div>
                    <div>
                        <Label className='mb-1'>Title</Label>
                        <Input
                            type='text'
                            placeholder='enter your title'
                            name='title'
                            value={blogData.title}
                            onChange={handleChange}
                            className='dark:border-gray-300'
                        ></Input>
                    </div>
                    <div>
                        <Label className='mb-1'>Subtitle</Label>
                        <Input
                            type='text'
                            placeholder='enter your subtitle'
                            name='subtitle'
                            value={blogData.subtitle}
                            onChange={handleChange}
                            className='dark:border-gray-300'
                        ></Input>
                    </div>
                    <div className='pt-10'>
                        <Label className='mb-1'>description</Label>
                        <JoditEditor
                            ref={editor}
                            className='jordit-toolbar'
                            value={blogData.description}
                            onChange={newContent => setContent(newContent)}

                        />
                    </div>
                    <div>
                        <Label className='mb-2'>Category</Label>
                        <Select onValueChange={selectCategory} className="dark:border-gray-300">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Category</SelectLabel>
                                    <SelectItem value="excercise">Excercise</SelectItem>
                                    <SelectItem value="diting">Diting</SelectItem>
                                    <SelectItem value="yoga">Yoga</SelectItem>
                                    <SelectItem value="music">Music</SelectItem>
                                    <SelectItem value="meditation">Meditation</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label className='mb-1'>Thumbnail</Label>
                        <Input
                            type='file'
                            onChange={selectThumbnail}
                            id='file'
                            name='file'
                            accept='image/*'
                            className='w-fit dark:border-gray-300'
                        />
                        {
                            previewThumbnail && (
                                <img src={previewThumbnail} className='w-64 my-2' alt="blog thumbnail" />
                            )
                        }
                    </div>
                    <div className='flex gap-3'>
                        <Button onClick={() => navigate(-1)} ariant='outline'>Back</Button>
                        <Button onClick={updateBlogHandler}>
                            {
                                loading ? <> <Loader2 className='mr-2 w-4 h-4 animate-spin' /> Please wait </> : "Save"
                            }
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default UpdateBloag
