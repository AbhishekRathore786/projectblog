import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Userlogo from '../assets/userlogo.jpg'
const PopularAuthor = () => {
    const [popularUser,setPopularUser] = useState([])
  
    const getAllUser = async()=>{
        try {
            const res = await axios.get(`https://projectblog-2.onrender.com/api/v1/user/all-users`)
            if(res.data.success){
                setPopularUser(res.data.user)
            }
        } catch (error) {
            console.log("error")
        }
    }

    useEffect(()=>{
        getAllUser()
    },[])

    return (
    // <div className='max-w-7xl mx-auto'>
    //   <div className='flex flex-col space-y-4 items-center'> 
    //     <h1 className='text-3xl md:text-4xl font-bold pt-10'></h1>
    //     <hr className='w-24 text-center  border-2 border-red-500 rounded-full'/>
    //   </div>
    //   <div>
    //         {
    //             popularUser.slice(0,3).map((u,index)=>{
    //             return <div  key={index} className='flex flex-row gap-6 justify-center items-center mt-10'> 
    //                 <img src={u.photourl || Userlogo} alt='author photo' className='rounded-full h-16 w-16 md:w-32 md:h-32'/>
    //                 <p>{u.firstName}  {u.lasttName}</p>
    //             </div>
    //             })
    //         }
    //   </div>
    // </div>
    <div className='max-w-7xl mx-auto'>
  <div className='flex flex-col space-y-4 items-center'> 
    <h1 className='text-3xl md:text-4xl font-bold pt-10'>Popular Authors</h1>
    <hr className='w-24 text-center border-2 border-red-500 rounded-full'/>
  </div>

  <div className='flex justify-center gap-10 mt-10'>
    {
      popularUser.slice(0,3).map((u, index) => (
        <div key={index} className='flex flex-col items-center'>
          <img 
            src={u.photourl || Userlogo} 
            alt='author photo' 
            className='rounded-full h-16 w-16 md:w-32 md:h-32'
          />
          <p className='mt-2 text-center'>{u.firstName} {u.lastName}</p>
        </div>
      ))
    }
  </div>
</div>

  )
}

export default PopularAuthor
