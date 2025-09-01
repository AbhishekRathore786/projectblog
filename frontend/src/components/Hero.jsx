import React from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import HeroImage from '../assets/HeroImage.png'
const Hero = () => {
  return (
    // <div className='px-4 md:px-0'>
    //   <div className='max-w-7x1 mx-auto flex flex-col md:flex-row items-center h-[600px] my-10 md:my-0'>
    //     {/* text sections */}
    //     <div className='max-w-2x1'>
    //         <h1 className='text-4xl md:text-6xl font-bold mb-4'>
    //             Explore the latest tech & web trend.]
    //         </h1>
    //         <p className='text-lg md:text-xl opacity-80 mb-6'>
    //             The technology is  evolving is very fast so we should also move with it so that we can learn the new tecnology as well.
    //         </p>
    //         <div className='flex space-x-4'>
    //             <Link><Button className='text-lg'>Get started </Button></Link>
    //             <Link><Button variant='outline' className='border-white px-6 py-3 text-lg'>Learn More</Button></Link>
    //         </div>
    //         {/* image section  */}
    //         <div className='flex items-center justify-center'>
    //       <img src={HeroImage} alt="" className='md:h-[550px] md:w-[550px]'/>
    //         </div>
    //     </div>
    //   </div>
    // </div>
//     <div className="px-4 md:px-0">
//   <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center h-auto md:h-[600px] my-10 md:my-0">
    
//     {/* Text Section */}
//     <div className="max-w-2xl text-center md:text-left md:pr-10">
//       <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
//         Explore the Latest Tech & Web Trends
//       </h1>
//       <p className="text-lg md:text-xl text-gray-700 mb-6">
//         Technology is evolving rapidly. Stay ahead by learning and adapting to the latest innovations shaping our digital world.
//       </p>
//       <div className="flex justify-center md:justify-start space-x-4">
//         <Link href="/get-started">
//           <Button className="text-lg px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition">
//             Get Started
//           </Button>
//         </Link>
//         <Link href="/learn-more">
//           <Button variant="outline" className="border-blue-600 text-blue-600 px-6 py-3 text-lg hover:bg-blue-50 transition">
//             Learn More
//           </Button>
//         </Link>
//       </div>
//     </div>

//     {/* Image Section */}
//     <div className="flex items-center justify-center mb-10 md:mb-0">
//       <img src={HeroImage} alt="Tech Hero" className="md:h-[550px] md:w-[550px] object-contain" />
//     </div>
    
//   </div>
// </div>
<div className="px-4 md:px-0">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center h-[600px] my-10 md:my-0">
    
    {/* Text Section */}
    <div className="max-w-2xl">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Explore the latest tech & web trends
      </h1>
      <p className="text-lg md:text-xl opacity-80 mb-6">
        Technology is evolving very fast, so we should move with it to stay updated and learn the latest innovations.
      </p>
      <div className="flex space-x-4">
        <Link to={'/signup'}>
          <Button  className="text-lg">Get started</Button>
        </Link>
        <Link to={'/about'}>
          <Button variant="outline" className="border-white px-6 py-3 text-lg">Learn More</Button>
        </Link>
      </div>
    </div>

    {/* Image Section */}
    <div className="flex items-center justify-center mt-10 md:mt-0">
      <img src={HeroImage} alt="Hero" className="md:h-[550px] md:w-[550px] object-contain" />
    </div>

  </div>
</div>

  )
}

export default Hero
