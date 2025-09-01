import RecentBlog from '@/components/RecentBlog'
import Hero from '../components/Hero'
import { Button } from '../components/ui/button'
import React from 'react'
import PopularAuthor from '@/components/PopularAuthor'

const Home = () => {
  return (
    <div className='pt-20'>
      
      <Hero/>
        {/* <Button>Click me </Button> */}
        <RecentBlog/>
        <PopularAuthor/>
       
    </div>
  )
}

export default Home
