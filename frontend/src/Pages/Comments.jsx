import { Card } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from 'axios'
import { Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
// import TotalProperty from '@/components/TotalProperty'

const Comments = () => {
  const [allComment,setAllComment] = useState([])
  const navigate = useNavigate()
  const getTotalComment = async()=>{
    try {
      const res = await axios.get('https://projectblog-3.onrender.com/api/v1/comment/my-blogs/comments',{
        withCredentials:true
      })
      if(res.data.success){
        setAllComment(res.data.comments)         // backend se kya aa rahi he comments 
      }
    } catch (error) {
      console.log("error is there "+error)
    }
  }
  useEffect(()=>{
    getTotalComment()
  },[])
  return (
    <div className='pb-10 pt-20 h-screen md:ml-[320px]'>
      <div className='w-full mt-8 px-4'>
        <Card className='w-full p-5 space-y-2 dark:bg-gray-800'>
          <Table>
            <TableCaption>A list of your recent Commented Blogs.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Blog Title</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allComment.map((item,index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.postId.title}</TableCell>
                  <TableCell>{item.content}</TableCell>
                  <TableCell>{item.userId.firstName}</TableCell>
                  <TableCell className="text-right flex gap-3 items-center justify-center">{
                    <Eye className='cursor-pointer' onClick={()=>navigate(`/blog/${item.postId._id}`)}/> }</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
      {/* <TotalProperty/> */}
    </div>

  )
}

export default Comments
{/* <div className='pb-10 pt-20 h-screen px-4'>
  <div className='max-w-2xl mx-auto mt-8'>
    <Card className='w-full p-5 space-y-2 dark:bg-gray-800'>
//       {/* Card content here */}
//     </Card>
//   </div>
// </div> */}
